export type PackageCategory = 
  | 'India Tours'
  | 'International Tours'
  | 'Honeymoon'
  | 'Group Tours'
  | 'Europe'
  | 'Educational'
  | 'Luxury'
  | 'Customized'
  | 'Temple Tours';

export type IndiaRegion = 'North India' | 'South India' | 'East India' | 'West India' | 'Islands';

export interface HotelInfo {
  name: string;
  category: string;
  location: string;
  nights: number;
  image?: string;
  amenities: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  mealsIncluded: string[];
  highlights: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  country: string;
  isInternational: boolean;
  region?: IndiaRegion;
  category: PackageCategory[] | any;
  duration: {
    days: number;
    nights: number;
  };
  startingPrice: number; // in INR
  price?: number; // alias
  originalPrice?: number;
  priceNote?: string;
  featuredImage: string;
  galleryImages?: string[];
  gallery?: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotels?: HotelInfo[];
  departureCities?: string[];
  upcomingDepartures?: string[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  reviewsCount?: number;
  suitableFor?: ('Family' | 'Couple' | 'Solo' | 'Group' | 'Senior' | 'Luxury' | 'Adventure')[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isActive?: boolean;
}

export interface TemplePackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  deity: string; // e.g. Lord Shiva, Lord Vishnu, Murugan
  primaryTemple: string; // e.g. Meenakshi Amman, Ramanathaswamy
  circuit: string; // e.g. 'Arupadai Veedu', 'Divya Desam', 'Pancha Bhoota Stalam', 'Navagraha Circuit', 'Char Dham'
  state: string; // e.g. Tamil Nadu, Kerala, Uttarakhand, Odisha
  startingPrice: number;
  duration: {
    days: number;
    nights: number;
  };
  featuredImage: string;
  overview: string;
  templesCovered: string[];
  darshanTypes: string[]; // e.g. 'VIP Special Darshan', 'Suprabhata Seva'
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  departureCities: string[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  isActive?: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  cardImage: string;
  isInternational: boolean;
  region?: IndiaRegion;
  bestTimeToVisit: string;
  idealDuration: string;
  currency: string;
  visaInfo?: {
    type: string;
    processingTime: string;
    note: string;
    lastUpdated: string;
  };
  overview: string;
  topAttractions: {
    name: string;
    description: string;
    image: string;
  }[];
  travelTips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  packageCount?: number;
  packagesCount?: number;
  startingPrice?: number;
  isFeatured?: boolean;
  popularFor: string[];
  isActive?: boolean;
}

export interface DepartureRecord {
  id: string;
  packageId: string;
  packageSlug?: string;
  packageTitle?: string;
  destination?: string;
  title?: string;
  departureDate: string; // YYYY-MM-DD
  returnDate: string;
  durationDays?: number;
  departureCity?: string;
  exCity?: string;
  availableSeats?: number;
  bookedSeats?: number;
  totalSeats: number;
  pricePerPerson?: number;
  pricePerPax?: number;
  status: 'Open' | 'Filling Fast' | 'Limited Seats' | 'Sold Out' | 'Available' | string;
  groupType?: 'Family' | 'Senior Friendly' | 'Standard Group' | 'Premium' | string;
}

export interface InquiryFormData {
  fullName: string;
  city: string;
  email: string;
  phone: string;
  whatsapp?: string;
  destination: string;
  travelDate: string;
  travelers: number;
  vacationType: string;
  budgetRange?: string;
  specialRequirements?: string;
  preferredContactMethod?: 'Phone' | 'WhatsApp' | 'Email';
  packageName?: string;
  honeypot?: string;
  consent: boolean;
}

export interface EnquiryRecord {
  id: string;
  referenceNumber?: string;
  customerName: string;
  name?: string;
  city?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  destination: string;
  packageTitle?: string;
  travelDate?: string;
  tentativeDate?: string;
  travelers?: number;
  travelersCount?: number;
  vacationType?: string;
  budgetRange?: string;
  specialRequirements?: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Quotation Sent' | 'Converted' | 'Lost' | 'Closed' | string;
  assignedTo?: string;
  priority?: 'High' | 'Medium' | 'Low';
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  destination?: string;
  message: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived';
  submittedAt?: string;
  createdAt?: string;
  replyNotes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  passportNumber?: string;
  totalBookings: number;
  totalSpent: number;
  status: 'Active' | 'VIP' | 'Inactive';
  notes?: string;
  createdAt: string;
}

export interface LeadRecord {
  id: string;
  title?: string;
  customerName?: string;
  name?: string;
  email: string;
  phone: string;
  destination: string;
  stage: 'New' | 'Contacted' | 'Proposal Sent' | 'Negotiating' | 'Won' | 'Lost' | 'New Lead' | string;
  dealValue?: number;
  estimatedValue?: number;
  probability?: number; // 0 - 100%
  assignedTo: string;
  expectedCloseDate?: string;
  source?: 'Website Enquiry' | 'Direct Call' | 'WhatsApp' | 'Referral' | 'Website Referral' | string;
  notes?: string;
  createdAt?: string;
}

export interface FollowUpRecord {
  id: string;
  leadId?: string;
  customerName: string;
  phone?: string;
  type?: 'Call' | 'WhatsApp' | 'Email' | 'Meeting';
  dueDate: string;
  dueTime?: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  priority?: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  notes: string;
  createdAt?: string;
}

export interface BookingRecord {
  id: string;
  bookingReference: string;
  bookingRef?: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  packageTitle: string;
  packageId?: string;
  destination?: string;
  travelDate: string;
  returnDate?: string;
  guestsCount?: number;
  passengers?: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount?: number;
  status?: 'Confirmed' | 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  bookingStatus?: 'Confirmed' | 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid in Full' | 'Partially Paid' | 'Payment Pending' | 'Refunded' | 'Paid' | 'Partial' | 'Pending';
  assignedTourManager?: string;
  specialRequests?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  paymentRef?: string;
  bookingRef?: string;
  bookingId?: string;
  customerName: string;
  amount: number;
  method: 'UPI' | 'Credit Card' | 'Net Banking' | 'Bank Transfer' | 'Cash' | string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Verified' | string;
  transactionId: string;
  date?: string;
  paymentDate?: string;
  notes?: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  bookingRef?: string;
  bookingId?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  description?: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'Paid' | 'Sent' | 'Overdue' | 'Draft' | string;
  dueDate: string;
  issuedDate?: string;
  issueDate?: string;
}

export interface RefundRecord {
  id: string;
  refundRef?: string;
  bookingRef?: string;
  bookingId?: string;
  customerName: string;
  requestedAmount?: number;
  refundAmount?: number;
  amount?: number;
  reason: string;
  status: 'Requested' | 'Under Review' | 'Approved' | 'Processed' | 'Rejected';
  approvedBy?: string;
  processedDate?: string;
  requestedDate?: string;
  createdAt?: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  category: 'Hotel Partner' | 'Transport Operator' | 'Airlines' | 'Guide Association' | 'Cruise Line' | 'Hotel' | 'Transport' | 'Airline' | 'Guide' | string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  country?: string;
  rating?: number;
  contractStatus?: 'Active' | 'Under Review' | 'Terminated';
  status?: string;
  balancePayable?: number;
  notes?: string;
}

export interface StaffRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Tour Manager' | 'Sales Specialist' | 'Accounts Executive' | string;
  department: 'Operations' | 'Sales' | 'Finance' | 'Customer Support' | string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  joinedDate: string;
  performanceScore?: number;
}

export interface RolePermission {
  role: string;
  description: string;
  permissions: {
    module: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  }[];
}

export interface AuditLogRecord {
  id: string;
  userName: string;
  userRole?: string;
  action: string;
  module?: string;
  entity?: string;
  targetId?: string;
  entityId?: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  /** Firebase Auth uid of the staff member who performed the action. */
  userId?: string;
}

export interface WebsiteBanner {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string;
  image?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order?: number;
  displayOrder?: number;
}

export interface SEOMetadata {
  id?: string;
  pagePath?: string;
  route?: string;
  pageTitle?: string;
  title?: string;
  metaDescription?: string;
  description?: string;
  metaKeywords?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  destination: string;
  tourName: string;
  review: string;
  rating: number;
  date: string;
  avatar: string;
  travelType: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  readTime?: string;
  coverImage: string;
  tags: string[];
  isPublished?: boolean;
}

export interface ExclusiveDeal {
  id: string;
  packageSlug: string;
  title: string;
  destination: string;
  image: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  validUntil: string;
  duration: string;
  terms: string[];
  slotsRemaining: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Tour Manager' | 'Sales Specialist' | 'Accounts Executive';
  avatar: string;
  token?: string;
}
