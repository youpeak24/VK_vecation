-- ==============================================================================
-- VK VACATIONS — COMPLETE ENTERPRISE POSTGRESQL DATABASE SCHEMA
-- Travel & Tourism Management System
-- ==============================================================================

-- 1. Users & Staff Authentication
CREATE TABLE IF NOT EXISTS staff_users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Tour Manager',
    department VARCHAR(100) NOT NULL DEFAULT 'Operations',
    phone VARCHAR(50),
    avatar_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customer CRM
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    passport_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    total_bookings INTEGER DEFAULT 0,
    total_spent NUMERIC(12, 2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Destinations
CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    hero_image TEXT NOT NULL,
    best_time_to_visit VARCHAR(100),
    ideal_duration VARCHAR(50),
    starting_price NUMERIC(10, 2) NOT NULL,
    packages_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tour Packages
CREATE TABLE IF NOT EXISTS tour_packages (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    destination VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_international BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    days INTEGER NOT NULL,
    nights INTEGER NOT NULL,
    featured_image TEXT NOT NULL,
    gallery TEXT[],
    overview TEXT,
    highlights TEXT[],
    inclusions TEXT[],
    exclusions TEXT[],
    rating NUMERIC(2, 1) DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Package Daily Itineraries
CREATE TABLE IF NOT EXISTS package_itineraries (
    id SERIAL PRIMARY KEY,
    package_id VARCHAR(50) REFERENCES tour_packages(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meals_included TEXT[],
    stay_details VARCHAR(255)
);

-- 6. Temple Packages (Pilgrimages)
CREATE TABLE IF NOT EXISTS temple_packages (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    deity VARCHAR(100) NOT NULL,
    primary_temple VARCHAR(255) NOT NULL,
    circuit VARCHAR(150) NOT NULL,
    state VARCHAR(100) NOT NULL,
    starting_price NUMERIC(10, 2) NOT NULL,
    days INTEGER NOT NULL,
    nights INTEGER NOT NULL,
    featured_image TEXT NOT NULL,
    overview TEXT,
    temples_covered TEXT[],
    darshan_types TEXT[],
    highlights TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Group Scheduled Departures
CREATE TABLE IF NOT EXISTS scheduled_departures (
    id VARCHAR(50) PRIMARY KEY,
    package_id VARCHAR(50) REFERENCES tour_packages(id) ON DELETE SET NULL,
    package_title VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE,
    ex_city VARCHAR(100) NOT NULL,
    total_seats INTEGER NOT NULL DEFAULT 30,
    booked_seats INTEGER NOT NULL DEFAULT 0,
    price_per_pax NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Web Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    destination VARCHAR(100),
    package_title VARCHAR(255),
    travelers_count INTEGER DEFAULT 2,
    tentative_date VARCHAR(50),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'New',
    assigned_to VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    destination VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Sales CRM Leads
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    destination VARCHAR(100) NOT NULL,
    estimated_value NUMERIC(12, 2) DEFAULT 0,
    stage VARCHAR(50) NOT NULL DEFAULT 'New Lead',
    source VARCHAR(100) DEFAULT 'Website',
    assigned_to VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Follow-up Reminders
CREATE TABLE IF NOT EXISTS follow_ups (
    id VARCHAR(50) PRIMARY KEY,
    lead_id VARCHAR(50) REFERENCES leads(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    due_date DATE NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    assigned_to VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Bookings & Reservations
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    booking_ref VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(50) REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    package_id VARCHAR(50),
    package_title VARCHAR(255) NOT NULL,
    travel_date DATE NOT NULL,
    passengers INTEGER NOT NULL DEFAULT 1,
    total_amount NUMERIC(12, 2) NOT NULL,
    paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    booking_status VARCHAR(50) DEFAULT 'Confirmed',
    payment_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Payments Ledger
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) REFERENCES bookings(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_date DATE NOT NULL,
    method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Invoices
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(50) PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    booking_id VARCHAR(50) REFERENCES bookings(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,
    tax_amount NUMERIC(12, 2) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Sent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Refunds
CREATE TABLE IF NOT EXISTS refunds (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) REFERENCES bookings(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Requested',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Suppliers & Partners
CREATE TABLE IF NOT EXISTS suppliers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    contact_person VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    city VARCHAR(100),
    rating NUMERIC(2, 1) DEFAULT 4.5,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Website Banners
CREATE TABLE IF NOT EXISTS website_banners (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    image_url TEXT NOT NULL,
    cta_text VARCHAR(100) DEFAULT 'Explore Now',
    cta_link VARCHAR(255) DEFAULT '/packages',
    display_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 18. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    user_name VARCHAR(150) NOT NULL,
    action VARCHAR(50) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(50),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Essential Indexes
CREATE INDEX IF NOT EXISTS idx_packages_slug ON tour_packages(slug);
CREATE INDEX IF NOT EXISTS idx_temple_packages_slug ON temple_packages(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_payments_txn ON payments(transaction_id);
