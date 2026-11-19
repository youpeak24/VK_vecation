import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  CalendarClock, 
  Package, 
  Sparkles, 
  Compass, 
  PlaneTakeoff, 
  TicketCheck, 
  CreditCard, 
  FileText, 
  RotateCcw, 
  Truck, 
  Globe, 
  BarChart3, 
  UserCog, 
  ShieldCheck, 
  Sliders, 
  History, 
  LogOut,
  X,
  ExternalLink,
  MessageSquareQuote
} from 'lucide-react';
import { authService } from '../../services/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  interface NavItem {
    name: string;
    path: string;
    icon: any;
    exact?: boolean;
  }

  interface NavGroup {
    group: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true }
      ]
    },
    {
      group: 'Sales & CRM',
      items: [
        { name: 'Leads Pipeline', path: '/admin/leads', icon: Users },
        { name: 'Follow-ups', path: '/admin/follow-ups', icon: CalendarClock },
        { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquareQuote },
        { name: 'Contact Submissions', path: '/admin/contact-submissions', icon: PhoneCall },
        { name: 'Customers', path: '/admin/customers', icon: Users }
      ]
    },
    {
      group: 'Tour Operations',
      items: [
        { name: 'Tour Packages', path: '/admin/packages', icon: Package },
        { name: 'Temple Tours', path: '/admin/temple-packages', icon: Sparkles },
        { name: 'Destinations', path: '/admin/destinations', icon: Compass },
        { name: 'Departures', path: '/admin/departures', icon: PlaneTakeoff }
      ]
    },
    {
      group: 'Finance & Bookings',
      items: [
        { name: 'Bookings', path: '/admin/bookings', icon: TicketCheck },
        { name: 'Payments', path: '/admin/payments', icon: CreditCard },
        { name: 'Invoices', path: '/admin/invoices', icon: FileText },
        { name: 'Refunds', path: '/admin/refunds', icon: RotateCcw },
        { name: 'Suppliers', path: '/admin/suppliers', icon: Truck }
      ]
    },
    {
      group: 'Content & CMS',
      items: [
        { name: 'Website CMS', path: '/admin/website', icon: Globe }
      ]
    },
    {
      group: 'System & Admin',
      items: [
        { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
        { name: 'Staff Management', path: '/admin/staff', icon: UserCog },
        { name: 'Roles & Permissions', path: '/admin/roles', icon: ShieldCheck },
        { name: 'Audit Logs', path: '/admin/activity-logs', icon: History },
        { name: 'Settings', path: '/admin/settings', icon: Sliders }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071B35] text-slate-300 flex flex-col border-r border-[#1E293B] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#071B35]">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 shadow-md overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src="/android-chrome-192x192.png" 
                alt="VK Vacations Admin" 
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm text-white tracking-wide block">
                VK VACATIONS
              </span>
              <span className="text-[10px] text-[#00B8A9] tracking-wider uppercase block font-semibold">
                Admin Console
              </span>
            </div>
          </Link>

          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Sections (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar text-xs">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-[10px] font-heading font-bold uppercase tracking-widest text-slate-400">
                {group.group}
              </span>

              <div className="pt-1 space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-[#0866D9] text-white font-semibold shadow-md shadow-blue-600/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`
                    }
                  >
                    <item.icon size={16} className="shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Card & Public Website Link Footer */}
        <div className="p-3 border-t border-[#1E293B] bg-[#051428] shrink-0 space-y-2">
          {/* View Public Website */}
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
          >
            <span>View Public Website</span>
            <ExternalLink size={12} />
          </Link>

          {/* User Profile Info & Logout */}
          <div className="flex items-center justify-between pt-1 px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0866D9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="truncate text-left">
                <span className="font-heading font-semibold text-xs text-white block truncate">
                  {currentUser?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {currentUser?.role || 'Super Admin'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
