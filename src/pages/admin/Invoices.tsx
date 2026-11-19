import React, { useState, useEffect } from 'react';
import { FileText, Eye, Printer, Download, CheckCircle2, Clock, X } from 'lucide-react';
import { api } from '../../services/api';
import { InvoiceRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';
import { COMPANY } from '../../data/company';

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);

  const loadInvoices = () => {
    setInvoices(api.invoices.getAll());
  };

  useEffect(() => {
    loadInvoices();
    const handleUpdate = () => loadInvoices();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const columns: Column<InvoiceRecord>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice No & Customer',
      sortable: true,
      render: (inv) => (
        <div>
          <span className="font-mono text-xs font-bold text-[#0866D9] block">{inv.invoiceNumber}</span>
          <span className="font-heading font-bold text-xs text-[#071B35] mt-0.5 block">{inv.customerName}</span>
        </div>
      )
    },
    {
      key: 'issueDate',
      header: 'Issue / Due Date',
      sortable: true,
      render: (inv) => (
        <span className="text-xs text-slate-600 block">
          Issued: {inv.issueDate} <br />
          <span className="text-[11px] text-slate-400">Due: {inv.dueDate}</span>
        </span>
      )
    },
    {
      key: 'subtotal',
      header: 'Subtotal & Tax',
      render: (inv) => (
        <span className="text-xs text-slate-600 block">
          Subtotal: {formatCurrency(inv.subtotal)} <br />
          <span className="text-[11px] text-slate-400">GST (5%): {formatCurrency(inv.taxAmount)}</span>
        </span>
      )
    },
    {
      key: 'totalAmount',
      header: 'Total Invoice (INR)',
      sortable: true,
      render: (inv) => (
        <span className="font-heading font-bold text-xs text-[#071B35]">
          {formatCurrency(inv.totalAmount)}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Payment Status',
      sortable: true,
      render: (inv) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${
          inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          inv.status === 'Sent' ? 'bg-blue-50 text-[#0866D9] border-blue-200' :
          'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {inv.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: (inv) => (
        <button
          onClick={() => setSelectedInvoice(inv)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-heading font-bold text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
        >
          <Eye size={13} />
          <span>View</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Tax Invoices & Billing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          GST compliant travel invoices with HSN/SAC codes, subtotal calculations, and receipt status.
        </p>
      </div>

      <DataTable
        title="Tax Invoice Directory"
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoice number or customer name..."
        searchKey={(inv) => `${inv.invoiceNumber} ${inv.customerName}`}
      />

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-0.5 shadow-sm border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  <img 
                    src="/android-chrome-192x192.png" 
                    alt="VK Vacations Invoice" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <span className="font-heading font-black text-xl text-[#071B35] block">
                    VK VACATIONS
                  </span>
                  <span className="text-xs text-slate-400">GSTIN: 33AAECV9204P1Z3 • Tax Invoice</span>
                </div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="flex justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Billed To:</span>
                  <span className="font-heading font-bold text-sm text-[#071B35]">{selectedInvoice.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Invoice Number:</span>
                  <span className="font-mono font-bold text-[#0866D9] text-sm">{selectedInvoice.invoiceNumber}</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">Date: {selectedInvoice.issueDate}</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden mt-4">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-[11px] font-heading font-bold text-slate-600 uppercase">
                    <tr>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3">Tour Package Services & Guided Sightseeing (SAC 998553)</td>
                      <td className="p-3 text-right font-bold">{formatCurrency(selectedInvoice.subtotal)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-500">Integrated GST @ 5%</td>
                      <td className="p-3 text-right text-slate-600">{formatCurrency(selectedInvoice.taxAmount)}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-3 text-slate-900">Total Invoice Amount (INR)</td>
                      <td className="p-3 text-right text-emerald-700 text-sm">{formatCurrency(selectedInvoice.totalAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-heading font-bold flex items-center gap-1.5"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-heading font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Invoices;
