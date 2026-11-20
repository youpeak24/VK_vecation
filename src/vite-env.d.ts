/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Application & Branding
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_TAGLINE?: string;
  readonly VITE_APP_SECONDARY_TAGLINE?: string;
  readonly VITE_APP_HERO_HEADLINE?: string;

  // Contact Channels
  readonly VITE_COMPANY_PHONE?: string;
  readonly VITE_COMPANY_ALT_PHONE?: string;
  readonly VITE_COMPANY_WHATSAPP?: string;
  readonly VITE_COMPANY_WHATSAPP_DISPLAY?: string;
  readonly VITE_COMPANY_EMAIL?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_COMPANY_ADDRESS?: string;

  // Groq AI Concierge
  readonly VITE_GROQ_API_KEY?: string;
  readonly VITE_GROQ_PRIMARY_MODEL?: string;
  readonly VITE_GROQ_FALLBACK_MODEL?: string;
  readonly VITE_ENABLE_AI_CHATBOT?: string;

  // Firebase
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
  readonly VITE_FIREBASE_APPCHECK_SITE_KEY?: string;
  readonly VITE_FIREBASE_ANALYTICS?: string;
  readonly VITE_USE_FIREBASE_EMULATOR?: string;

  // Payment Gateway
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_PAYMENT_CURRENCY?: string;

  // Analytics
  readonly VITE_GOOGLE_ANALYTICS_ID?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
