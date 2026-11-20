import React, { useState, useEffect } from 'react';
import { Plus, UserCog, Mail, Phone, ShieldCheck, X } from 'lucide-react';
import { api } from '../../services/api';
import { DEPARTMENTS, DEPARTMENT_ROLES, type StaffRole } from '../../data/staffStructure';
import { StaffRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const Staff: React.FC = () => {
  const [staff, setStaff] = useState<StaffRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [role, setRole] = useState<StaffRole>(DEPARTMENT_ROLES[DEPARTMENTS[0]][0]);

  // Role always belongs to the chosen department.
  const rolesForDepartment = DEPARTMENT_ROLES[department] ?? [];
  const handleDepartmentChange = (next: string) => {
    setDepartment(next);
    setRole(DEPARTMENT_ROLES[next][0]);
  };

  const loadStaff = () => {
    setStaff(api.staff.getAll());
  };

  useEffect(() => {
    loadStaff();
    const handleUpdate = () => loadStaff();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleToggleStatus = (id: string, current: 'Active' | 'Inactive') => {
    api.staff.update(id, {
      status: current === 'Active' ? 'Inactive' : 'Active'
    });
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    api.staff.create({
      name,
      email,
      phone,
      role,
      department,
      status: 'Active'
    });

    setName('');
    setEmail('');
    setPhone('');
    handleDepartmentChange(DEPARTMENTS[0]);
    setShowAddModal(false);
  };

  const columns: Column<StaffRecord>[] = [
    {
      key: 'name',
      header: 'Staff Member',
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0866D9] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
            {s.name.charAt(0)}
          </div>
          <div>
            <span className="font-heading font-bold text-xs text-[#071B35] block">{s.name}</span>
            <span className="text-[11px] text-slate-400">{s.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Assigned Role',
      sortable: true,
      render: (s) => (
        <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
          {s.role}
        </span>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (s) => <span className="text-xs text-slate-600">{s.department}</span>
    },
    {
      key: 'phone',
      header: 'Phone Contact',
      render: (s) => <span className="text-xs text-slate-600">{s.phone}</span>
    },
    {
      key: 'joinedDate',
      header: 'Joined Date',
      sortable: true,
      render: (s) => <span className="text-xs text-slate-400">{s.joinedDate}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s) => (
        <button
          onClick={() => handleToggleStatus(s.id, s.status)}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold border cursor-pointer ${
            s.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {s.status}
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
            Staff & Employee Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage tour managers, ticketing executives, sales agents, and operational staff permissions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Employee</span>
        </button>
      </div>

      <DataTable
        title="Active Team Roster"
        data={staff}
        columns={columns}
        searchPlaceholder="Search staff by name or role..."
        searchKey={(s) => `${s.name} ${s.email} ${s.role} ${s.department}`}
      />

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Add Employee Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@vkvacations.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98400 00000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as StaffRole)}
                    required
                    disabled={rolesForDepartment.length === 1}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-600"
                  >
                    {rolesForDepartment.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-heading font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0866D9] text-white rounded-xl font-heading font-bold"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Staff;
