import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InquiryModalProvider } from './context/InquiryModalContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedAdminRoute } from './layouts/ProtectedAdminRoute';

// Public Pages (Code Splitting)
import { Home } from './pages/Home';
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Packages = lazy(() => import('./pages/Packages').then(m => ({ default: m.Packages })));
const PackageDetail = lazy(() => import('./pages/PackageDetail').then(m => ({ default: m.PackageDetail })));
const TempleTours = lazy(() => import('./pages/TempleTours').then(m => ({ default: m.TempleTours })));
const TempleTourDetail = lazy(() => import('./pages/TempleTourDetail').then(m => ({ default: m.TempleTourDetail })));
const Destinations = lazy(() => import('./pages/Destinations').then(m => ({ default: m.Destinations })));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail').then(m => ({ default: m.DestinationDetail })));
const IndiaTours = lazy(() => import('./pages/IndiaTours').then(m => ({ default: m.IndiaTours })));
const InternationalTours = lazy(() => import('./pages/InternationalTours').then(m => ({ default: m.InternationalTours })));
const Honeymoon = lazy(() => import('./pages/Honeymoon').then(m => ({ default: m.Honeymoon })));
const GroupTours = lazy(() => import('./pages/GroupTours').then(m => ({ default: m.GroupTours })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(m => ({ default: m.BlogDetail })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./pages/TermsConditions').then(m => ({ default: m.TermsConditions })));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy').then(m => ({ default: m.RefundPolicy })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Admin Auth
const AdminLogin = lazy(() => import('./pages/auth/AdminLogin').then(m => ({ default: m.AdminLogin })));

// Admin Console Modules (Code Splitting)
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const Customers = lazy(() => import('./pages/admin/Customers').then(m => ({ default: m.Customers })));
const ContactSubmissions = lazy(() => import('./pages/admin/ContactSubmissions').then(m => ({ default: m.ContactSubmissions })));
const Enquiries = lazy(() => import('./pages/admin/Enquiries').then(m => ({ default: m.Enquiries })));
const Leads = lazy(() => import('./pages/admin/Leads').then(m => ({ default: m.Leads })));
const FollowUps = lazy(() => import('./pages/admin/FollowUps').then(m => ({ default: m.FollowUps })));
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages').then(m => ({ default: m.AdminPackages })));
const CreatePackage = lazy(() => import('./pages/admin/CreatePackage').then(m => ({ default: m.CreatePackage })));
const EditPackage = lazy(() => import('./pages/admin/EditPackage').then(m => ({ default: m.EditPackage })));
const TemplePackages = lazy(() => import('./pages/admin/TemplePackages').then(m => ({ default: m.TemplePackages })));
const CreateTemplePackage = lazy(() => import('./pages/admin/CreateTemplePackage').then(m => ({ default: m.CreateTemplePackage })));
const AdminDestinations = lazy(() => import('./pages/admin/AdminDestinations').then(m => ({ default: m.AdminDestinations })));
const Departures = lazy(() => import('./pages/admin/Departures').then(m => ({ default: m.Departures })));
const Bookings = lazy(() => import('./pages/admin/Bookings').then(m => ({ default: m.Bookings })));
const BookingDetail = lazy(() => import('./pages/admin/BookingDetail').then(m => ({ default: m.BookingDetail })));
const Payments = lazy(() => import('./pages/admin/Payments').then(m => ({ default: m.Payments })));
const Invoices = lazy(() => import('./pages/admin/Invoices').then(m => ({ default: m.Invoices })));
const Refunds = lazy(() => import('./pages/admin/Refunds').then(m => ({ default: m.Refunds })));
const Suppliers = lazy(() => import('./pages/admin/Suppliers').then(m => ({ default: m.Suppliers })));
const WebsiteCMS = lazy(() => import('./pages/admin/WebsiteCMS').then(m => ({ default: m.WebsiteCMS })));
const Reports = lazy(() => import('./pages/admin/Reports').then(m => ({ default: m.Reports })));
const Staff = lazy(() => import('./pages/admin/Staff').then(m => ({ default: m.Staff })));
const Roles = lazy(() => import('./pages/admin/Roles').then(m => ({ default: m.Roles })));
const Settings = lazy(() => import('./pages/admin/Settings').then(m => ({ default: m.Settings })));
const ActivityLogs = lazy(() => import('./pages/admin/ActivityLogs').then(m => ({ default: m.ActivityLogs })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <InquiryModalProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* PUBLIC WEBSITE ROUTES WITH LUXURY PUBLIC LAYOUT */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:slug" element={<PackageDetail />} />
              <Route path="/temple-tours" element={<TempleTours />} />
              <Route path="/temple-tours/:slug" element={<TempleTourDetail />} />
              <Route path="/india-tours" element={<IndiaTours />} />
              <Route path="/international-tours" element={<InternationalTours />} />
              <Route path="/honeymoon" element={<Honeymoon />} />
              <Route path="/group-tours" element={<GroupTours />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:slug" element={<DestinationDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
            </Route>

            {/* ADMIN AUTHENTICATION */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* PROTECTED ADMIN DASHBOARD CONSOLE */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="contact-submissions" element={<ContactSubmissions />} />
                <Route path="enquiries" element={<Enquiries />} />
                <Route path="leads" element={<Leads />} />
                <Route path="follow-ups" element={<FollowUps />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="packages/create" element={<CreatePackage />} />
                <Route path="packages/:id/edit" element={<EditPackage />} />
                <Route path="temple-packages" element={<TemplePackages />} />
                <Route path="temple-packages/create" element={<CreateTemplePackage />} />
                <Route path="destinations" element={<AdminDestinations />} />
                <Route path="departures" element={<Departures />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:id" element={<BookingDetail />} />
                <Route path="payments" element={<Payments />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="refunds" element={<Refunds />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="website" element={<WebsiteCMS />} />
                <Route path="website/homepage" element={<WebsiteCMS />} />
                <Route path="website/banners" element={<WebsiteCMS />} />
                <Route path="website/gallery" element={<WebsiteCMS />} />
                <Route path="website/blog" element={<WebsiteCMS />} />
                <Route path="website/seo" element={<WebsiteCMS />} />
                <Route path="reports" element={<Reports />} />
                <Route path="staff" element={<Staff />} />
                <Route path="roles" element={<Roles />} />
                <Route path="settings" element={<Settings />} />
                <Route path="activity-logs" element={<ActivityLogs />} />
              </Route>
            </Route>

            {/* GLOBAL 404 CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </InquiryModalProvider>
    </BrowserRouter>
  );
};

export default App;
