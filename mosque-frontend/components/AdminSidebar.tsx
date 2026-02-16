"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        {
            name: 'Dashboard', path: '/admin/dashboard', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: 'Citizens', path: '/admin/citizens', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            name: 'Fee Management', path: '/admin/fees', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
    ];

    return (
        <div className="flex flex-col w-64 bg-emerald-900 text-white min-h-screen shadow-xl">
            <div className="flex items-center justify-center h-20 shadow-md bg-emerald-950">
                <Link href="/" className="text-2xl font-bold tracking-wider flex items-center gap-2">
                    <span>🕌</span>
                    <span>Admin Panel</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 transform scale-105'
                                : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                            }`}
                    >
                        <span className={`${isActive(item.path) ? 'text-white' : 'text-emerald-300 group-hover:text-white'}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-emerald-800">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-emerald-100 hover:bg-red-500/10 hover:text-red-200 transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300 group-hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
