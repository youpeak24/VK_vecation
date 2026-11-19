/**
 * Utility functions for formatting INR currency, dates, and WhatsApp URLs
 */

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return 'Price on Request';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export const formatCurrency = formatINR;

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatMonthYear(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function generateWhatsAppLink(cleanPhone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
