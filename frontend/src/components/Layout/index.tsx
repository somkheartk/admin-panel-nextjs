'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { LogOut, Users, LayoutDashboard, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
          </div>

          {/* User Info */}
          <div className="p-4 border-b bg-gray-50">
            <p className="font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-primary-600 font-semibold mt-1 uppercase">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            {(user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'manager') && (
              <Link
                href="/users"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <Users size={20} />
                <span>Users</span>
              </Link>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
