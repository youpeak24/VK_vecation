import { 
  TourPackage, 
  TemplePackage, 
  Destination, 
  DepartureRecord, 
  Customer, 
  EnquiryRecord, 
  ContactSubmission, 
  LeadRecord, 
  FollowUpRecord, 
  BookingRecord, 
  PaymentRecord, 
  InvoiceRecord, 
  RefundRecord, 
  SupplierRecord, 
  StaffRecord, 
  RolePermission, 
  AuditLogRecord,
  WebsiteBanner,
  SEOMetadata
} from '../types';

import { TOUR_PACKAGES } from '../data/packages';
import { TEMPLE_PACKAGES } from '../data/templePackages';
import { DESTINATIONS } from '../data/destinations';
import { SCHEDULED_DEPARTURES } from '../data/departures';

// Keys for local database store
const DB_KEYS = {
  PACKAGES: 'vk_db_packages',
  TEMPLE_PACKAGES: 'vk_db_temple_packages',
  DESTINATIONS: 'vk_db_destinations',
  DEPARTURES: 'vk_db_departures',
  CUSTOMERS: 'vk_db_customers',
  ENQUIRIES: 'vk_db_enquiries',
  CONTACT_SUBMISSIONS: 'vk_db_contact_submissions',
  LEADS: 'vk_db_leads',
  FOLLOW_UPS: 'vk_db_follow_ups',
  BOOKINGS: 'vk_db_bookings',
  PAYMENTS: 'vk_db_payments',
  INVOICES: 'vk_db_invoices',
  REFUNDS: 'vk_db_refunds',
  SUPPLIERS: 'vk_db_suppliers',
  STAFF: 'vk_db_staff',
  AUDIT_LOGS: 'vk_db_audit_logs',
  SETTINGS: 'vk_db_settings',
  BANNERS: 'vk_db_banners',
  SEO: 'vk_db_seo'
};

// Initial Seed Data Generators
const SEED_CUSTOMERS: Customer[] = [
  {
    id: "cust-01",
    name: "Dr. Karthik S.",
    email: "karthik.doc@gmail.com",
    phone: "+91 98410 44221",
    city: "Chennai",
    state: "Tamil Nadu",
    passportNumber: "Z5849201",
    totalBookings: 2,
    totalSpent: 177000,
    status: "VIP",
    notes: "Prefers overwater villas and direct vegetarian catering.",
    createdAt: "2025-11-10"
  },
  {
    id: "cust-02",
    name: "S. Muruganandam",
    email: "murugan.cbe@yahoo.com",
    phone: "+91 94430 88291",
    city: "Coimbatore",
    state: "Tamil Nadu",
    totalBookings: 1,
    totalSpent: 219996,
    status: "Active",
    notes: "Travels with extended 3-generation family.",
    createdAt: "2025-12-04"
  },
  {
    id: "cust-03",
    name: "Anand R. & Meera Menon",
    email: "anand.menon@blrtech.in",
    phone: "+91 99001 22334",
    city: "Bangalore",
    state: "Karnataka",
    passportNumber: "N4920184",
    totalBookings: 1,
    totalSpent: 316000,
    status: "VIP",
    notes: "Swiss Alps anniversary trip executed seamlessly.",
    createdAt: "2026-01-15"
  },
  {
    id: "cust-04",
    name: "Priya Senthil Kumar",
    email: "priya.mdu@gmail.com",
    phone: "+91 97890 12345",
    city: "Madurai",
    state: "Tamil Nadu",
    totalBookings: 3,
    totalSpent: 145000,
    status: "Active",
    notes: "Frequent holiday customer for Kashmir & Kerala.",
    createdAt: "2025-09-22"
  }
];

const SEED_ENQUIRIES: EnquiryRecord[] = [
  {
    id: "enq-101",
    referenceNumber: "VK-829104",
    customerName: "Rajeswari Sundar",
    city: "Chennai",
    email: "rajeswari.s@gmail.com",
    phone: "+91 98402 11990",
    destination: "Kashmir Paradise on Earth",
    travelDate: "2026-05-10",
    travelers: 4,
    vacationType: "Family Vacation",
    budgetRange: "₹60,000 - ₹1,20,000 / person",
    specialRequirements: "Vegetarian South Indian food, lake view houseboat",
    status: "New",
    priority: "High",
    submittedAt: "2026-03-20T09:30:00Z"
  },
  {
    id: "enq-102",
    referenceNumber: "VK-719302",
    customerName: "Arunachalam & Divya",
    city: "Bangalore",
    email: "arun.divya@outlook.com",
    phone: "+91 98800 55443",
    destination: "Magical Maldives Water Villa",
    travelDate: "2026-06-01",
    travelers: 2,
    vacationType: "Honeymoon",
    budgetRange: "₹1,20,000 - ₹2,50,000 / person",
    status: "In Review",
    assignedTo: "Kavitha Ranganathan",
    priority: "High",
    submittedAt: "2026-03-19T14:15:00Z"
  },
  {
    id: "enq-103",
    referenceNumber: "VK-648109",
    customerName: "Venkatraman G.",
    city: "Tiruchirappalli",
    email: "venkat.trichy@gmail.com",
    phone: "+91 94441 33221",
    destination: "Arupadai Veedu Murugan Temples",
    travelDate: "2026-04-18",
    travelers: 6,
    vacationType: "Group Tour",
    budgetRange: "Under ₹30,000 / person",
    status: "Quotation Sent",
    assignedTo: "S. Murugan",
    priority: "Medium",
    submittedAt: "2026-03-18T11:00:00Z"
  }
];

const SEED_CONTACT_SUBMISSIONS: ContactSubmission[] = [
  {
    id: "cnt-01",
    name: "Suresh Balaji",
    email: "suresh.b@gmail.com",
    phone: "+91 98401 77665",
    subject: "Corporate / Group Tour",
    message: "We have an annual team retreat of 25 engineers looking for a 4-day Goa or Sri Lanka package in late May. Please provide quotes with conference hall facilities.",
    status: "New",
    submittedAt: "2026-03-20T10:45:00Z"
  },
  {
    id: "cnt-02",
    name: "Anitha Vijay",
    email: "anitha.v@gmail.com",
    phone: "+91 99400 33441",
    subject: "Customized Itinerary Request",
    message: "Looking for private cab itinerary for elderly parents to Rameswaram and Madurai with wheelchair assistance.",
    status: "Replied",
    submittedAt: "2026-03-18T16:20:00Z",
    replyNotes: "Called customer, shared custom wheelchair friendly car itinerary."
  }
];

const SEED_LEADS: LeadRecord[] = [
  {
    id: "lead-01",
    title: "Chennai Tech Corp — Annual Goa Retreat",
    customerName: "Suresh Balaji",
    email: "suresh.b@techcorp.in",
    phone: "+91 98401 77665",
    destination: "Goa & North Coastal Retreat",
    stage: "Proposal Sent",
    dealValue: 485000,
    probability: 70,
    assignedTo: "Vignesh Kumar",
    expectedCloseDate: "2026-04-05",
    source: "Website Enquiry",
    createdAt: "2026-03-20"
  },
  {
    id: "lead-02",
    title: "Maldives Luxury Overwater Honeymoon",
    customerName: "Arunachalam & Divya",
    email: "arun.divya@outlook.com",
    phone: "+91 98800 55443",
    destination: "Maldives",
    stage: "Negotiating",
    dealValue: 177000,
    probability: 85,
    assignedTo: "Kavitha Ranganathan",
    expectedCloseDate: "2026-03-28",
    source: "Website Enquiry",
    createdAt: "2026-03-19"
  },
  {
    id: "lead-03",
    title: "Swiss Alps & Paris Summer Family Batch",
    customerName: "Rajarajan S.",
    email: "rajarajan.s@gmail.com",
    phone: "+91 94440 99887",
    destination: "Switzerland & France",
    stage: "Contacted",
    dealValue: 632000,
    probability: 50,
    assignedTo: "Vignesh Kumar",
    expectedCloseDate: "2026-04-15",
    source: "Direct Call",
    createdAt: "2026-03-18"
  }
];

const SEED_FOLLOW_UPS: FollowUpRecord[] = [
  {
    id: "fol-01",
    leadId: "lead-02",
    customerName: "Arunachalam & Divya",
    phone: "+91 98800 55443",
    type: "WhatsApp",
    dueDate: "2026-03-22",
    dueTime: "11:00 AM",
    status: "Pending",
    priority: "High",
    assignedTo: "Kavitha Ranganathan",
    notes: "Share resort video walkthrough of Adaaran Prestige Vadoo overwater villa.",
    createdAt: "2026-03-20"
  },
  {
    id: "fol-02",
    leadId: "lead-01",
    customerName: "Suresh Balaji",
    phone: "+91 98401 77665",
    type: "Call",
    dueDate: "2026-03-23",
    dueTime: "03:30 PM",
    status: "Pending",
    priority: "High",
    assignedTo: "Vignesh Kumar",
    notes: "Discuss conference room AV setup options and dinner cruise inclusion.",
    createdAt: "2026-03-20"
  }
];

const SEED_BOOKINGS: BookingRecord[] = [
  {
    id: "bkg-01",
    bookingReference: "VK-BK-2026-081",
    customerId: "cust-01",
    customerName: "Dr. Karthik S.",
    customerPhone: "+91 98410 44221",
    customerEmail: "karthik.doc@gmail.com",
    packageTitle: "Magical Maldives Water Villa Escape",
    destination: "Maldives",
    travelDate: "2026-04-18",
    returnDate: "2026-04-22",
    guestsCount: 2,
    totalAmount: 177000,
    paidAmount: 177000,
    balanceAmount: 0,
    status: "Confirmed",
    paymentStatus: "Paid in Full",
    assignedTourManager: "Kavitha Ranganathan",
    specialRequests: "Anniversary bed decoration, honeymoon cake",
    createdAt: "2026-02-14"
  },
  {
    id: "bkg-02",
    bookingReference: "VK-BK-2026-094",
    customerId: "cust-02",
    customerName: "S. Muruganandam",
    customerPhone: "+91 94430 88291",
    customerEmail: "murugan.cbe@yahoo.com",
    packageTitle: "Dubai Luxury Extravaganza",
    destination: "Dubai",
    travelDate: "2026-05-02",
    returnDate: "2026-05-07",
    guestsCount: 4,
    totalAmount: 219996,
    paidAmount: 100000,
    balanceAmount: 119996,
    status: "Confirmed",
    paymentStatus: "Partially Paid",
    assignedTourManager: "Vignesh Kumar",
    specialRequests: "Pure South Indian vegetarian meals, ground floor rooms for elderly parents",
    createdAt: "2026-03-01"
  },
  {
    id: "bkg-03",
    bookingReference: "VK-BK-2026-105",
    customerId: "cust-04",
    customerName: "Priya Senthil Kumar",
    customerPhone: "+91 97890 12345",
    customerEmail: "priya.mdu@gmail.com",
    packageTitle: "Arupadai Veedu: The 6 Holy Abodes of Lord Murugan",
    destination: "Tamil Nadu",
    travelDate: "2026-04-25",
    returnDate: "2026-04-30",
    guestsCount: 3,
    totalAmount: 73500,
    paidAmount: 73500,
    balanceAmount: 0,
    status: "Confirmed",
    paymentStatus: "Paid in Full",
    assignedTourManager: "S. Murugan",
    specialRequests: "Palani rope car assistance for senior citizen",
    createdAt: "2026-03-10"
  }
];

const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-01",
    paymentRef: "PAY-2026-1049",
    bookingRef: "VK-BK-2026-081",
    customerName: "Dr. Karthik S.",
    amount: 177000,
    method: "UPI",
    status: "Completed",
    transactionId: "UPI982019482091",
    date: "2026-02-14",
    notes: "Paid in full via GPay"
  },
  {
    id: "pay-02",
    paymentRef: "PAY-2026-1120",
    bookingRef: "VK-BK-2026-094",
    customerName: "S. Muruganandam",
    amount: 100000,
    method: "Net Banking",
    status: "Completed",
    transactionId: "NEFT-HDFC-992018",
    date: "2026-03-01",
    notes: "Advance booking token"
  },
  {
    id: "pay-03",
    paymentRef: "PAY-2026-1184",
    bookingRef: "VK-BK-2026-105",
    customerName: "Priya Senthil Kumar",
    amount: 73500,
    method: "Credit Card",
    status: "Completed",
    transactionId: "TXN-VISA-882901",
    date: "2026-03-10",
    notes: "Settled online"
  }
];

const SEED_INVOICES: InvoiceRecord[] = [
  {
    id: "inv-01",
    invoiceNumber: "VK-INV-2026-041",
    bookingRef: "VK-BK-2026-081",
    customerName: "Dr. Karthik S.",
    customerEmail: "karthik.doc@gmail.com",
    customerPhone: "+91 98410 44221",
    description: "Magical Maldives Water Villa Escape (2 Guests)",
    subtotal: 168571,
    taxAmount: 8429,
    totalAmount: 177000,
    status: "Paid",
    dueDate: "2026-02-15",
    issuedDate: "2026-02-14"
  },
  {
    id: "inv-02",
    invoiceNumber: "VK-INV-2026-052",
    bookingRef: "VK-BK-2026-094",
    customerName: "S. Muruganandam",
    customerEmail: "murugan.cbe@yahoo.com",
    customerPhone: "+91 94430 88291",
    description: "Dubai Luxury Extravaganza (4 Guests)",
    subtotal: 209520,
    taxAmount: 10476,
    totalAmount: 219996,
    status: "Sent",
    dueDate: "2026-04-15",
    issuedDate: "2026-03-01"
  }
];

const SEED_REFUNDS: RefundRecord[] = [
  {
    id: "ref-01",
    refundRef: "REF-2026-004",
    bookingRef: "VK-BK-2026-040",
    customerName: "K. Venkatesh",
    requestedAmount: 15000,
    refundAmount: 12500,
    reason: "Flight cancelled by airline; guest requested partial room night refund.",
    status: "Processed",
    approvedBy: "Vignesh Kumar",
    processedDate: "2026-02-28",
    requestedDate: "2026-02-20"
  }
];

const SEED_SUPPLIERS: SupplierRecord[] = [
  {
    id: "sup-01",
    name: "Adaaran Resorts & Atolls Maldives",
    category: "Hotel Partner",
    contactPerson: "Ahmed Rasheed",
    phone: "+960 6640375",
    email: "partnerships@adaaran.com.mv",
    city: "Malé",
    country: "Maldives",
    rating: 4.9,
    contractStatus: "Active",
    balancePayable: 85000
  },
  {
    id: "sup-02",
    name: "Al Futtaim Travel & Desert Safaris",
    category: "Transport Operator",
    contactPerson: "Tariq Mansoor",
    phone: "+971 4 295 5555",
    email: "groups@alfuttaimtravel.ae",
    city: "Dubai",
    country: "UAE",
    rating: 4.8,
    contractStatus: "Active",
    balancePayable: 112000
  },
  {
    id: "sup-03",
    name: "Kashmir Valley Chauffeurs Association",
    category: "Transport Operator",
    contactPerson: "Bashir Ahmed",
    phone: "+91 94190 12345",
    email: "kashmirtours@kvca.in",
    city: "Srinagar",
    country: "India",
    rating: 4.9,
    contractStatus: "Active",
    balancePayable: 34000
  }
];

const SEED_STAFF: StaffRecord[] = [
  {
    id: "stf-01",
    name: "Vignesh Kumar",
    email: "admin@vkvacations.com",
    phone: "+91 9384957775",
    role: "Super Admin",
    department: "Operations",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    joinedDate: "2018-01-01",
    performanceScore: 99
  },
  {
    id: "stf-02",
    name: "Kavitha Ranganathan",
    email: "manager@vkvacations.com",
    phone: "+91 98400 67890",
    role: "Tour Manager",
    department: "Operations",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    joinedDate: "2020-03-15",
    performanceScore: 96
  },
  {
    id: "stf-03",
    name: "S. Murugan",
    email: "murugan@vkvacations.com",
    phone: "+91 94440 12345",
    role: "Tour Manager",
    department: "Operations",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    joinedDate: "2019-06-10",
    performanceScore: 98
  },
  {
    id: "stf-04",
    name: "Sneha Ramanathan",
    email: "sneha@vkvacations.com",
    phone: "+91 97890 54321",
    role: "Sales Specialist",
    department: "Sales",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    joinedDate: "2022-08-01",
    performanceScore: 94
  }
];

const SEED_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: "log-01",
    userName: "Vignesh Kumar",
    userRole: "Super Admin",
    action: "UPDATE",
    module: "Packages",
    targetId: "pkg-kashmir-paradise",
    details: "Updated spring promotion rates and houseboat allocation.",
    ipAddress: "192.168.1.10",
    timestamp: "2026-03-20T11:42:00Z"
  },
  {
    id: "log-02",
    userName: "Kavitha Ranganathan",
    userRole: "Tour Manager",
    action: "CREATE",
    module: "Bookings",
    targetId: "VK-BK-2026-094",
    details: "Generated new booking for Dubai 4 guests.",
    ipAddress: "192.168.1.15",
    timestamp: "2026-03-19T16:20:00Z"
  }
];

const SEED_BANNERS: WebsiteBanner[] = [
  {
    id: "banner-01",
    title: "Summer in Switzerland: Alpine Dreams",
    subtitle: "Exclusive 15% discount for families departing from Chennai & Bangalore",
    tagline: "LUXURY ALPS RETREAT",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Swiss Alps",
    ctaLink: "/packages/swiss-alpine-wonder-paris",
    isActive: true,
    order: 1
  },
  {
    id: "banner-02",
    title: "Sacred South India: Arupadai Veedu",
    subtitle: "Special VIP Darshan passes & Pure Satvik dining arranged",
    tagline: "DIVINE PILGRIMAGE",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    ctaText: "View Pilgrimages",
    ctaLink: "/temple-tours",
    isActive: true,
    order: 2
  }
];

const SEED_SEO: SEOMetadata[] = [
  {
    id: "seo-home",
    route: "/",
    pagePath: "/",
    title: "VK Vacations — Premium International & Domestic Holiday Tours",
    pageTitle: "VK Vacations — Premium International & Domestic Holiday Tours",
    description: "Explore luxury international holidays, India tours, and spiritual temple circuits with VK Vacations.",
    metaDescription: "Explore luxury international holidays, India tours, and spiritual temple circuits with VK Vacations.",
    keywords: ["luxury travel", "tamil nadu tourism", "maldives package", "swiss alps", "temple tours"],
    metaKeywords: "luxury travel, tamil nadu tourism, maldives package, swiss alps, temple tours",
    ogImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://vkvacations.com"
  },
  {
    id: "seo-temple",
    route: "/temple-tours",
    pagePath: "/temple-tours",
    title: "Temple Tours & Spiritual Pilgrimages — VK Vacations",
    pageTitle: "Temple Tours & Spiritual Pilgrimages — VK Vacations",
    description: "Sacred South Indian temple circuits: Arupadai Veedu, Navagraha, Rameshwaram with VIP Darshan passes.",
    metaDescription: "Sacred South Indian temple circuits: Arupadai Veedu, Navagraha, Rameshwaram with VIP Darshan passes.",
    keywords: ["arupadai veedu tour", "navagraha package", "rameshwaram yatra", "satvik meals"],
    metaKeywords: "arupadai veedu tour, navagraha package, rameshwaram yatra, satvik meals",
    ogImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://vkvacations.com/temple-tours"
  }
];

// Helper functions for safe local persistence
function getStored<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch {
    return defaultData;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger custom window event for instant cross-component updates
    window.dispatchEvent(new CustomEvent('vk_db_update', { detail: { key } }));
  } catch (err) {
    console.error(`Failed to store data for ${key}:`, err);
  }
}

// Log audit trail
function recordAudit(action: string, module: string, targetId: string, details: string) {
  try {
    const currentLogs = getStored<AuditLogRecord[]>(DB_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    const newLog: AuditLogRecord = {
      id: `log-${Date.now()}`,
      userName: "Vignesh Kumar",
      userRole: "Super Admin",
      action,
      module,
      targetId,
      details,
      ipAddress: "127.0.0.1",
      timestamp: new Date().toISOString()
    };
    currentLogs.unshift(newLog);
    setStored(DB_KEYS.AUDIT_LOGS, currentLogs.slice(0, 100));
  } catch (e) {
    console.warn("Audit log error:", e);
  }
}

/**
 * Universal Database API Service
 * Powers both Public Website and Admin Panel
 */
export const api = {
  // --- PACKAGES ---
  packages: {
    getAll(): TourPackage[] {
      return getStored<TourPackage[]>(DB_KEYS.PACKAGES, TOUR_PACKAGES);
    },
    getBySlug(slug: string): TourPackage | undefined {
      return this.getAll().find(p => p.slug === slug);
    },
    getById(id: string): TourPackage | undefined {
      return this.getAll().find(p => p.id === id);
    },
    create(data: Omit<TourPackage, 'id'>): TourPackage {
      const list = this.getAll();
      const newPkg: TourPackage = {
        ...data,
        id: `pkg-${Date.now()}`,
        isActive: data.isActive !== undefined ? data.isActive : true
      };
      list.unshift(newPkg);
      setStored(DB_KEYS.PACKAGES, list);
      recordAudit("CREATE", "Packages", newPkg.id, `Created tour package "${newPkg.title}"`);
      return newPkg;
    },
    update(id: string, data: Partial<TourPackage>): TourPackage {
      const list = this.getAll();
      const index = list.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Package not found");
      list[index] = { ...list[index], ...data };
      setStored(DB_KEYS.PACKAGES, list);
      recordAudit("UPDATE", "Packages", id, `Updated tour package "${list[index].title}"`);
      return list[index];
    },
    delete(id: string): void {
      const list = this.getAll().filter(p => p.id !== id);
      setStored(DB_KEYS.PACKAGES, list);
      recordAudit("DELETE", "Packages", id, `Deleted tour package id ${id}`);
    }
  },

  // --- TEMPLE PACKAGES ---
  templePackages: {
    getAll(): TemplePackage[] {
      return getStored<TemplePackage[]>(DB_KEYS.TEMPLE_PACKAGES, TEMPLE_PACKAGES);
    },
    getBySlug(slug: string): TemplePackage | undefined {
      return this.getAll().find(t => t.slug === slug);
    },
    getById(id: string): TemplePackage | undefined {
      return this.getAll().find(t => t.id === id);
    },
    create(data: Omit<TemplePackage, 'id'>): TemplePackage {
      const list = this.getAll();
      const newTmpl: TemplePackage = {
        ...data,
        id: `tmpl-${Date.now()}`,
        isActive: data.isActive !== undefined ? data.isActive : true
      };
      list.unshift(newTmpl);
      setStored(DB_KEYS.TEMPLE_PACKAGES, list);
      recordAudit("CREATE", "Temple Packages", newTmpl.id, `Created temple package "${newTmpl.title}"`);
      return newTmpl;
    },
    update(id: string, data: Partial<TemplePackage>): TemplePackage {
      const list = this.getAll();
      const index = list.findIndex(t => t.id === id);
      if (index === -1) throw new Error("Temple package not found");
      list[index] = { ...list[index], ...data };
      setStored(DB_KEYS.TEMPLE_PACKAGES, list);
      recordAudit("UPDATE", "Temple Packages", id, `Updated temple package "${list[index].title}"`);
      return list[index];
    },
    delete(id: string): void {
      const list = this.getAll().filter(t => t.id !== id);
      setStored(DB_KEYS.TEMPLE_PACKAGES, list);
      recordAudit("DELETE", "Temple Packages", id, `Deleted temple package id ${id}`);
    }
  },

  // --- DESTINATIONS ---
  destinations: {
    getAll(): Destination[] {
      return getStored<Destination[]>(DB_KEYS.DESTINATIONS, DESTINATIONS);
    },
    getBySlug(slug: string): Destination | undefined {
      return this.getAll().find(d => d.slug === slug);
    },
    create(data: Omit<Destination, 'id'>): Destination {
      const list = this.getAll();
      const newDest: Destination = {
        ...data,
        id: `dest-${Date.now()}`,
        isActive: true
      };
      list.unshift(newDest);
      setStored(DB_KEYS.DESTINATIONS, list);
      recordAudit("CREATE", "Destinations", newDest.id, `Created destination "${newDest.name}"`);
      return newDest;
    },
    update(id: string, data: Partial<Destination>): Destination {
      const list = this.getAll();
      const index = list.findIndex(d => d.id === id);
      if (index === -1) throw new Error("Destination not found");
      list[index] = { ...list[index], ...data };
      setStored(DB_KEYS.DESTINATIONS, list);
      recordAudit("UPDATE", "Destinations", id, `Updated destination "${list[index].name}"`);
      return list[index];
    },
    delete(id: string): void {
      const list = this.getAll().filter(d => d.id !== id);
      setStored(DB_KEYS.DESTINATIONS, list);
      recordAudit("DELETE", "Destinations", id, `Deleted destination id ${id}`);
    }
  },

  // --- DEPARTURES ---
  departures: {
    getAll(): DepartureRecord[] {
      return getStored<DepartureRecord[]>(DB_KEYS.DEPARTURES, SCHEDULED_DEPARTURES);
    },
    create(data: Omit<DepartureRecord, 'id'>): DepartureRecord {
      const list = this.getAll();
      const newDep: DepartureRecord = {
        ...data,
        id: `dep-${Date.now()}`
      };
      list.unshift(newDep);
      setStored(DB_KEYS.DEPARTURES, list);
      recordAudit("CREATE", "Departures", newDep.id, `Created departure "${newDep.title}" Ex-${newDep.departureCity}`);
      return newDep;
    },
    update(id: string, data: Partial<DepartureRecord>): DepartureRecord {
      const list = this.getAll();
      const index = list.findIndex(d => d.id === id);
      if (index === -1) throw new Error("Departure not found");
      list[index] = { ...list[index], ...data };
      setStored(DB_KEYS.DEPARTURES, list);
      recordAudit("UPDATE", "Departures", id, `Updated departure "${list[index].title}"`);
      return list[index];
    },
    delete(id: string): void {
      const list = this.getAll().filter(d => d.id !== id);
      setStored(DB_KEYS.DEPARTURES, list);
      recordAudit("DELETE", "Departures", id, `Deleted departure id ${id}`);
    }
  },

  // --- CUSTOMERS ---
  customers: {
    getAll(): Customer[] {
      return getStored<Customer[]>(DB_KEYS.CUSTOMERS, SEED_CUSTOMERS);
    },
    getById(id: string): Customer | undefined {
      return this.getAll().find(c => c.id === id);
    },
    create(data: Omit<Customer, 'id' | 'createdAt'>): Customer {
      const list = this.getAll();
      const newCust: Customer = {
        ...data,
        id: `cust-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      list.unshift(newCust);
      setStored(DB_KEYS.CUSTOMERS, list);
      recordAudit("CREATE", "Customers", newCust.id, `Added customer "${newCust.name}"`);
      return newCust;
    },
    update(id: string, data: Partial<Customer>): Customer {
      const list = this.getAll();
      const idx = list.findIndex(c => c.id === id);
      if (idx === -1) throw new Error("Customer not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.CUSTOMERS, list);
      recordAudit("UPDATE", "Customers", id, `Updated customer "${list[idx].name}"`);
      return list[idx];
    },
    delete(id: string): void {
      const list = this.getAll().filter(c => c.id !== id);
      setStored(DB_KEYS.CUSTOMERS, list);
      recordAudit("DELETE", "Customers", id, `Removed customer ${id}`);
    }
  },

  // --- ENQUIRIES ---
  enquiries: {
    getAll(): EnquiryRecord[] {
      return getStored<EnquiryRecord[]>(DB_KEYS.ENQUIRIES, SEED_ENQUIRIES);
    },
    createFromPublic(data: {
      customerName: string;
      city: string;
      email: string;
      phone: string;
      destination: string;
      travelDate: string;
      travelers: number;
      vacationType: string;
      budgetRange?: string;
      specialRequirements?: string;
    }): EnquiryRecord {
      const list = this.getAll();
      const newRef = `VK-${Math.floor(100000 + Math.random() * 900000)}`;
      const newEnq: EnquiryRecord = {
        id: `enq-${Date.now()}`,
        referenceNumber: newRef,
        ...data,
        status: "New",
        priority: "High",
        submittedAt: new Date().toISOString()
      };
      list.unshift(newEnq);
      setStored(DB_KEYS.ENQUIRIES, list);
      recordAudit("CREATE", "Enquiries", newEnq.referenceNumber || newEnq.id, `New inquiry received from ${newEnq.customerName} for ${newEnq.destination}`);
      return newEnq;
    },
    updateStatus(id: string, status: EnquiryRecord['status'], notes?: string): EnquiryRecord {
      const list = this.getAll();
      const idx = list.findIndex(e => e.id === id);
      if (idx === -1) throw new Error("Enquiry not found");
      list[idx].status = status;
      if (notes) list[idx].notes = notes;
      list[idx].updatedAt = new Date().toISOString();
      setStored(DB_KEYS.ENQUIRIES, list);
      recordAudit("UPDATE", "Enquiries", list[idx].referenceNumber || list[idx].id, `Status updated to ${status}`);
      return list[idx];
    },
    assignStaff(id: string, staffName: string): EnquiryRecord {
      const list = this.getAll();
      const idx = list.findIndex(e => e.id === id);
      if (idx === -1) throw new Error("Enquiry not found");
      list[idx].assignedTo = staffName;
      list[idx].updatedAt = new Date().toISOString();
      setStored(DB_KEYS.ENQUIRIES, list);
      recordAudit("UPDATE", "Enquiries", list[idx].referenceNumber || list[idx].id, `Assigned to ${staffName}`);
      return list[idx];
    },
    update(id: string, data: Partial<EnquiryRecord>): EnquiryRecord {
      const list = this.getAll();
      const idx = list.findIndex(e => e.id === id);
      if (idx === -1) throw new Error("Enquiry not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.ENQUIRIES, list);
      return list[idx];
    }
  },

  // --- CONTACT SUBMISSIONS ---
  contactSubmissions: {
    getAll(): ContactSubmission[] {
      return getStored<ContactSubmission[]>(DB_KEYS.CONTACT_SUBMISSIONS, SEED_CONTACT_SUBMISSIONS);
    },
    create(data: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): ContactSubmission {
      const list = this.getAll();
      const newSubmission: ContactSubmission = {
        ...data,
        id: `cnt-${Date.now()}`,
        status: "New",
        submittedAt: new Date().toISOString()
      };
      list.unshift(newSubmission);
      setStored(DB_KEYS.CONTACT_SUBMISSIONS, list);
      recordAudit("CREATE", "Contact", newSubmission.id, `New contact message from ${newSubmission.name}: ${newSubmission.subject}`);
      return newSubmission;
    },
    updateStatus(id: string, status: ContactSubmission['status'], replyNotes?: string): ContactSubmission {
      const list = this.getAll();
      const idx = list.findIndex(c => c.id === id);
      if (idx === -1) throw new Error("Submission not found");
      list[idx].status = status;
      if (replyNotes) list[idx].replyNotes = replyNotes;
      setStored(DB_KEYS.CONTACT_SUBMISSIONS, list);
      return list[idx];
    }
  },

  // --- LEADS CRM ---
  leads: {
    getAll(): LeadRecord[] {
      return getStored<LeadRecord[]>(DB_KEYS.LEADS, SEED_LEADS);
    },
    create(data: Omit<LeadRecord, 'id' | 'createdAt'>): LeadRecord {
      const list = this.getAll();
      const newLead: LeadRecord = {
        ...data,
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      list.unshift(newLead);
      setStored(DB_KEYS.LEADS, list);
      recordAudit("CREATE", "Leads", newLead.id, `Created sales lead "${newLead.title}" (₹${newLead.dealValue})`);
      return newLead;
    },
    updateStage(id: string, stage: LeadRecord['stage']): LeadRecord {
      const list = this.getAll();
      const idx = list.findIndex(l => l.id === id);
      if (idx === -1) throw new Error("Lead not found");
      list[idx].stage = stage;
      setStored(DB_KEYS.LEADS, list);
      recordAudit("UPDATE", "Leads", id, `Lead stage changed to ${stage}`);
      return list[idx];
    },
    update(id: string, data: Partial<LeadRecord>): LeadRecord {
      const list = this.getAll();
      const idx = list.findIndex(l => l.id === id);
      if (idx === -1) throw new Error("Lead not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.LEADS, list);
      return list[idx];
    },
    delete(id: string): void {
      const list = this.getAll().filter(l => l.id !== id);
      setStored(DB_KEYS.LEADS, list);
    }
  },

  // --- FOLLOW-UPS ---
  followUps: {
    getAll(): FollowUpRecord[] {
      return getStored<FollowUpRecord[]>(DB_KEYS.FOLLOW_UPS, SEED_FOLLOW_UPS);
    },
    create(data: Omit<FollowUpRecord, 'id' | 'createdAt'>): FollowUpRecord {
      const list = this.getAll();
      const newFol: FollowUpRecord = {
        ...data,
        id: `fol-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      list.unshift(newFol);
      setStored(DB_KEYS.FOLLOW_UPS, list);
      return newFol;
    },
    toggleComplete(id: string): FollowUpRecord {
      const list = this.getAll();
      const idx = list.findIndex(f => f.id === id);
      if (idx === -1) throw new Error("Follow up not found");
      list[idx].status = list[idx].status === 'Completed' ? 'Pending' : 'Completed';
      setStored(DB_KEYS.FOLLOW_UPS, list);
      return list[idx];
    },
    update(id: string, data: Partial<FollowUpRecord>): FollowUpRecord {
      const list = this.getAll();
      const idx = list.findIndex(f => f.id === id);
      if (idx === -1) throw new Error("Follow up not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.FOLLOW_UPS, list);
      return list[idx];
    },
    delete(id: string): void {
      const list = this.getAll().filter(f => f.id !== id);
      setStored(DB_KEYS.FOLLOW_UPS, list);
    }
  },

  // --- BOOKINGS ---
  bookings: {
    getAll(): BookingRecord[] {
      return getStored<BookingRecord[]>(DB_KEYS.BOOKINGS, SEED_BOOKINGS);
    },
    getById(id: string): BookingRecord | undefined {
      return this.getAll().find(b => b.id === id || b.bookingReference === id);
    },
    create(data: Omit<BookingRecord, 'id' | 'bookingReference' | 'createdAt'>): BookingRecord {
      const list = this.getAll();
      const ref = `VK-BK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const newBkg: BookingRecord = {
        ...data,
        id: `bkg-${Date.now()}`,
        bookingReference: ref,
        createdAt: new Date().toISOString().split('T')[0]
      };
      list.unshift(newBkg);
      setStored(DB_KEYS.BOOKINGS, list);
      recordAudit("CREATE", "Bookings", ref, `Created booking for ${newBkg.customerName} (${newBkg.packageTitle})`);
      return newBkg;
    },
    updateStatus(id: string, status: BookingRecord['status']): BookingRecord {
      const list = this.getAll();
      const idx = list.findIndex(b => b.id === id);
      if (idx === -1) throw new Error("Booking not found");
      list[idx].status = status;
      if (status) list[idx].bookingStatus = status;
      setStored(DB_KEYS.BOOKINGS, list);
      recordAudit("UPDATE", "Bookings", list[idx].bookingReference, `Booking status changed to ${status}`);
      return list[idx];
    },
    update(id: string, data: Partial<BookingRecord>): BookingRecord {
      const list = this.getAll();
      const idx = list.findIndex(b => b.id === id);
      if (idx === -1) throw new Error("Booking not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.BOOKINGS, list);
      return list[idx];
    }
  },

  // --- PAYMENTS ---
  payments: {
    getAll(): PaymentRecord[] {
      return getStored<PaymentRecord[]>(DB_KEYS.PAYMENTS, SEED_PAYMENTS);
    },
    create(data: Omit<PaymentRecord, 'id' | 'paymentRef' | 'date'>): PaymentRecord {
      const list = this.getAll();
      const ref = `PAY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPay: PaymentRecord = {
        ...data,
        id: `pay-${Date.now()}`,
        paymentRef: ref,
        date: new Date().toISOString().split('T')[0]
      };
      list.unshift(newPay);
      setStored(DB_KEYS.PAYMENTS, list);
      recordAudit("CREATE", "Payments", ref, `Received payment ₹${newPay.amount} for ${newPay.bookingRef}`);
      return newPay;
    }
  },

  // --- INVOICES ---
  invoices: {
    getAll(): InvoiceRecord[] {
      return getStored<InvoiceRecord[]>(DB_KEYS.INVOICES, SEED_INVOICES);
    },
    create(data: Omit<InvoiceRecord, 'id' | 'invoiceNumber' | 'issuedDate'>): InvoiceRecord {
      const list = this.getAll();
      const invNum = `VK-INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const newInv: InvoiceRecord = {
        ...data,
        id: `inv-${Date.now()}`,
        invoiceNumber: invNum,
        issuedDate: new Date().toISOString().split('T')[0]
      };
      list.unshift(newInv);
      setStored(DB_KEYS.INVOICES, list);
      recordAudit("CREATE", "Invoices", invNum, `Issued invoice ${invNum} (₹${newInv.totalAmount})`);
      return newInv;
    }
  },

  // --- REFUNDS ---
  refunds: {
    getAll(): RefundRecord[] {
      return getStored<RefundRecord[]>(DB_KEYS.REFUNDS, SEED_REFUNDS);
    },
    create(data: Omit<RefundRecord, 'id' | 'refundRef' | 'requestedDate'>): RefundRecord {
      const list = this.getAll();
      const refNum = `REF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const newRef: RefundRecord = {
        ...data,
        id: `ref-${Date.now()}`,
        refundRef: refNum,
        requestedDate: new Date().toISOString().split('T')[0]
      };
      list.unshift(newRef);
      setStored(DB_KEYS.REFUNDS, list);
      recordAudit("CREATE", "Refunds", refNum, `Refund requested for ${newRef.bookingRef} (₹${newRef.requestedAmount})`);
      return newRef;
    },
    updateStatus(id: string, status: RefundRecord['status'], approvedBy?: string): RefundRecord {
      const list = this.getAll();
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) throw new Error("Refund not found");
      list[idx].status = status;
      if (approvedBy) list[idx].approvedBy = approvedBy;
      if (status === 'Processed') list[idx].processedDate = new Date().toISOString().split('T')[0];
      setStored(DB_KEYS.REFUNDS, list);
      recordAudit("UPDATE", "Refunds", list[idx].refundRef || list[idx].id, `Refund status updated to ${status}`);
      return list[idx];
    },
    update(id: string, data: Partial<RefundRecord>): RefundRecord {
      const list = this.getAll();
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) throw new Error("Refund not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.REFUNDS, list);
      return list[idx];
    }
  },

  // --- SUPPLIERS ---
  suppliers: {
    getAll(): SupplierRecord[] {
      return getStored<SupplierRecord[]>(DB_KEYS.SUPPLIERS, SEED_SUPPLIERS);
    },
    create(data: Omit<SupplierRecord, 'id'>): SupplierRecord {
      const list = this.getAll();
      const newSup: SupplierRecord = {
        ...data,
        id: `sup-${Date.now()}`
      };
      list.unshift(newSup);
      setStored(DB_KEYS.SUPPLIERS, list);
      recordAudit("CREATE", "Suppliers", newSup.id, `Added supplier "${newSup.name}"`);
      return newSup;
    },
    update(id: string, data: Partial<SupplierRecord>): SupplierRecord {
      const list = this.getAll();
      const idx = list.findIndex(s => s.id === id);
      if (idx === -1) throw new Error("Supplier not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.SUPPLIERS, list);
      return list[idx];
    }
  },

  // --- STAFF ---
  staff: {
    getAll(): StaffRecord[] {
      return getStored<StaffRecord[]>(DB_KEYS.STAFF, SEED_STAFF);
    },
    create(data: Omit<StaffRecord, 'id' | 'joinedDate'>): StaffRecord {
      const list = this.getAll();
      const newStf: StaffRecord = {
        ...data,
        id: `stf-${Date.now()}`,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      list.unshift(newStf);
      setStored(DB_KEYS.STAFF, list);
      recordAudit("CREATE", "Staff", newStf.id, `Added staff member "${newStf.name}"`);
      return newStf;
    },
    update(id: string, data: Partial<StaffRecord>): StaffRecord {
      const list = this.getAll();
      const idx = list.findIndex(s => s.id === id);
      if (idx === -1) throw new Error("Staff member not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.STAFF, list);
      return list[idx];
    }
  },

  // --- AUDIT LOGS ---
  auditLogs: {
    getAll(): AuditLogRecord[] {
      return getStored<AuditLogRecord[]>(DB_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    }
  },

  // --- WEBSITE CMS ---
  website: {
    getBanners(): WebsiteBanner[] {
      return getStored<WebsiteBanner[]>(DB_KEYS.BANNERS, SEED_BANNERS);
    },
    createBanner(data: Omit<WebsiteBanner, 'id'>): WebsiteBanner {
      const list = this.getBanners();
      const newBnr: WebsiteBanner = {
        ...data,
        id: `bnr-${Date.now()}`
      };
      list.unshift(newBnr);
      setStored(DB_KEYS.BANNERS, list);
      return newBnr;
    },
    updateBanner(id: string, data: Partial<WebsiteBanner>): WebsiteBanner {
      const list = this.getBanners();
      const idx = list.findIndex(b => b.id === id);
      if (idx === -1) throw new Error("Banner not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.BANNERS, list);
      return list[idx];
    },
    getSEO(): SEOMetadata[] {
      return getStored<SEOMetadata[]>(DB_KEYS.SEO, SEED_SEO);
    },
    updateSEO(route: string, data: Partial<SEOMetadata>): SEOMetadata {
      const list = this.getSEO();
      const idx = list.findIndex(s => s.route === route || s.pagePath === route);
      if (idx === -1) throw new Error("SEO meta not found");
      list[idx] = { ...list[idx], ...data };
      setStored(DB_KEYS.SEO, list);
      return list[idx];
    }
  },

  // --- ANALYTICS / REPORTS ---
  reports: {
    getOverviewMetrics() {
      const bookings = api.bookings.getAll();
      const totalRevenue = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
      const totalBookingsCount = bookings.length;
      const enquiries = api.enquiries.getAll();
      const customers = api.customers.getAll();
      const pendingFollowUps = api.followUps.getAll().filter(f => f.status === 'Pending').length;

      return {
        totalRevenue,
        totalBookingsCount,
        activeEnquiriesCount: enquiries.filter(e => e.status === 'New' || e.status === 'In Review').length,
        totalCustomersCount: customers.length,
        pendingFollowUps,
        conversionRate: 68.4
      };
    }
  }
};
