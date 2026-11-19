import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Clock, AlertCircle, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';
import { api } from '../../services/api';
import { PaymentRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  const loadPayments = () => {
    setPayments(api.payments.getAll());
  };

  useEffect(() => {
    loadPayments();
    const handleUpdate = () => loadPayments();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const totalCollected = payments
    .filter(p => p.status === 'Verified')
    .reduce((sum, p) => sum + p.amount, 0);

  const columns: Column<PaymentRecord>[] = [
    {
      key: 'transactionId',
      header: 'Transaction ID & Booking',
      sortable: true,
      render: (p) => (
        <div>
          <span className="font-mono text-xs font-bold text-[#0866D9] block">{p.transactionId}</span>
          <span className="text-[11px] text-slate-400">Ref: {p.bookingId}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Traveler Name',
      sortable: true,
      render: (p) => <span className="font-heading font-bold text-xs text-[#071B35]">{p.customerName}</span>
    },
    {
      key: 'amount',
      header: 'Amount Paid',
      sortable: true,
      render: (p) => (
        <span className="font-heading font-bold text-xs text-emerald-700">
          {formatCurrency(p.amount)}
        </span>
      )
    },
    {
      key: 'method',
      header: 'Payment Gateway / Channel',
      sortable: true,
      render: (p) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200">
          {p.method}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Verification Status',
      sortable: true,
      render: (p) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit ${
          p.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          p.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          <CheckCircle2 size={11} className={p.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'} />
          <span>{p.status}</span>
        </span>
      )
    },
    {
      key: 'paymentDate',
      header: 'Payment Date',
      sortable: true,
      render: (p) => <span className="text-xs text-slate-500">{p.paymentDate}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Payment Ledger & Transactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reconciled payments received via Razorpay UPI, NetBanking, and direct bank transfers.
          </p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-heading font-semibold block">Total Reconciled</span>
            <span className="text-xl font-heading font-black text-emerald-700">{formatCurrency(totalCollected)}</span>
          </div>
        </div>
      </div>

      <DataTable
        title="Transaction History"
        data={payments}
        columns={columns}
        searchPlaceholder="Search by transaction ID, customer, method..."
        searchKey={(p) => `${p.transactionId} ${p.customerName} ${p.method} ${p.bookingId}`}
      />

    </div>
  );
};

export default Payments;
