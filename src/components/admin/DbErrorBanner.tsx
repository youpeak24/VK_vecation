import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { DB_ERROR_EVENT } from '../../lib/firebase/events';

interface DbError {
  id: number;
  operation: string;
  message: string;
}

/** Surfaces failed background saves (permission denied, offline, ...) instead of failing silently. */
export const DbErrorBanner: React.FC = () => {
  const [errors, setErrors] = useState<DbError[]>([]);

  useEffect(() => {
    let nextId = 0;
    const onError = (event: Event) => {
      const { operation, message } = (event as CustomEvent<{ operation: string; message: string }>).detail;
      const id = ++nextId;
      setErrors((prev) => [...prev.slice(-2), { id, operation, message }]);
      window.setTimeout(() => setErrors((prev) => prev.filter((e) => e.id !== id)), 8000);
    };
    window.addEventListener(DB_ERROR_EVENT, onError);
    return () => window.removeEventListener(DB_ERROR_EVENT, onError);
  }, []);

  if (errors.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] space-y-2 w-80 max-w-[calc(100vw-2rem)]" role="alert">
      {errors.map((error) => (
        <div
          key={error.id}
          className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-white p-3 shadow-xl text-xs"
        >
          <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-[#071B35]">Change not saved</p>
            <p className="text-slate-600 mt-0.5">{error.message}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{error.operation}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrors((prev) => prev.filter((e) => e.id !== error.id))}
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DbErrorBanner;
