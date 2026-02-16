"use client";

import CitizenSidebar from '../../components/CitizenSidebar';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);


    if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 text-emerald-800">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <CitizenSidebar />
            <main className="flex-1 md:ml-20 p-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
