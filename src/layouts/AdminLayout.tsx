import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/admin/Sidebar';
import { Topbar } from '../components/admin/Topbar';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#142238] font-sans antialiased">
      {/* Admin Collapsible / Static Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Topbar */}
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Admin View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
