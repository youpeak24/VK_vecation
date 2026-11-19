import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Share2, CheckCircle2, Compass, Phone, Mail, Calendar, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { BookingRecord } from '../../types';
import { COMPANY } from '../../data/company';
import { formatCurrency } from '../../utils/formatters';

export const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (!id) return;
    const found = api.bookings.getById(id);
    if (found) {
      setBooking(found);
    }
  }, [id]);

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-500">Booking voucher not found.</p>
        <Link to="/admin/bookings" className="text-[#0866D9] mt-2 inline-block">Back to Bookings</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const balanceAmount = Math.max(0, booking.totalAmount - booking.paidAmount);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between no-print">
        <Link 
          to="/admin/bookings" 
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-[#0866D9] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Bookings</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-heading font-bold transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Travel Voucher</span>
          </button>
        </div>
      </div>

      {/* Official VK Vacations Printable Travel Voucher Document */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg print:shadow-none print:border-none print:p-0">
        
        {/* Voucher Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src="/android-chrome-192x192.png" 
                alt="VK Vacations Official Voucher" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl text-[#071B35] tracking-tight block">
                {COMPANY.name}
              </span>
              <span className="text-[11px] text-[#00B8A9] font-heading font-bold tracking-widest uppercase block">
                Official Travel Confirmation Voucher
              </span>
              <span className="text-[10px] text-slate-400">
                GSTIN: 33AAECV9204P1Z3 • Govt. Reg. Tour Operator
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs uppercase tracking-wider font-heading font-bold text-slate-400 block">
              Booking Reference
            </span>
            <span className="font-mono text-base font-bold text-[#0866D9] block">
              {booking.bookingRef || booking.bookingReference}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Issued: {booking.createdAt}
            </span>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              {booking.bookingStatus || booking.status || 'Confirmed'}
            </span>
          </div>
        </div>

        {/* Guest & Reservation Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Primary Passenger / Lead Traveler
            </h4>
            <div className="space-y-1">
              <span className="font-heading font-bold text-sm text-[#071B35] block">
                {booking.customerName}
              </span>
              <span className="text-slate-600 block">Total Travelers: {booking.passengers || booking.guestsCount || 1} Adult(s)</span>
              <span className="text-slate-600 block">Payment Status: <strong className="text-emerald-700">{booking.paymentStatus}</strong></span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Tour Itinerary Particulars
            </h4>
            <div className="space-y-1">
              <span className="font-heading font-bold text-sm text-[#071B35] block">
                {booking.packageTitle}
              </span>
              <span className="text-slate-600 block">Departure Date: {booking.travelDate}</span>
              <span className="text-slate-600 block">Assistance Helpline: {COMPANY.phone}</span>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="py-6 border-b border-slate-200">
          <h4 className="font-heading font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-3">
            Financial Ledger & Billing Summary
          </h4>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-heading font-bold text-slate-500 uppercase">
                <th className="text-left py-2">Item Description</th>
                <th className="text-right py-2">Units</th>
                <th className="text-right py-2">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5">
                  <span className="font-semibold text-[#071B35] block">{booking.packageTitle}</span>
                  <span className="text-[11px] text-slate-400">Includes Deluxe Accommodation, Transfers, Sightseeing & Breakfast</span>
                </td>
                <td className="text-right py-2.5">{booking.passengers || booking.guestsCount || 1} Pax</td>
                <td className="text-right py-2.5 font-heading font-bold text-[#071B35]">
                  {formatCurrency(booking.totalAmount)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="py-2 text-right font-medium text-slate-500">
                  Total Package Fare (Inclusive of 5% GST):
                </td>
                <td className="py-2 text-right font-heading font-bold text-[#071B35]">
                  {formatCurrency(booking.totalAmount)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="py-2 text-right font-medium text-emerald-700">
                  Amount Received / Paid:
                </td>
                <td className="py-2 text-right font-heading font-bold text-emerald-700">
                  {formatCurrency(booking.paidAmount)}
                </td>
              </tr>
              {balanceAmount > 0 && (
                <tr>
                  <td colSpan={2} className="py-2 text-right font-medium text-rose-600">
                    Remaining Balance Due:
                  </td>
                  <td className="py-2 text-right font-heading font-bold text-rose-600">
                    {formatCurrency(balanceAmount)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Terms & Important Information */}
        <div className="pt-6 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <h4 className="font-heading font-bold uppercase tracking-wider text-[#071B35] text-xs">
            Important Travel Guidelines:
          </h4>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li>Please present this original confirmation voucher along with valid government photo IDs (Aadhaar / Passport) during hotel check-in.</li>
            <li>Standard hotel check-in time is 14:00 hrs and check-out is 11:00 hrs. Early check-in is subject to room availability.</li>
            <li>For airport transfers, our local VK Vacations representative will meet you at the arrival hall with your name placard.</li>
            <li>24x7 Customer Support & Emergency Assistance: <strong>{COMPANY.phone}</strong> / <strong>{COMPANY.email}</strong></li>
          </ul>
        </div>

        {/* Footer Signature */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>Thank you for choosing VK Vacations. Have a wonderful journey!</span>
          <span className="font-heading font-bold text-slate-700">Authorized Signatory • VK Vacations</span>
        </div>

      </div>

    </div>
  );
};

export default BookingDetail;
