import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export const Roles: React.FC = () => {
  const roles = [
    {
      name: 'Super Admin',
      description: 'Full unconstrained access to all financial, operational, and system configuration modules.',
      usersCount: 2,
      permissions: {
        viewBookings: true,
        createPackages: true,
        accessFinance: true,
        manageStaff: true,
        manageCMS: true,
        deleteRecords: true
      }
    },
    {
      name: 'Tour Manager',
      description: 'Oversees itinerary operations, guide coordination, customer manifests, and departures.',
      usersCount: 3,
      permissions: {
        viewBookings: true,
        createPackages: true,
        accessFinance: false,
        manageStaff: false,
        manageCMS: true,
        deleteRecords: false
      }
    },
    {
      name: 'Sales Executive',
      description: 'Handles incoming leads, client follow-ups, quotation generation, and customer CRM.',
      usersCount: 5,
      permissions: {
        viewBookings: true,
        createPackages: false,
        accessFinance: false,
        manageStaff: false,
        manageCMS: false,
        deleteRecords: false
      }
    },
    {
      name: 'Accountant',
      description: 'Handles payment reconciliation, GST invoices, vendor payouts, and refund processing.',
      usersCount: 2,
      permissions: {
        viewBookings: true,
        createPackages: false,
        accessFinance: true,
        manageStaff: false,
        manageCMS: false,
        deleteRecords: false
      }
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Roles & Permissions Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Define access control policies and operational boundaries across VK Vacations departments.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-heading font-bold text-base text-[#071B35]">
            Granular Permission Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Role Title & Scope</th>
                <th className="py-3.5 px-4 text-center">View Bookings</th>
                <th className="py-3.5 px-4 text-center">Package CRUD</th>
                <th className="py-3.5 px-4 text-center">Financials</th>
                <th className="py-3.5 px-4 text-center">Website CMS</th>
                <th className="py-3.5 px-4 text-center">Staff & Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((r) => (
                <tr key={r.name} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 max-w-xs">
                    <span className="font-heading font-bold text-xs text-[#071B35] block">{r.name}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block leading-relaxed">{r.description}</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    {r.permissions.viewBookings ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {r.permissions.createPackages ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {r.permissions.accessFinance ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {r.permissions.manageCMS ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {r.permissions.manageStaff ? (
                      <Check size={16} className="text-emerald-600 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Roles;
