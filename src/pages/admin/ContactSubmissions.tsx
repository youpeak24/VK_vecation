import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, MapPin, X } from 'lucide-react';
import { api } from '../../services/api';
import { ContactSubmission } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const ContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);

  const loadSubmissions = () => {
    setSubmissions(api.contactSubmissions.getAll());
  };

  useEffect(() => {
    loadSubmissions();
    const handleUpdate = () => loadSubmissions();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleUpdateStatus = (id: string, status: 'New' | 'Read' | 'Replied') => {
    api.contactSubmissions.updateStatus(id, status);
    if (selectedSub && selectedSub.id === id) {
      setSelectedSub({ ...selectedSub, status });
    }
  };

  const columns: Column<ContactSubmission>[] = [
    {
      key: 'name',
      header: 'Sender',
      sortable: true,
      render: (s) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{s.name}</span>
          <span className="text-[11px] text-slate-400">{s.email}</span>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (s) => (
        <span className="text-xs text-slate-700 flex items-center gap-1">
          <Phone size={11} className="text-slate-400" />
          {s.phone}
        </span>
      )
    },
    {
      key: 'destination',
      header: 'Desired Holiday',
      render: (s) => (
        <span className="text-xs text-slate-800 font-medium">
          {s.destination || s.subject || 'General Travel Query'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s) => (
        <span className={`text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full border ${
          s.status === 'New' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          s.status === 'Replied' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          'bg-slate-100 text-slate-700 border-slate-200'
        }`}>
          {s.status}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Received On',
      sortable: true,
      render: (s) => <span className="text-xs text-slate-500">{s.submittedAt || s.createdAt || '2026-03-20'}</span>
    },
    {
      key: 'actions',
      header: 'Action',
      render: (s) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedSub(s);
              if (s.status === 'New') {
                handleUpdateStatus(s.id, 'Read');
              }
            }}
            className="px-2.5 py-1 text-xs font-semibold text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          >
            Read Message
          </button>
          <a
            href={`https://wa.me/${s.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-[11px] font-heading font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Contact Form Submissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct messages and holiday inquiries submitted from the public website contact page.
        </p>
      </div>

      <DataTable
        title="Inbound Messages"
        description="Filter and reply to potential travelers inquiring via contact form"
        data={submissions}
        columns={columns}
        searchPlaceholder="Search message by sender or phone..."
        searchKey={(s) => `${s.name} ${s.phone} ${s.email} ${s.message}`}
      />

      {/* Message Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-heading font-bold text-slate-400">
                  Message Details
                </span>
                <h3 className="font-heading font-bold text-lg text-[#071B35]">
                  {selectedSub.name}
                </h3>
              </div>
              <button onClick={() => setSelectedSub(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <span className="font-heading font-bold text-slate-800 mt-0.5 block">{selectedSub.phone}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="font-heading font-bold text-slate-800 mt-0.5 block truncate">{selectedSub.email}</span>
                </div>
              </div>

              {(selectedSub.destination || selectedSub.subject) && (
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <span className="text-[11px] font-heading font-bold text-blue-900 block">
                    Interested Destination / Topic:
                  </span>
                  <span className="text-slate-700 font-semibold">{selectedSub.destination || selectedSub.subject}</span>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[11px] font-heading font-bold text-slate-500 block mb-1">
                  Message / Requirements:
                </span>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedSub.message}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-slate-500">Status:</span>
                <button
                  onClick={() => handleUpdateStatus(selectedSub.id, 'Replied')}
                  className={`px-3 py-1 rounded-lg font-heading font-bold text-xs ${
                    selectedSub.status === 'Replied'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  Mark Replied
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <a
                href={`https://wa.me/${selectedSub.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-heading font-bold transition-colors"
              >
                Reply on WhatsApp
              </a>
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-heading font-bold transition-colors"
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

export default ContactSubmissions;
