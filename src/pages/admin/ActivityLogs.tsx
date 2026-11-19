import React, { useState, useEffect } from 'react';
import { History, Shield, Clock, User, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { AuditLogRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);

  const loadLogs = () => {
    setLogs(api.auditLogs.getAll());
  };

  useEffect(() => {
    loadLogs();
    const handleUpdate = () => loadLogs();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'UPDATE':
        return 'bg-blue-50 text-[#0866D9] border-blue-200';
      case 'DELETE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'LOGIN':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const columns: Column<AuditLogRecord>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (l) => <span className="font-mono text-xs text-slate-500">{l.timestamp}</span>
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (l) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${getActionBadge(l.action)}`}>
          {l.action}
        </span>
      )
    },
    {
      key: 'entity',
      header: 'Target Module',
      render: (l) => <span className="text-xs font-semibold text-slate-800">{l.entity || l.module || 'System'}</span>
    },
    {
      key: 'details',
      header: 'Audit Description',
      render: (l) => <span className="text-xs text-slate-600">{l.details}</span>
    },
    {
      key: 'userName',
      header: 'Actor',
      sortable: true,
      render: (l) => (
        <span className="text-xs font-heading font-bold text-[#071B35]">
          {l.userName}
        </span>
      )
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (l) => <span className="font-mono text-[11px] text-slate-400">{l.ipAddress || '127.0.0.1'}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          System Audit Trail & Security Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Immutable audit record of administrative actions, package creations, bookings, and logins.
        </p>
      </div>

      <DataTable
        title="Administrative Activity Logs"
        data={logs}
        columns={columns}
        searchPlaceholder="Search audit logs by description, user, or module..."
        searchKey={(l) => `${l.details} ${l.userName} ${l.entity || l.module || ''} ${l.action}`}
      />

    </div>
  );
};

export default ActivityLogs;
