import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/client';
import { COLLECTIONS } from '../lib/firebase/collections';
import { trackEvent } from '../lib/firebase/analytics';
import { newReference } from '../lib/ids';
import { COMPANY } from '../data/company';
import type { InquiryFormData } from '../types';

export interface InquiryResponse {
  success: boolean;
  referenceNumber: string;
  message: string;
  timestamp: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

// Keep these limits in sync with /firestore.rules (validEnquiry / validContact).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d][\d\s().-]{5,24}$/;
const SEND_TIMEOUT_MS = 15_000;

const FALLBACK_CONTACT = `Please call or WhatsApp us on ${COMPANY.phone}.`;

const clean = (value: unknown, max: number): string => String(value ?? '').trim().slice(0, max);

/** Only include optional fields that actually have a value. */
function optional<K extends string>(key: K, value: unknown, max: number): { [P in K]?: string } {
  const text = clean(value, max);
  return text ? ({ [key]: text } as { [P in K]?: string }) : {};
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`We could not confirm delivery. ${FALLBACK_CONTACT}`)),
      ms,
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function toSubmissionError(error: unknown): Error {
  const code = (error as { code?: string })?.code ?? '';
  if (error instanceof Error && !code) return error; // our own validation / timeout messages
  if (code.includes('permission-denied')) {
    return new Error(`Requests are temporarily unavailable. ${FALLBACK_CONTACT}`);
  }
  return new Error(`We could not send your request. ${FALLBACK_CONTACT}`);
}

export const inquiryService = {
  /** Travel enquiry -> Firestore `enquiries` (visible to staff in the admin console). */
  async submitInquiry(data: InquiryFormData): Promise<InquiryResponse> {
    // 1. Anti-spam honeypot
    if (data.honeypot && data.honeypot.trim().length > 0) {
      throw new Error('Spam detected. Submission blocked.');
    }

    // 2. Validation
    const fullName = clean(data.fullName, 120);
    const email = clean(data.email, 254);
    const phone = clean(data.phone, 25);
    const destination = clean(data.destination, 160);

    if (!fullName || !email || !phone || !destination) {
      throw new Error('Please complete all required fields (*).');
    }
    if (fullName.length < 2) throw new Error('Please enter your full name.');
    if (!EMAIL_PATTERN.test(email)) throw new Error('Please enter a valid email address.');
    if (!PHONE_PATTERN.test(phone)) throw new Error('Please enter a valid phone number.');

    const travelers = Math.min(500, Math.max(1, Math.trunc(Number(data.travelers)) || 1));
    const referenceNumber = newReference('VK');
    const submittedAt = new Date().toISOString();

    // 3. Persist
    try {
      await withTimeout(
        addDoc(collection(db, COLLECTIONS.enquiries), {
          referenceNumber,
          customerName: fullName,
          name: fullName,
          email,
          phone,
          destination,
          travelers,
          vacationType: clean(data.vacationType, 80) || 'Customized Package',
          ...optional('city', data.city, 120),
          ...optional('whatsapp', data.whatsapp, 25),
          ...optional('packageTitle', data.packageName, 200),
          ...optional('travelDate', data.travelDate, 60),
          ...optional('budgetRange', data.budgetRange, 80),
          ...optional('specialRequirements', data.specialRequirements, 2000),
          ...optional('preferredContactMethod', data.preferredContactMethod, 20),
          consent: data.consent === true,
          status: 'New',
          priority: 'High',
          source: 'website',
          submittedAt,
          createdAt: serverTimestamp(),
        }),
        SEND_TIMEOUT_MS,
      );
    } catch (error) {
      throw toSubmissionError(error);
    }

    void trackEvent('generate_lead', { source: 'enquiry_form', destination, travelers });

    return {
      success: true,
      referenceNumber,
      message: `Inquiry #${referenceNumber} submitted successfully! Our VK Vacations holiday planner is reviewing your request and will connect shortly.`,
      timestamp: submittedAt,
    };
  },

  /** Contact-page message -> Firestore `contactSubmissions`. */
  async submitContactMessage(input: ContactMessageInput): Promise<InquiryResponse> {
    const name = clean(input.name, 120);
    const email = clean(input.email, 254);
    const phone = clean(input.phone, 25);
    const message = clean(input.message, 4000);

    if (!name || !email || !phone || !message) {
      throw new Error('Please complete all required fields.');
    }
    if (!EMAIL_PATTERN.test(email)) throw new Error('Please enter a valid email address.');
    if (!PHONE_PATTERN.test(phone)) throw new Error('Please enter a valid phone number.');

    const referenceNumber = newReference('VK-MSG');
    const submittedAt = new Date().toISOString();

    try {
      await withTimeout(
        addDoc(collection(db, COLLECTIONS.contactSubmissions), {
          referenceNumber,
          name,
          email,
          phone,
          message,
          ...optional('subject', input.subject, 160),
          status: 'New',
          source: 'website',
          submittedAt,
          createdAt: serverTimestamp(),
        }),
        SEND_TIMEOUT_MS,
      );
    } catch (error) {
      throw toSubmissionError(error);
    }

    void trackEvent('generate_lead', { source: 'contact_form' });

    return {
      success: true,
      referenceNumber,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
      timestamp: submittedAt,
    };
  },
};
