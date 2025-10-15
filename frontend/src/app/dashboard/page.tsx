'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/lib/store';
import { Users, Activity, UserCheck } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    recentActivity: 0,
  });

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Users className="text-primary-600" size={32} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.activeUsers}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck className="text-green-600" size={32} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Recent Activity</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.recentActivity}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="text-blue-600" size={32} />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="text-gray-600">
              Hello {user?.firstName}, you are logged in as{' '}
              <span className="font-semibold text-primary-600">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Role Permissions:</strong>
              </p>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                {user?.role === 'super_admin' && (
                  <>
                    <li>Full system access</li>
                    <li>Manage all users and roles</li>
                    <li>System configuration</li>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <li>Manage users</li>
                    <li>View reports</li>
                    <li>Limited configuration access</li>
                  </>
                )}
                {user?.role === 'manager' && (
                  <>
                    <li>View user list</li>
                    <li>Basic reporting</li>
                  </>
                )}
                {user?.role === 'user' && (
                  <>
                    <li>View own profile</li>
                    <li>Change password</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
