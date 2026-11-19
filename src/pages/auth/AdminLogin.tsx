import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Compass, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { authService } from '../../services/auth';
import { SEOHead } from '../../components/seo/SEOHead';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin';

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (type: 'admin' | 'manager') => {
    if (type === 'admin') {
      setEmail('admin@vkvacations.in');
      setPassword('admin123');
    } else {
      setEmail('manager@vkvacations.in');
      setPassword('manager123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071B35] via-[#0A2540] to-[#040E1B] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <SEOHead
        title="Admin & Staff Portal Sign In | VK Vacations"
        description="Authorized personnel only. Secure access to VK Vacations Travel Management System."
        noIndex
      />
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0866D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00B8A9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-2xl overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src="/android-chrome-512x512.png" 
                alt="VK Vacations Enterprise Portal" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="text-left">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white block">
                VK <span className="text-[#0866D9]">VACATIONS</span>
              </span>
              <span className="text-[10px] text-[#00B8A9] tracking-widest uppercase block font-semibold">
                Enterprise Portal
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 mt-2">
            Secure Management Console & Travel ERP System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-white">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Authorized personnel only. Sessions are monitored.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200">
              <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@vkvacations.in"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#0866D9] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-heading font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-[#00B8A9] cursor-pointer hover:underline">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#0866D9] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#0866D9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Authenticate & Enter</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-slate-400 block text-center">
              One-Click Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] text-slate-200 font-medium transition-colors cursor-pointer text-center"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('manager')}
                className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] text-slate-200 font-medium transition-colors cursor-pointer text-center"
              >
                Tour Manager
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
