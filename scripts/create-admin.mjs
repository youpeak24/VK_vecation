/**
 * Creates (or updates) a Super Admin: a Firebase Auth user + the admins/{uid}
 * document the app requires.
 *
 * Usage:
 *   node scripts/create-admin.mjs <serviceAccount.json> <email> <password> ["Full Name"]
 *
 * Requires: npm i -D firebase-admin
 * The service-account key is a secret: keep it out of git and delete it after use.
 */
import { readFileSync } from 'node:fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const [keyPath, email, password, name = 'Super Admin'] = process.argv.slice(2);
if (!keyPath || !email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <serviceAccount.json> <email> <password> ["Full Name"]');
  process.exit(1);
}

initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) });
const auth = getAuth();
const db = getFirestore();

let user;
try {
  user = await auth.getUserByEmail(email);
  user = await auth.updateUser(user.uid, { password, displayName: name, disabled: false });
  console.log(`Updated existing auth user ${user.uid}`);
} catch (e) {
  if (e.code !== 'auth/user-not-found') throw e;
  user = await auth.createUser({ email, password, displayName: name, emailVerified: true });
  console.log(`Created auth user ${user.uid}`);
}

await db.collection('admins').doc(user.uid).set(
  { name, email, role: 'Super Admin', active: true },
  { merge: true },
);
console.log(`admins/${user.uid} written (role: Super Admin, active: true)`);
console.log(`Done. Sign in at /admin/login with ${email}`);
