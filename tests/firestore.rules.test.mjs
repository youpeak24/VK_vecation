// Run with:  npm run test:rules   (starts the Firestore emulator automatically)
import { after, before, beforeEach, describe, it } from 'node:test';
import fs from 'node:fs';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

let env;

const validEnquiry = (overrides = {}) => ({
  referenceNumber: 'VK-2026-ABCDE',
  customerName: 'Asha Raman',
  name: 'Asha Raman',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  destination: 'Maldives',
  travelers: 2,
  vacationType: 'Honeymoon',
  city: 'Chennai',
  specialRequirements: 'Water villa please',
  consent: true,
  status: 'New',
  priority: 'High',
  source: 'website',
  submittedAt: new Date().toISOString(),
  createdAt: serverTimestamp(),
  ...overrides,
});

const validContact = (overrides = {}) => ({
  referenceNumber: 'VK-MSG-2026-ABCDE',
  name: 'Asha',
  email: 'asha@example.com',
  phone: '9876543210',
  subject: 'General Inquiry',
  message: 'Hello there',
  status: 'New',
  source: 'website',
  submittedAt: new Date().toISOString(),
  createdAt: serverTimestamp(),
  ...overrides,
});

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'vk-rules-test',
    firestore: { rules: fs.readFileSync('firestore.rules', 'utf8') },
  });
});

after(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'admins/mgr'), { name: 'Manager', role: 'Tour Manager', active: true });
    await setDoc(doc(db, 'admins/boss'), { name: 'Boss', role: 'Super Admin', active: true });
    await setDoc(doc(db, 'admins/gone'), { name: 'Gone', role: 'Super Admin', active: false });
    await setDoc(doc(db, 'packages/live'), { title: 'Live', isActive: true });
    await setDoc(doc(db, 'packages/draft'), { title: 'Draft', isActive: false });
    await setDoc(doc(db, 'banners/b1'), { title: 'Banner', isActive: true });
    await setDoc(doc(db, 'meta/content'), { version: 1 });
    await setDoc(doc(db, 'enquiries/e1'), {
      customerName: 'X', email: 'x@y.co', phone: '123456', destination: 'Goa', status: 'New',
    });
    await setDoc(doc(db, 'customers/c1'), { name: 'Cust' });
    await setDoc(doc(db, 'payments/p1'), { amount: 1 });
    await setDoc(doc(db, 'staff/s1'), { name: 'Staff' });
  });
});

const anon = () => env.unauthenticatedContext().firestore();
const stranger = () => env.authenticatedContext('stranger').firestore(); // signed in, NOT an admin
const mgr = () => env.authenticatedContext('mgr').firestore();
const boss = () => env.authenticatedContext('boss').firestore();
const gone = () => env.authenticatedContext('gone').firestore();

describe('public website content', () => {
  it('visitors can list published packages (query constrained to isActive)', async () => {
    const snap = await assertSucceeds(getDocs(query(collection(anon(), 'packages'), where('isActive', '==', true))));
    if (snap.size !== 1) throw new Error(`expected 1 live package, got ${snap.size}`);
  });

  it('visitors cannot list ALL packages (drafts would leak)', async () => {
    await assertFails(getDocs(collection(anon(), 'packages')));
  });

  it('visitors cannot read a draft, can read a live one', async () => {
    await assertFails(getDoc(doc(anon(), 'packages/draft')));
    await assertSucceeds(getDoc(doc(anon(), 'packages/live')));
  });

  it('admins see drafts', async () => {
    const snap = await assertSucceeds(getDocs(collection(mgr(), 'packages')));
    if (snap.size !== 2) throw new Error('admin should see both docs');
  });

  it('banners and the seed marker are public', async () => {
    await assertSucceeds(getDocs(collection(anon(), 'banners')));
    await assertSucceeds(getDoc(doc(anon(), 'meta/content')));
  });

  it('visitors and non-admin accounts cannot write content', async () => {
    await assertFails(setDoc(doc(anon(), 'packages/hack'), { isActive: true }));
    await assertFails(setDoc(doc(stranger(), 'packages/hack'), { isActive: true }));
    await assertFails(updateDoc(doc(anon(), 'packages/live'), { title: 'pwned' }));
    await assertFails(deleteDoc(doc(anon(), 'packages/live')));
    await assertFails(setDoc(doc(anon(), 'meta/content'), { version: 99 }));
  });

  it('admins can write content', async () => {
    await assertSucceeds(setDoc(doc(mgr(), 'packages/new'), { title: 'New', isActive: true }));
    await assertSucceeds(updateDoc(doc(mgr(), 'packages/live'), { title: 'Renamed' }));
  });

  it('a deactivated admin has no access', async () => {
    await assertFails(getDocs(collection(gone(), 'packages')));
    await assertFails(setDoc(doc(gone(), 'packages/x'), { isActive: true }));
  });

  it('seeding the whole site in batches works within the rules access-call limits', async () => {
    const db = mgr();
    for (let b = 0; b < 3; b++) {
      const batch = writeBatch(db);
      for (let i = 0; i < 100; i++) {
        batch.set(doc(db, `packages/seed-${b}-${i}`), { title: 't', isActive: true, order: i });
      }
      await assertSucceeds(batch.commit());
    }
  });
});

describe('enquiries (visitor submissions)', () => {
  it('a visitor can submit a valid enquiry', async () => {
    await assertSucceeds(addDoc(collection(anon(), 'enquiries'), validEnquiry()));
  });

  it('a minimal valid enquiry works', async () => {
    await assertSucceeds(
      addDoc(collection(anon(), 'enquiries'), {
        customerName: 'Bo',
        email: 'b@c.de',
        phone: '123456',
        destination: 'Goa',
        status: 'New',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      }),
    );
  });

  it('rejects bad payloads', async () => {
    const col = () => collection(anon(), 'enquiries');
    await assertFails(addDoc(col(), validEnquiry({ email: 'not-an-email' })));
    await assertFails(addDoc(col(), validEnquiry({ phone: '12' })));
    await assertFails(addDoc(col(), validEnquiry({ customerName: 'A' })));
    await assertFails(addDoc(col(), validEnquiry({ status: 'Converted' })));
    await assertFails(addDoc(col(), validEnquiry({ priority: 'Urgent!!' })));
    await assertFails(addDoc(col(), validEnquiry({ source: 'admin' })));
    await assertFails(addDoc(col(), validEnquiry({ travelers: 9999 })));
    await assertFails(addDoc(col(), validEnquiry({ travelers: '2' })));
    await assertFails(addDoc(col(), validEnquiry({ specialRequirements: 'x'.repeat(2001) })));
    await assertFails(addDoc(col(), validEnquiry({ isAdmin: true }))); // unknown field
    await assertFails(addDoc(col(), validEnquiry({ assignedTo: 'Someone' }))); // staff-only field
    await assertFails(addDoc(col(), validEnquiry({ createdAt: new Date() }))); // forged timestamp
  });

  it('visitors cannot read, change or delete enquiries', async () => {
    await assertFails(getDocs(collection(anon(), 'enquiries')));
    await assertFails(getDoc(doc(anon(), 'enquiries/e1')));
    await assertFails(updateDoc(doc(anon(), 'enquiries/e1'), { status: 'Lost' }));
    await assertFails(deleteDoc(doc(anon(), 'enquiries/e1')));
    await assertFails(getDocs(collection(stranger(), 'enquiries')));
  });

  it('visitors cannot overwrite an existing enquiry id', async () => {
    await assertFails(setDoc(doc(anon(), 'enquiries/e1'), validEnquiry()));
  });

  it('admins read and update; only a Super Admin deletes', async () => {
    await assertSucceeds(getDocs(collection(mgr(), 'enquiries')));
    await assertSucceeds(updateDoc(doc(mgr(), 'enquiries/e1'), { status: 'Contacted' }));
    await assertFails(deleteDoc(doc(mgr(), 'enquiries/e1')));
    await assertSucceeds(deleteDoc(doc(boss(), 'enquiries/e1')));
  });
});

describe('contact messages', () => {
  it('a visitor can send a valid message and nothing else', async () => {
    await assertSucceeds(addDoc(collection(anon(), 'contactSubmissions'), validContact()));
    await assertFails(addDoc(collection(anon(), 'contactSubmissions'), validContact({ message: '' })));
    await assertFails(addDoc(collection(anon(), 'contactSubmissions'), validContact({ status: 'Replied' })));
    await assertFails(addDoc(collection(anon(), 'contactSubmissions'), validContact({ extra: 1 })));
    await assertFails(getDocs(collection(anon(), 'contactSubmissions')));
  });
});

describe('operational and finance data', () => {
  it('anonymous and non-admin accounts are locked out of everything private', async () => {
    const privateCollections = [
      'customers', 'leads', 'followUps', 'bookings', 'payments',
      'invoices', 'refunds', 'suppliers', 'staff', 'auditLogs', 'admins',
    ];
    for (const name of privateCollections) {
      await assertFails(getDocs(collection(anon(), name)));
      await assertFails(getDocs(collection(stranger(), name)));
    }
    await assertFails(setDoc(doc(stranger(), 'customers/hack'), { name: 'x' }));
    await assertFails(setDoc(doc(stranger(), 'payments/hack'), { amount: 1e9 }));
  });

  it('admins can work with customers and payments', async () => {
    await assertSucceeds(getDocs(collection(mgr(), 'customers')));
    await assertSucceeds(setDoc(doc(mgr(), 'payments/p2'), { amount: 5 }));
    await assertSucceeds(updateDoc(doc(mgr(), 'customers/c1'), { name: 'Renamed' }));
  });

  it('only a Super Admin can delete customers and finance records', async () => {
    await assertFails(deleteDoc(doc(mgr(), 'payments/p1')));
    await assertFails(deleteDoc(doc(mgr(), 'customers/c1')));
    await assertSucceeds(deleteDoc(doc(boss(), 'payments/p1')));
    await assertSucceeds(deleteDoc(doc(boss(), 'customers/c1')));
  });

  it('the staff directory is Super Admin write-only', async () => {
    await assertSucceeds(getDocs(collection(mgr(), 'staff')));
    await assertFails(setDoc(doc(mgr(), 'staff/s2'), { name: 'n' }));
    await assertSucceeds(setDoc(doc(boss(), 'staff/s2'), { name: 'n' }));
  });
});

describe('admins (access control) and audit log', () => {
  it('a user can read only their own admins document', async () => {
    await assertSucceeds(getDoc(doc(mgr(), 'admins/mgr')));
    await assertSucceeds(getDoc(doc(stranger(), 'admins/stranger'))); // the login check for non-admins
    await assertFails(getDoc(doc(mgr(), 'admins/boss')));
    await assertFails(getDoc(doc(anon(), 'admins/boss')));
    await assertFails(getDocs(collection(mgr(), 'admins')));
    await assertSucceeds(getDocs(collection(boss(), 'admins')));
  });

  it('nobody can grant themselves admin access', async () => {
    await assertFails(setDoc(doc(stranger(), 'admins/stranger'), { role: 'Super Admin', active: true }));
    await assertFails(setDoc(doc(anon(), 'admins/x'), { role: 'Super Admin', active: true }));
    await assertFails(updateDoc(doc(mgr(), 'admins/mgr'), { role: 'Super Admin' }));
    await assertSucceeds(setDoc(doc(boss(), 'admins/newbie'), { name: 'N', role: 'Sales Specialist', active: true }));
  });

  it('the audit log is append-only and attributed to the real user', async () => {
    await assertSucceeds(setDoc(doc(mgr(), 'auditLogs/l1'), { userId: 'mgr', action: 'CREATE' }));
    await assertFails(setDoc(doc(mgr(), 'auditLogs/l2'), { userId: 'boss', action: 'CREATE' })); // forged author
    await assertFails(updateDoc(doc(mgr(), 'auditLogs/l1'), { action: 'edited' }));
    await assertFails(deleteDoc(doc(boss(), 'auditLogs/l1')));
    await assertSucceeds(getDocs(collection(mgr(), 'auditLogs')));
  });

  it('unknown collections are denied', async () => {
    await assertFails(setDoc(doc(boss(), 'secrets/x'), { a: 1 }));
    await assertFails(getDoc(doc(boss(), 'secrets/x')));
  });
});
