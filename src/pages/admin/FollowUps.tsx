import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, CheckCircle2, AlertCircle, Phone, MessageSquare, X } from 'lucide-react';
import { api } from '../../services/api';
import { authService } from '../../services/auth';
import { FollowUpRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const FollowUps: React.FC = () => {
  const [followUps, setFollowUps] = useState<FollowUpRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Completed'>('Pending');

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState(authService.getCurrentUser()?.name ?? '');

  const loadFollowUps = () => {
    setFollowUps(api.followUps.getAll());
  };

  useEffect(() => {
    loadFollowUps();
    const handleUpdate = () => loadFollowUps();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleToggleComplete = (id: string, currentStatus: string) => {
    api.followUps.update(id, {
      status: currentStatus === 'Completed' ? 'Pending' : 'Completed'
    });
  };

  const handleAddFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !dueDate) return;

    api.followUps.create({
      leadId: `lead-${Date.now()}`,
      customerName,
      phone: '+91 98400 00000',
      type: 'Call',
      dueDate,
      dueTime: '11:00 AM',
      notes,
      assignedTo,
      status: 'Pending',
      priority: 'High'
    });

    setCustomerName('');
    setNotes('');
    setShowAddModal(false);
  };

  const filtered = filterTab === 'All'
    ? followUps
    : followUps.filter(f => f.status === filterTab);

  const columns: Column<FollowUpRecord>[] = [
    {
      key: 'customerName',
      header: 'Customer / Lead',
      sortable: true,
      render: (f) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{f.customerName}</span>
          <span className="text-[11px] text-slate-400">Owner: {f.assignedTo}</span>
        </div>
      )
    },
    {
      key: 'dueDate',
      header: 'Scheduled Due Date',
      sortable: true,
      render: (f) => {
        const isPast = new Date(f.dueDate) < new Date() && f.status === 'Pending';
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Calendar size={13} className={isPast ? 'text-rose-500' : 'text-slate-400'} />
            <span className={isPast ? 'text-rose-600 font-bold' : 'text-slate-700'}>{f.dueDate}</span>
            {isPast && (
              <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.2 rounded font-bold">
                Overdue
              </span>
            )}
          </div>
        );
      }
    },
    {
      key: 'notes',
      header: 'Follow-up Context & Action',
      render: (f) => (
        <span className="text-xs text-slate-600 leading-snug line-clamp-2 max-w-sm">
          {f.notes || 'Routine follow-up call regarding travel proposal.'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (f) => (
        <button
          onClick={() => handleToggleComplete(f.id, f.status)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold cursor-pointer transition-colors ${
            f.status === 'Completed'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 size={13} className={f.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'} />
          <span>{f.status}</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Follow-up Task Scheduler
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ensure no client inquiry is forgotten. Track reminder calls, visa submissions, and flight alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
            {(['All', 'Pending', 'Completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-heading font-bold transition-colors ${
                  filterTab === tab ? 'bg-[#0866D9] text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <DataTable
        title="Scheduled Follow-up Reminders"
        data={filtered}
        columns={columns}
        searchPlaceholder="Search task by customer name or notes..."
        searchKey={(f) => `${f.customerName} ${f.notes} ${f.assignedTo}`}
      />

      {/* Add Follow-Up Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Schedule New Follow-up</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFollowUp} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Customer / Lead Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Anand R. Menon"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Context & Action Required</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Call to verify visa documents and send revised Swiss hotel vouchers."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-heading font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0866D9] text-white rounded-xl text-xs font-heading font-bold"
                >
                  Schedule Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FollowUps;
