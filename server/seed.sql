-- ==============================================================================
-- VK VACATIONS — SEED DATA SCRIPT
-- ==============================================================================

-- 1. Staff Users
INSERT INTO staff_users (id, name, email, password_hash, role, department, phone, status)
VALUES 
('usr-admin-01', 'Vignesh Kumar', 'admin@vkvacations.com', '$2b$10$DEMOHASHSECRETADMIN123', 'Super Admin', 'Executive Management', '+91 94440 12345', 'Active'),
('usr-mgr-02', 'Kavitha Ranganathan', 'manager@vkvacations.com', '$2b$10$DEMOHASHSECRETMGR123', 'Tour Manager', 'Operations', '+91 98410 98765', 'Active')
ON CONFLICT (id) DO NOTHING;

-- 2. Customers
INSERT INTO customers (id, name, email, phone, city, state, total_bookings, total_spent, status, notes)
VALUES
('cust-01', 'Dr. Karthik S.', 'karthik.doc@gmail.com', '+91 98410 44221', 'Chennai', 'Tamil Nadu', 2, 177000.00, 'VIP', 'Prefers overwater villas and direct vegetarian catering.'),
('cust-02', 'S. Muruganandam', 'murugan.cbe@yahoo.com', '+91 94430 88291', 'Coimbatore', 'Tamil Nadu', 1, 219996.00, 'Active', 'Travels with extended 3-generation family.'),
('cust-03', 'Anand R. & Meera Menon', 'anand.menon@blrtech.in', '+91 99001 22334', 'Bangalore', 'Karnataka', 1, 316000.00, 'VIP', 'Swiss Alps anniversary trip executed seamlessly.')
ON CONFLICT (id) DO NOTHING;

-- 3. Tour Packages
INSERT INTO tour_packages (id, slug, title, subtitle, destination, category, is_international, price, original_price, days, nights, featured_image, overview, highlights, inclusions, exclusions, rating, reviews_count, is_featured, is_trending)
VALUES
('pkg-maldives-01', 'maldives-overwater-bliss', 'Maldives Overwater Bliss: Private Island Retreat', 'North Malé Atoll Luxury Lagoon Resort', 'Maldives', 'Honeymoon Packages', true, 88500, 110000, 5, 4, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', 'Indulge in sheer tropical serenity across the turquoise lagoons of the Maldives. Stay in a signature overwater villa with glass floor viewing panels, direct reef ocean access, and all-inclusive gourmet dining.', ARRAY['4 nights in a premium sunrise overwater villa', 'Return speedboat transfers from Velana Airport', 'All-inclusive meals and premium beverages', 'Complimentary sunset dolphin cruise and snorkeling'], ARRAY['4-Star Overwater Villa', 'Daily Breakfast, Lunch, Dinner', 'Speedboat Transfers', 'Snorkeling Gear'], ARRAY['International Flights', 'Travel Insurance', 'Personal Expenses'], 4.9, 48, true, true),
('pkg-swiss-02', 'swiss-alpine-wonder-paris', 'Swiss Alpine Wonder & Romantic Paris', 'Zurich, Lucerne, Interlaken, Mt. Titlis & Paris Eiffel Tower', 'Switzerland & France', 'International Tours', true, 158000, 185000, 7, 6, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', 'Journey through the storybook alpine peaks of Switzerland and the glittering boulevards of Paris.', ARRAY['Swiss Travel Pass for unlimited scenic trains', 'Excursion to Mt. Titlis with ice flyer', 'Seine River dinner cruise with Eiffel Tower view'], ARRAY['4-Star City Center Hotels', 'Daily Buffet Breakfast', 'Swiss Travel Pass 4 Days', 'Paris City Tour'], ARRAY['Airfare', 'Schengen Visa Fee', 'City Tax'], 4.9, 32, true, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Temple Packages
INSERT INTO temple_packages (id, slug, title, subtitle, deity, primary_temple, circuit, state, starting_price, days, nights, featured_image, overview, temples_covered, darshan_types, highlights)
VALUES
('tmpl-arupadai-veedu', 'arupadai-veedu-murugan-temples', 'Arupadai Veedu: The 6 Holy Abodes of Lord Murugan', 'Tiruttani, Swamimalai, Palani, Thiruparankundram, Pazhamudircholai & Thiruchendur', 'Lord Murugan', 'Thiruchendur Murugan Temple & Palani Murugan Temple', 'Arupadai Veedu Sacred Circuit', 'Tamil Nadu', 24500, 6, 5, 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', 'Embark on Tamil Nadu most revered pilgrimage honoring Lord Murugan across all his six divine abodes.', ARRAY['Thiruttani Murugan Temple', 'Swamimalai Temple', 'Palani Dhandayuthapani Temple', 'Thiruparankundram', 'Pazhamudircholai', 'Thiruchendur Sea Temple'], ARRAY['VIP Special Entry Darshan', 'Morning Viswaroopa Seva', 'Panchamirtham Prasadam Ticket'], ARRAY['Special VIP Darshan tickets', 'Rope car pass to Palani hill', 'Pure vegetarian Satvik meals', 'Chauffeured AC Coach'])
ON CONFLICT (id) DO NOTHING;

-- 5. Bookings
INSERT INTO bookings (id, booking_ref, customer_name, package_title, travel_date, passengers, total_amount, paid_amount, booking_status, payment_status)
VALUES
('bkg-01', 'VK-BKG-2026-089', 'Dr. Karthik S.', 'Maldives Overwater Bliss: Private Island Retreat', '2026-04-10', 2, 177000.00, 177000.00, 'Confirmed', 'Paid'),
('bkg-02', 'VK-BKG-2026-090', 'S. Muruganandam', 'Kashmir Paradise on Earth: Srinagar, Gulmarg & Pahalgam', '2026-05-02', 4, 134000.00, 50000.00, 'Confirmed', 'Partial')
ON CONFLICT (id) DO NOTHING;

-- 6. Audit Logs
INSERT INTO audit_logs (id, user_name, action, entity, details, ip_address)
VALUES
('log-01', 'Vignesh Kumar', 'LOGIN', 'Auth', 'Super admin authenticated into console', '127.0.0.1'),
('log-02', 'Vignesh Kumar', 'CREATE', 'TourPackage', 'Published package "Maldives Overwater Bliss"', '127.0.0.1');
