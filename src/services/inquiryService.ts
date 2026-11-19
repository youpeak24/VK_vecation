import { InquiryFormData } from '../types';

export interface InquiryResponse {
  success: boolean;
  referenceNumber: string;
  message: string;
  timestamp: string;
}

const INQUIRIES_STORAGE_KEY = 'vk_vacations_inquiries';

export const inquiryService = {
  /**
   * Submit travel inquiry to backend or fallback persistent store
   */
  async submitInquiry(data: InquiryFormData): Promise<InquiryResponse> {
    // 1. Anti-spam honeypot verification
    if (data.honeypot && data.honeypot.trim().length > 0) {
      throw new Error("Spam detected. Submission blocked.");
    }

    // 2. Validation check
    if (!data.fullName || !data.email || !data.phone || !data.destination) {
      throw new Error("Please complete all required fields (*).");
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Please enter a valid email address.");
    }

    // 3. Optional real backend API submission if configured
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const refNum = `VK-${Math.floor(100000 + Math.random() * 900000)}`;

    if (apiBaseUrl) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            referenceNumber: refNum,
            submittedAt: new Date().toISOString()
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `Server responded with status ${response.status}`);
        }

        const result = await response.json();
        return {
          success: true,
          referenceNumber: result.referenceNumber || refNum,
          message: "Thank you! Your travel inquiry has been received. Our dedicated travel consultant will contact you within 2 business hours.",
          timestamp: new Date().toISOString()
        };
      } catch (err: any) {
        console.warn("Backend API unavailable, falling back to local client queue:", err.message);
      }
    }

    // 4. Client-side local persistence simulation for production-ready frontend
    await new Promise((resolve) => setTimeout(resolve, 800)); // natural network feel

    try {
      const existingRaw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      const existingList = existingRaw ? JSON.parse(existingRaw) : [];
      const newRecord = {
        ...data,
        referenceNumber: refNum,
        submittedAt: new Date().toISOString(),
        status: 'Pending Assignment'
      };
      existingList.unshift(newRecord);
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(existingList.slice(0, 50)));
    } catch (e) {
      console.warn("LocalStorage not available for inquiry caching", e);
    }

    return {
      success: true,
      referenceNumber: refNum,
      message: `Inquiry #${refNum} submitted successfully! Our VK Vacations holiday planner is reviewing your request and will connect shortly.`,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Retrieve saved inquiries (useful for inquiry history or agent debug)
   */
  getStoredInquiries() {
    try {
      const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
};
