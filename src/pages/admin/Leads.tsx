import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List, Phone, Mail, DollarSign, ArrowRight, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { api } from '../../services/api';
import { LeadRecord } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { DataTable, Column } from '../../components/admin/DataTable';

const STAGES = [
  'New',
  'Contacted',
  'Proposal Sent',
  'Negotiating',
  'Won',
  'Lost'
] as const;

export const Leads: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(150000);
  const [assignedTo, setAssignedTo] = useState('Vignesh Kumar');

  const loadLeads = () => {
    setLeads(api.leads.getAll());
  };

  useEffect(() => {
    loadLeads();
    const handleUpdate = () => loadLeads();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleStageChange = (id: string, newStage: any) => {
    api.leads.update(id, { stage: newStage });
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    api.leads.create({
      title: `${name} - ${destination}`,
      customerName: name,
      name,
      phone,
      email,
      destination,
      dealValue: Number(estimatedValue),
      estimatedValue: Number(estimatedValue),
      stage: 'New',
      source: 'Website Enquiry',
      assignedTo,
      expectedCloseDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    });

    setName('');
    setPhone('');
    setEmail('');
    setDestination('');
    setEstimatedValue(150000);
    setShowAddModal(false);
  };

  const tableColumns: Column<LeadRecord>[] = [
    {
      key: 'name',
      header: 'Lead Name',
      sortable: true,
      render: (l) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{l.name || l.customerName}</span>
          <span className="text-[11px] text-slate-400">{l.phone}</span>
        </div>
      )
    },
    {
      key: 'destination',
      header: 'Destination',
      render: (l) => <span className="text-xs font-semibold text-slate-800">{l.destination}</span>
    },
    {
      key: 'estimatedValue',
      header: 'Est. Deal Value',
      sortable: true,
      render: (l) => <span className="font-heading font-bold text-xs text-emerald-700">{formatCurrency(l.estimatedValue || l.dealValue || 0)}</span>
    },
    {
      key: 'stage',
      header: 'Stage',
      render: (l) => (
        <select
          value={l.stage}
          onChange={(e) => handleStageChange(l.id, e.target.value as any)}
          className="text-xs font-heading font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
        >
          {STAGES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      )
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      render: (l) => <span className="text-xs text-slate-600">{l.assignedTo}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Sales CRM Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track deals from initial inquiry to paid booking across the sales lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'kanban' ? 'bg-[#0866D9] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-heading font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'table' ? 'bg-[#0866D9] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <List size={14} />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => (l.stage === stage) || (stage === 'New' && l.stage === 'New Lead'));
            const totalStageValue = stageLeads.reduce((sum, l) => sum + (l.estimatedValue || l.dealValue || 0), 0);

            return (
              <div 
                key={stage}
                className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 flex flex-col min-w-[220px]"
              >
                {/* Column Header */}
                <div className="pb-3 border-b border-slate-200/60 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-[#071B35]">
                      {stage}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center border border-slate-200 shadow-xs">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    {formatCurrency(totalStageValue)}
                  </span>
                </div>

                {/* Cards in this Stage */}
                <div className="space-y-3 flex-1">
                  {stageLeads.map((lead) => {
                    const currentStageIdx = STAGES.indexOf(lead.stage as any);
                    return (
                      <div 
                        key={lead.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <span className="font-heading font-bold text-xs text-[#071B35]">
                            {lead.name || lead.customerName}
                          </span>
                        </div>

                        <span className="text-xs text-blue-800 font-medium bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-2">
                          {lead.destination}
                        </span>

                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-t border-slate-100 pt-2">
                          <span>Value:</span>
                          <span className="text-emerald-700">{formatCurrency(lead.estimatedValue || lead.dealValue || 0)}</span>
                        </div>

                        <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
                          <span>{lead.phone}</span>
                          <span>{lead.assignedTo}</span>
                        </div>

                        {/* Stage Progress Arrows */}
                        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100">
                          {currentStageIdx > 0 ? (
                            <button
                              onClick={() => handleStageChange(lead.id, STAGES[currentStageIdx - 1])}
                              className="p-1 hover:bg-slate-100 rounded text-slate-500 text-[10px] flex items-center gap-0.5"
                              title={`Move back to ${STAGES[currentStageIdx - 1]}`}
                            >
                              <ArrowLeft size={11} /> Prev
                            </button>
                          ) : <div />}

                          {currentStageIdx < STAGES.length - 1 && (
                            <button
                              onClick={() => handleStageChange(lead.id, STAGES[currentStageIdx + 1])}
                              className="p-1 hover:bg-blue-50 text-[#0866D9] rounded font-bold text-[10px] flex items-center gap-0.5 ml-auto"
                              title={`Advance to ${STAGES[currentStageIdx + 1]}`}
                            >
                              Next <ArrowRight size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {stageLeads.length === 0 && (
                    <div className="h-24 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <DataTable
          title="All Pipeline Leads"
          data={leads}
          columns={tableColumns}
          searchPlaceholder="Search leads by customer, destination..."
          searchKey={(l) => `${l.name} ${l.destination} ${l.phone}`}
        />
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Create New Sales Lead</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Lead / Traveler Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Chandran"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98410 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="lead@gmail.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Destination Tour *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Swiss Alps 7D"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Estimated Budget (INR)</label>
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
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
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Leads;
