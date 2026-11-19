import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  User, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Ticket,
  Users
} from 'lucide-react';
import { authService } from '../../services/auth';
import { api } from '../../services/api';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const quickRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const notifications = [
    {
      id: 'notif-1',
      title: 'New Travel Enquiry Received',
      detail: 'Anand R. requested quotation for Swiss Alpine Wonder',
      time: '12m ago',
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Booking Confirmed (VK-BKG-2026-089)',
      detail: 'Payment of ₹1,77,000 received via Razorpay UPI',
      time: '45m ago',
      unread: true
    },
    {
      id: 'notif-3',
      title: 'Temple Pilgrimage Inquiry',
      detail: 'Muruganandam asked for 6 Pax Arupadai Veedu tour',
      time: '2h ago',
      unread: true
    }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-[#071B35] hover:bg-slate-100 rounded-lg"
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, bookings, packages, customers..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 focus:border-[#0866D9] text-[#142238] transition-all"
          />
        </div>
      </div>

      {/* Right: Quick Actions, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Quick Actions Dropdown */}
        <div ref={quickRef} className="relative">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0866D9] hover:bg-blue-700 text-white text-xs font-heading font-semibold transition-all shadow-sm shadow-blue-500/25 cursor-pointer"
          >
            <Plus size={15} />
            <span className="hidden md:inline">Quick Action</span>
            <ChevronDown size={13} className={`transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
          </button>

          {showQuickActions && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <Link
                to="/admin/packages/create"
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0866D9] transition-colors"
              >
                <Plus size={14} className="text-[#0866D9]" />
                <span>Create Tour Package</span>
              </Link>
              <Link
                to="/admin/temple-packages/create"
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <Sparkles size={14} className="text-amber-600" />
                <span>Add Temple Package</span>
              </Link>
              <Link
                to="/admin/leads"
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0866D9] transition-colors"
              >
                <Users size={14} className="text-[#00B8A9]" />
                <span>Add Sales Lead</span>
              </Link>
              <Link
                to="/admin/bookings"
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0866D9] transition-colors"
              >
                <Ticket size={14} className="text-[#FF8A38]" />
                <span>Create Booking</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0);
            }}
            className="p-2 text-slate-600 hover:text-[#071B35] hover:bg-slate-100 rounded-xl relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <span className="font-heading font-bold text-xs text-[#071B35]">Recent Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 mt-1 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-xs text-[#071B35]">{n.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.detail}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-center">
                <Link 
                  to="/admin/enquiries" 
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#0866D9] font-heading font-semibold hover:underline"
                >
                  View All Activity & Enquiries →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0866D9] to-[#00B8A9] text-white flex items-center justify-center font-heading font-bold text-xs shadow-sm">
              {currentUser?.name?.charAt(0) || 'V'}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-heading font-bold text-[#071B35] block leading-tight">
                {currentUser?.name || 'Vignesh Kumar'}
              </span>
              <span className="text-[10px] text-slate-400 block leading-none">
                {currentUser?.role || 'Super Admin'}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-heading font-bold text-[#071B35]">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
              </div>
              <Link
                to="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User size={14} className="text-slate-500" />
                <span>Account Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
              >
                <LogOut size={14} className="text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
