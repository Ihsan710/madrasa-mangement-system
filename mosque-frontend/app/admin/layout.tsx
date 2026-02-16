"use client";

import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, loading, router]);


    if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 text-emerald-800">Loading...</div>;
    if (!user || user.role !== 'admin') return null;

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar - Fixed on mobile (hidden for now as per prev implementation logic), Sticky/Static on Desktop */}
            <div className="hidden md:block w-64 bg-emerald-900 flex-shrink-0">
                <div className="fixed inset-y-0 left-0 w-64">
                    <AdminSidebar />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 min-h-screen transition-all">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
