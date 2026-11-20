// End-to-end test of the real app code (auth, live stores, api, inquiryService)
// against the Firebase emulators. Run with:  npm run test:backend
import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const PROJECT = 'demo-vk-test';
const AUTH = 'http://127.0.0.1:9099';
const FS = `http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents`;

process.env.VITE_USE_FIREBASE_EMULATOR = 'true';
process.env.VITE_FIREBASE_PROJECT_ID = PROJECT;

let vite;
let m; // loaded app modules

const waitFor = async (check, label, timeout = 10_000) => {
  const start = Date.now();
  for (;;) {
    let value;
    try {
      value = await check();
    } catch {
      value = false;
    }
    if (value) return value;
    if (Date.now() - start > timeout) throw new Error(`Timed out waiting for: ${label}`);
    await new Promise((r) => setTimeout(r, 50));
  }
};

async function createAuthUser(email, password) {
  const res = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const json = await res.json();
  assert.ok(json.localId, `signUp failed: ${JSON.stringify(json)}`);
  return json.localId;
}

// Writes with the emulator's "owner" token, which bypasses security rules (like the console).
async function ownerWriteAdminDoc(uid, fields) {
  const body = { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, typeof v === 'boolean' ? { booleanValue: v } : { stringValue: v }])) };
  const res = await fetch(`${FS}/admins/${uid}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', authorization: 'Bearer owner' },
    body: JSON.stringify(body),
  });
  assert.equal(res.status, 200, await res.text());
}

// Unauthenticated REST read = what an anonymous visitor can do.
const anonGet = (path) => fetch(`${FS}/${path}`);

const INQUIRY = {
  fullName: 'Asha Raman',
  city: 'Chennai',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  destination: 'Maldives',
  travelDate: '2026-12-20',
  travelers: 2,
  vacationType: 'Honeymoon',
  specialRequirements: 'Overwater villa',
  consent: true,
};

before(async () => {
  vite = await createServer({
    configFile: false,
    root: process.cwd(),
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  const load = (p) => vite.ssrLoadModule(p);
  m = {
    sync: await load('/src/lib/firebase/sync.ts'),
    stores: (await load('/src/lib/firebase/stores.ts')).stores,
    content: await load('/src/lib/firebase/contentState.ts'),
    auth: (await load('/src/services/auth.ts')).authService,
    api: (await load('/src/services/api.ts')).api,
    inquiry: (await load('/src/services/inquiryService.ts')).inquiryService,
    packages: (await load('/src/data/packages.ts')).TOUR_PACKAGES,
    temple: (await load('/src/data/templePackages.ts')).TEMPLE_PACKAGES,
  };
  m.sync.startDataSync();
});

after(async () => {
  await vite?.close();
  setTimeout(() => process.exit(0), 200).unref(); // Firestore keeps sockets open
});

describe('visitor (not signed in)', () => {
  it('sees the bundled site until the database is seeded', async () => {
    assert.equal(m.stores.packages.snapshot().length, m.packages.length);
    assert.equal(m.content.contentState.seeded === true, false);
  });

  it('can submit an enquiry and a contact message', async () => {
    const res = await m.inquiry.submitInquiry(INQUIRY);
    assert.equal(res.success, true);
    assert.match(res.referenceNumber, /^VK-\d{4}-[A-Z0-9]{5}$/);
    const msg = await m.inquiry.submitContactMessage({ name: 'Ravi', email: 'ravi@example.com', phone: '9876543210', subject: 'Visa', message: 'Do you help with visas?' });
    assert.equal(msg.success, true);
  });

  it('is blocked client-side on bad input and spam', async () => {
    await assert.rejects(m.inquiry.submitInquiry({ ...INQUIRY, email: 'nope' }), /valid email/);
    await assert.rejects(m.inquiry.submitInquiry({ ...INQUIRY, phone: 'abc' }), /valid phone/);
    await assert.rejects(m.inquiry.submitInquiry({ ...INQUIRY, honeypot: 'bot' }), /Spam/);
    await assert.rejects(m.inquiry.submitContactMessage({ name: '', email: 'a@b.co', phone: '123456', message: 'x' }), /required/);
  });

  it('cannot read private data', async () => {
    assert.equal((await anonGet('enquiries')).status, 403);
    assert.equal((await anonGet('customers')).status, 403);
    assert.equal(m.stores.enquiries.snapshot().length, 0);
  });
});

describe('sign-in', () => {
  it('rejects a wrong password with a friendly message', async () => {
    await createAuthUser('boss@vkvacations.in', 'correct-horse-9');
    await assert.rejects(m.auth.login('boss@vkvacations.in', 'wrong-password'), /Invalid email or password/);
    assert.equal(m.auth.isAuthenticated(), false);
  });

  it('rejects a valid Firebase account that is not an admin', async () => {
    await createAuthUser('stranger@example.com', 'stranger-pass-1');
    await assert.rejects(m.auth.login('stranger@example.com', 'stranger-pass-1'), /not authorised/);
    assert.equal(m.auth.isAuthenticated(), false);
  });

  it('rejects an admin whose access was revoked (active = false)', async () => {
    const uid = await createAuthUser('former@vkvacations.in', 'former-pass-1');
    await ownerWriteAdminDoc(uid, { name: 'Former', role: 'Super Admin', active: false });
    await assert.rejects(m.auth.login('former@vkvacations.in', 'former-pass-1'), /not authorised/);
  });

  it('signs in an authorised admin', async () => {
    const res = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'boss@vkvacations.in', password: 'correct-horse-9', returnSecureToken: true }),
    });
    const { localId } = await res.json();
    await ownerWriteAdminDoc(localId, { name: 'Vignesh Kumar', email: 'boss@vkvacations.in', role: 'Super Admin', active: true });

    const user = await m.auth.login('boss@vkvacations.in', 'correct-horse-9');
    assert.equal(user.name, 'Vignesh Kumar');
    assert.equal(user.role, 'Super Admin');
    assert.ok(user.avatar.startsWith('data:image/svg+xml'));
    assert.equal(m.auth.isAuthenticated(), true);
  });
});

describe('admin session (live Firestore data)', () => {
  it('streams the visitor submissions made earlier', async () => {
    const enquiries = await waitFor(() => m.stores.enquiries.snapshot().length === 1 && m.stores.enquiries.snapshot(), 'enquiry streamed');
    assert.equal(enquiries[0].customerName, 'Asha Raman');
    assert.equal(enquiries[0].status, 'New');
    assert.equal(typeof enquiries[0].createdAt, 'string', 'server timestamp is normalised to an ISO string');
    await waitFor(() => m.stores.contactSubmissions.snapshot().length === 1, 'contact message streamed');
  });

  it('seeds the site content once, and the stores switch to Firestore data', async () => {
    await waitFor(() => m.content.contentState.seeded === true, 'content seeded', 20_000);
    await waitFor(() => m.stores.packages.isLoaded && m.stores.packages.snapshot().length === m.packages.length, 'packages loaded');
    const titles = m.stores.packages.snapshot().map((p) => p.slug);
    assert.deepEqual(titles, m.packages.map((p) => p.slug), 'original website order is preserved');
    await waitFor(() => m.stores.templePackages.snapshot().length === m.temple.length, 'temple packages loaded');
    // seeded content is publicly readable, drafts are not
    assert.equal((await anonGet(`packages/${m.packages[0].id}`)).status, 200);
  });

  it('creates / updates / deletes a package that persists to Firestore', async () => {
    const base = m.packages[0];
    const created = m.api.packages.create({ ...base, title: 'Integration Test Tour', slug: 'integration-test-tour' });
    assert.equal(m.api.packages.getAll()[0].id, created.id, 'new package is listed first');
    assert.equal(created.isActive, true);

    await waitFor(async () => (await anonGet(`packages/${created.id}`)).status === 200, 'package visible to visitors');

    m.api.packages.update(created.id, { title: 'Renamed Tour' });
    await waitFor(async () => (await (await anonGet(`packages/${created.id}`)).json()).fields?.title?.stringValue === 'Renamed Tour', 'update persisted');

    m.api.packages.delete(created.id);
    // (a visitor would get 403 for a missing doc, so check with the rules-bypassing owner token)
    await waitFor(
      async () => (await fetch(`${FS}/packages/${created.id}`, { headers: { authorization: 'Bearer owner' } })).status === 404,
      'delete persisted',
    );
    assert.equal(m.api.packages.getById(created.id), undefined);
  });

  it('keeps draft packages hidden from visitors', async () => {
    const draft = m.api.packages.create({ ...m.packages[1], title: 'Secret Draft', slug: 'secret-draft', isActive: false });
    await waitFor(() => m.stores.packages.snapshot().some((p) => p.id === draft.id), 'draft in admin store');
    await new Promise((r) => setTimeout(r, 300));
    assert.equal((await anonGet(`packages/${draft.id}`)).status, 403, 'visitors cannot read drafts');
  });

  it('updates enquiry status and assignment, with an audit trail by the real user', async () => {
    const enquiry = m.api.enquiries.getAll()[0];
    m.api.enquiries.updateStatus(enquiry.id, 'Contacted', 'Called customer');
    m.api.enquiries.assignStaff(enquiry.id, 'Vignesh Kumar');
    const logs = await waitFor(() => {
      const all = m.api.auditLogs.getAll();
      return all.some((l) => l.details.includes('Assigned to')) && all;
    }, 'audit logs streamed');
    const log = logs.find((l) => l.details.includes('Status updated to Contacted'));
    assert.equal(log.userName, 'Vignesh Kumar');
    assert.equal(log.userRole, 'Super Admin');
    assert.ok(log.userId);
    const saved = m.stores.enquiries.find(enquiry.id);
    assert.equal(saved.status, 'Contacted');
    assert.equal(saved.assignedTo, 'Vignesh Kumar');
  });

  it('creates bookings with collision-safe references, and computes metrics', async () => {
    const a = m.api.bookings.create({ customerName: 'A', packageTitle: 'P', status: 'Confirmed', paidAmount: 1000 });
    const b = m.api.bookings.create({ customerName: 'B', packageTitle: 'P', status: 'Confirmed', paidAmount: 500 });
    assert.notEqual(a.bookingReference, b.bookingReference);
    assert.match(a.bookingReference, /^VK-BK-\d{4}-[A-Z0-9]{5}$/);
    await waitFor(() => m.api.bookings.getAll().length === 2, 'bookings streamed');
    const metrics = m.api.reports.getOverviewMetrics();
    assert.equal(metrics.totalBookingsCount, 2);
    assert.equal(metrics.totalRevenue, 1500);
    assert.equal(metrics.activeEnquiriesCount, 0); // the only enquiry is now "Contacted"
  });
});

describe('role enforcement and cleanup', () => {
  it('a Tour Manager cannot delete customers; the UI snaps back', async () => {
    await m.auth.logout();
    const uid = await createAuthUser('manager@vkvacations.in', 'manager-pass-1');
    await ownerWriteAdminDoc(uid, { name: 'Kavitha', role: 'Tour Manager', active: true });
    await m.auth.login('manager@vkvacations.in', 'manager-pass-1');
    await waitFor(() => m.stores.customers.isLoaded, 'customers listener started');

    const customer = m.api.customers.create({ name: 'Test Customer', email: 'c@example.com', phone: '9999999999', city: 'Chennai', state: 'TN', totalBookings: 0 });
    await waitFor(() => m.stores.customers.snapshot().some((c) => c.id === customer.id), 'customer created');

    m.api.customers.delete(customer.id); // optimistic removal...
    assert.equal(m.api.customers.getById(customer.id), undefined);
    await waitFor(() => m.api.customers.getById(customer.id), 'server rejected delete, record restored', 8000); // ...then rolled back
  });

  it('sign-out immediately drops all admin data from memory', async () => {
    assert.ok(m.stores.enquiries.snapshot().length > 0);
    await m.auth.logout();
    assert.equal(m.auth.isAuthenticated(), false);
    assert.equal(m.stores.enquiries.snapshot().length, 0);
    assert.equal(m.stores.customers.snapshot().length, 0);
    assert.equal(m.stores.auditLogs.snapshot().length, 0);
  });

  it('after sign-out the public site shows published content only (no drafts)', async () => {
    await waitFor(() => !m.stores.packages.snapshot().some((p) => p.slug === 'secret-draft') && m.stores.packages.snapshot().length > 0, 'draft hidden after sign-out', 8000);
    assert.equal(m.stores.packages.snapshot().length, m.packages.length);
  });
});
