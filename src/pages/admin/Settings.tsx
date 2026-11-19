import React, { useState } from 'react';
import { Sliders, Save, CheckCircle2, Shield, CreditCard, Building } from 'lucide-react';
import { COMPANY } from '../../data/company';

export const Settings: React.FC = () => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State initialized with COMPANY data
  const [companyName, setCompanyName] = useState(COMPANY.name);
  const [phone, setPhone] = useState(COMPANY.phone);
  const [email, setEmail] = useState(COMPANY.email);
  const [whatsapp, setWhatsapp] = useState(COMPANY.whatsappNumber);
  const [address, setAddress] = useState(`${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city}, ${COMPANY.address.state} - ${COMPANY.address.pincode}`);
  const [businessHours, setBusinessHours] = useState(COMPANY.businessHours);
  const [gstRate, setGstRate] = useState(5);
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_94819402941');
  const [razorpaySecret, setRazorpaySecret] = useState('••••••••••••••••••••••••');
  const [gatewayMode, setGatewayMode] = useState<'Live' | 'Test'>('Live');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          System Settings & Business Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure verified contact information, payment gateways, tax rates, and brand identity.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-heading font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>System configuration successfully updated and saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Company & Contact Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building size={18} className="text-[#0866D9]" />
            <h3 className="font-heading font-bold text-base text-[#071B35]">Company & Verified Contact Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Company Legal / Brand Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Operating Business Hours</label>
              <input
                type="text"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Customer Helpline Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Support Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">WhatsApp Business Number</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Headquarters Registered Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        {/* Brand Assets & Media Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building size={18} className="text-[#FF8A38]" />
            <h3 className="font-heading font-bold text-base text-[#071B35]">Active Brand Assets & Verified Logos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img src="/android-chrome-192x192.png" alt="Primary Logo" className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-xs" />
              <div>
                <span className="font-heading font-bold text-slate-800 block">Primary Brand Logo</span>
                <span className="text-[10px] text-slate-500 block">192x192 / 512x512 PNG</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Active Everywhere</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img src="/apple-touch-icon.png" alt="Apple Touch Icon" className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-xs" />
              <div>
                <span className="font-heading font-bold text-slate-800 block">App & Favicon</span>
                <span className="text-[10px] text-slate-500 block">apple-touch-icon / favicon.ico</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Configured in Head</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img src="/hero.png" alt="Hero Badge Banner" className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-xs" />
              <div>
                <span className="font-heading font-bold text-slate-800 block">Hero Graphic Banner</span>
                <span className="text-[10px] text-slate-500 block">hero.png (343x361)</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Featured on Homepage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway & Taxes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard size={18} className="text-emerald-600" />
            <h3 className="font-heading font-bold text-base text-[#071B35]">Razorpay Gateway & Taxation Settings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Gateway Environment</label>
              <select
                value={gatewayMode}
                onChange={(e) => setGatewayMode(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
              >
                <option value="Live">Live Production</option>
                <option value="Test">Sandbox / Test</option>
              </select>
            </div>
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">GST Tax Percentage (%)</label>
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <Save size={15} />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default Settings;
