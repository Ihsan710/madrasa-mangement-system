"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function CitizenSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        {
            name: 'Dashboard', path: '/citizen/dashboard', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: 'My Family', path: '/citizen/family', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: 'Monthly Fees', path: '/citizen/fees', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            name: 'My Profile', path: '/citizen/profile', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
    ];

    return (
        <div className="w-20 bg-emerald-900 flex flex-col items-center py-8 h-screen shadow-2xl fixed inset-y-0 left-0 z-50 transition-all duration-300">
            <Link href="/" className="mb-10 p-3 bg-emerald-800 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
                <span className="text-2xl">🕌</span>
            </Link>

            <nav className="flex-1 space-y-4 w-full px-2">
                {navItems.map((item) => (
                    <div key={item.path} className="relative group flex justify-center">
                        <Link
                            href={item.path}
                            className={`p-3 rounded-xl transition-all duration-300 relative ${isActive(item.path)
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 scale-110'
                                    : 'text-emerald-300 hover:bg-emerald-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="active-nav-dot"
                                    className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"
                                />
                            )}
                        </Link>

                        {/* Tooltip */}
                        <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                            {item.name}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-r-gray-900"></div>
                        </div>
                    </div>
                ))}
            </nav>

            <div className="mt-auto mb-4 relative group w-full flex justify-center">
                <button
                    onClick={logout}
                    className="p-3 text-emerald-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                    Logout
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-r-gray-900"></div>
                </div>
            </div>
        </div>
    );
}
