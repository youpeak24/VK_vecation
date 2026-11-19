import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, MessageSquare, Check, UserPlus, Filter, X } from 'lucide-react';
import { api } from '../../services/api';
import { EnquiryRecord, StaffRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [staffList, setStaffList] = useState<StaffRecord[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const loadData = () => {
    setEnquiries(api.enquiries.getAll());
    setStaffList(api.staff.getAll());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleStatusChange = (id: string, status: EnquiryRecord['status']) => {
    api.enquiries.update(id, { status });
  };

  const handleAssignStaff = (id: string, staffName: string) => {
    api.enquiries.update(id, { assignedTo: staffName });
  };

  const filteredEnquiries = statusFilter === 'All' 
    ? enquiries 
    : enquiries.filter(e => e.status === statusFilter);

  const columns: Column<EnquiryRecord>[] = [
    {
      key: 'name',
      header: 'Traveler / Lead',
      sortable: true,
      render: (e) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{e.name || e.customerName}</span>
          <span className="text-[11px] text-slate-400">{e.email}</span>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Contact Phone',
      render: (e) => (
        <span className="text-xs text-slate-700 flex items-center gap-1">
          <Phone size={11} className="text-slate-400" />
          {e.phone}
        </span>
      )
    },
    {
      key: 'packageTitle',
      header: 'Package / Tour',
      sortable: true,
      render: (e) => (
        <div className="max-w-[200px]">
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {e.packageTitle || e.destination || 'Custom Tour Inquiry'}
          </span>
          <span className="text-[11px] text-slate-400 block">
            {e.travelersCount || e.travelers || 2} Pax • {e.tentativeDate || e.travelDate || 'Flexible Dates'}
          </span>
        </div>
      )
    },
    {
      key: 'assignedTo',
      header: 'Assigned Executive',
      render: (e) => (
        <select
          value={e.assignedTo || ''}
          onChange={(ev) => handleAssignStaff(e.id, ev.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0866D9]"
        >
          <option value="">Unassigned</option>
          {staffList.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      )
    },
    {
      key: 'status',
      header: 'Pipeline Status',
      sortable: true,
      render: (e) => (
        <select
          value={e.status}
          onChange={(ev) => handleStatusChange(e.id, ev.target.value as any)}
          className={`text-xs font-heading font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
            e.status === 'New' ? 'bg-amber-50 text-amber-700 border-amber-300' :
            e.status === 'Quotation Sent' ? 'bg-blue-50 text-[#0866D9] border-blue-300' :
            e.status === 'Converted' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
            e.status === 'Closed' ? 'bg-slate-100 text-slate-600 border-slate-200' :
            'bg-purple-50 text-purple-700 border-purple-300'
          }`}
        >
          <option value="New">New</option>
          <option value="In Review">In Review</option>
          <option value="Contacted">Contacted</option>
          <option value="Quotation Sent">Quotation Sent</option>
          <option value="Converted">Converted (Won)</option>
          <option value="Closed">Closed</option>
        </select>
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: (e) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedEnquiry(e)}
            className="px-2.5 py-1 text-xs font-semibold text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          >
            Details
          </button>
          <a
            href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(e.name || e.customerName || 'Traveler')},%20this%20is%20VK%20Vacations%20regarding%20your%20inquiry%20for%20${encodeURIComponent(e.packageTitle || e.destination || 'Tour')}.`}
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Tour Enquiry Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Incoming holiday inquiries from web forms, floating contact buttons, and package details.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'New', 'In Review', 'Contacted', 'Quotation Sent', 'Converted'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-heading font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0866D9] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        title="Live Public Website Inquiries"
        description="Assign staff, update statuses, and log client requirements"
        data={filteredEnquiries}
        columns={columns}
        searchPlaceholder="Search inquiry by traveler name, package, or phone..."
        searchKey={(e) => `${e.name || e.customerName} ${e.phone} ${e.packageTitle || e.destination} ${e.assignedTo}`}
      />

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-heading font-bold text-slate-400">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#071B35]">
                  {selectedEnquiry.name || selectedEnquiry.customerName}
                </h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block">{selectedEnquiry.phone}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block truncate">{selectedEnquiry.email}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Tentative Travel Date</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block">{selectedEnquiry.tentativeDate || selectedEnquiry.travelDate || 'Flexible'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Party Size</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block">{selectedEnquiry.travelersCount || selectedEnquiry.travelers || 2} Passengers</span>
                </div>
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                <span className="text-xs font-heading font-bold text-blue-900 block mb-1">
                  Inquiry Details / Specific Itinerary:
                </span>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  {selectedEnquiry.packageTitle || selectedEnquiry.destination}
                </p>
                {selectedEnquiry.notes && (
                  <p className="text-slate-600 mt-2 text-[11px]">
                    "{selectedEnquiry.notes}"
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-heading font-bold transition-colors"
              >
                Open WhatsApp
              </a>
              <button
                onClick={() => setSelectedEnquiry(null)}
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

export default Enquiries;
