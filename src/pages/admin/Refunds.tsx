import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { api } from '../../services/api';
import { RefundRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const Refunds: React.FC = () => {
  const [refunds, setRefunds] = useState<RefundRecord[]>([]);

  const loadRefunds = () => {
    setRefunds(api.refunds.getAll());
  };

  useEffect(() => {
    loadRefunds();
    const handleUpdate = () => loadRefunds();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleStatusChange = (id: string, status: RefundRecord['status']) => {
    api.refunds.update(id, { status });
  };

  const columns: Column<RefundRecord>[] = [
    {
      key: 'id',
      header: 'Refund ID & Booking',
      sortable: true,
      render: (r) => (
        <div>
          <span className="font-mono text-xs font-bold text-[#0866D9] block">{r.refundRef || r.id}</span>
          <span className="text-[11px] text-slate-400">Ref: {r.bookingRef || r.bookingId || 'BKG-01'}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Traveler Name',
      sortable: true,
      render: (r) => <span className="font-heading font-bold text-xs text-[#071B35]">{r.customerName}</span>
    },
    {
      key: 'amount',
      header: 'Refund Amount',
      sortable: true,
      render: (r) => (
        <span className="font-heading font-bold text-xs text-rose-600">
          {formatCurrency(r.refundAmount || r.requestedAmount || r.amount || 0)}
        </span>
      )
    },
    {
      key: 'reason',
      header: 'Reason for Cancellation / Refund',
      render: (r) => <span className="text-xs text-slate-600">{r.reason}</span>
    },
    {
      key: 'status',
      header: 'Workflow Stage',
      sortable: true,
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => handleStatusChange(r.id, e.target.value as any)}
          className={`text-xs font-heading font-bold rounded-lg px-2 py-1 border ${
            r.status === 'Processed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            r.status === 'Approved' ? 'bg-blue-50 text-[#0866D9] border-blue-200' :
            r.status === 'Requested' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          <option value="Requested">Requested</option>
          <option value="Approved">Approved</option>
          <option value="Processed">Processed (Settled)</option>
          <option value="Rejected">Rejected</option>
        </select>
      )
    },
    {
      key: 'createdAt',
      header: 'Requested On',
      sortable: true,
      render: (r) => <span className="text-xs text-slate-500">{r.requestedDate || r.createdAt || '2026-03-20'}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Refund Requests & Cancellations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, approve, and settle guest cancellation requests per the official VK Vacations Refund Policy.
        </p>
      </div>

      <DataTable
        title="Refund Requests Ledger"
        data={refunds}
        columns={columns}
        searchPlaceholder="Search refund by customer, ID, reason..."
        searchKey={(r) => `${r.id} ${r.customerName} ${r.reason}`}
      />

    </div>
  );
};

export default Refunds;
