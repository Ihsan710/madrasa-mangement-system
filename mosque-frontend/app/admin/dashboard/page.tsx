"use client";

import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../utils/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ totalCitizens: 0, totalCollected: 0 });

    const [monthlyData, setMonthlyData] = useState([]);
    const [demographicsData, setDemographicsData] = useState([]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            api.get('/admin/stats')
                .then(res => {
                    setStats(res.data);
                    setMonthlyData(res.data.monthlyRevenue || []);
                    setDemographicsData(res.data.demographics || []);
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    const COLORS = ['#059669', '#3b82f6', '#8b5cf6'];

    if (loading) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 pb-10"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Welcome back, {user?.name} 👋</p>
                </div>
                <div className="hidden sm:block">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                        <span className="w-2 h-2 mr-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        System Active
                    </span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-emerald-100/50 text-emerald-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+5% inc</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalCitizens}</h3>
                        <p className="text-sm font-medium text-gray-400">Total Citizens</p>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-blue-100/50 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Typical</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">₹ {stats.totalCollected.toLocaleString()}</h3>
                        <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                    </div>
                </motion.div>

                {/* Placeholders for future stats */}
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-100/50 text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">--</h3>
                        <p className="text-sm font-medium text-gray-400">Pending Requests</p>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-orange-100/50 text-orange-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">--</h3>
                        <p className="text-sm font-medium text-gray-400">This Month's Activity</p>
                    </div>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trends</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Demographics</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={demographicsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {demographicsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions - Spans 2 cols */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">Shortcuts</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/admin/citizens/add" className="flex flex-col p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all group">
                            <div className="flex items-center mb-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600 mr-3 group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <h4 className="font-bold text-emerald-900 text-lg">Add Citizen</h4>
                            </div>
                            <p className="text-sm text-emerald-700/80 leading-relaxed">Register a new head of family into the madrasa system.</p>
                        </Link>

                        <Link href="/admin/fees" className="flex flex-col p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group">
                            <div className="flex items-center mb-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600 mr-3 group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </div>
                                <h4 className="font-bold text-blue-900 text-lg">Manage Fees</h4>
                            </div>
                            <p className="text-sm text-blue-700/80 leading-relaxed">Update monthly fee records and track payments.</p>
                        </Link>

                        <Link href="/admin/citizens" className="flex items-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all text-gray-500 hover:text-emerald-700 group">
                            <span className="mr-3 p-1 bg-gray-100 rounded group-hover:bg-white transition-colors">📄</span>
                            <span className="font-medium">View All Records</span>
                        </Link>

                        <button className="flex items-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-400 cursor-not-allowed">
                            <span className="mr-3">🔧</span>
                            <span className="font-medium">Settings (Coming Soon)</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity Panel */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900">Recent Updates</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-gray-900 font-medium mb-1">No recent activity</h4>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto">Activities like new registrations and fee payments will appear here.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
