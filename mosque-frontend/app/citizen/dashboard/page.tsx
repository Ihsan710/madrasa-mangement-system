"use client";

import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CitizenDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'citizen')) {
            router.push('/login');
        }

        // Fetch recent payments for dashboard
        if (user) {
            import('../../../utils/feeApi').then(({ getMyFees }) => {
                getMyFees().then(data => {
                    // Flatten payments from all year records and sort by date desc
                    const allPayments = data.flatMap((record: any) => record.payments.filter((p: any) => p.paid));
                    // Simple sort if date exists, else keep order
                    allPayments.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setPayments(allPayments);
                }).catch(err => console.error(err));
            });
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 shadow-xl text-white p-8 md:p-10">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
                            {user?.profilePhoto ? (
                                <img
                                    src={user.profilePhoto.startsWith('http')
                                        ? user.profilePhoto
                                        : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000'}${user.profilePhoto}`
                                    }
                                    alt={user.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-emerald-700 flex items-center justify-center text-3xl font-bold">
                                    {user?.name?.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm text-emerald-200 text-xs font-medium mb-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                            Active Member
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                        <p className="text-emerald-100/80 text-lg max-w-xl">
                            Access your family records, track monthly contributions, and keep your profile up to date.
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <Link href="/citizen/profile" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-emerald-900 bg-emerald-100 hover:bg-white transition-all shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-1">
                            Review Profile
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Family Card */}
                <Link href="/citizen/family" className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                            <span className="text-2xl">👨‍👩‍👧‍👦</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">My Family</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">View details of all family members registered under your profile.</p>
                        <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:underline">
                            Manage Family <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </div>
                </Link>

                {/* Fees Card */}
                <Link href="/citizen/fees" className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                            <span className="text-2xl">💳</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Fee Status</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">Check your monthly contributions and clear any due payments.</p>
                        <div className="flex items-center text-blue-600 font-medium text-sm group-hover:underline">
                            View Payments <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </div>
                </Link>

                {/* Placeholder / Profile Card */}
                <Link href="/citizen/profile" className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                            <span className="text-2xl">👤</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">My Profile</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">Update your personal information and contact details.</p>
                        <div className="flex items-center text-purple-600 font-medium text-sm group-hover:underline">
                            Edit Profile <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Updates Section - Real Data */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Recent Payment Activity</h3>
                </div>
                <div className="p-6">
                    {payments.length > 0 ? (
                        <div className="space-y-4">
                            {payments.slice(0, 3).map((payment, idx) => (
                                <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4">
                                        ✓
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900">Fee Payment Successful</h4>
                                        <p className="text-sm text-gray-500">
                                            Recieved ₹{payment.amount} for {payment.month}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">
                                        {payment.date ? new Date(payment.date).toLocaleDateString() : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            <div className="inline-block p-4 rounded-full bg-gray-50 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p>No recent payment activity found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
