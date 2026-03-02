"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={`transition-all duration-300 ${pathname === '/' ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl' : 'bg-emerald-900 border-b border-emerald-800 shadow-lg sticky top-0'} z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 group">
                            <span className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                                <span className="group-hover:rotate-12 transition-transform">🕌</span> <span className={pathname === '/' ? "bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent" : "bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent"}>Izzathul Islam</span>
                            </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-2">
                                <Link href="/" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/') ? (pathname === '/' ? 'bg-white/10 text-emerald-300 shadow-inner border border-white/5' : 'bg-emerald-800 text-white') : (pathname === '/' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white')}`}>Home</Link>
                                <Link href="/about" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/about') ? (pathname === '/' ? 'bg-white/10 text-emerald-300 shadow-inner border border-white/5' : 'bg-emerald-800 text-white') : (pathname === '/' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white')}`}>About Us</Link>
                                <Link href="/madrasa" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/madrasa') ? (pathname === '/' ? 'bg-white/10 text-emerald-300 shadow-inner border border-white/5' : 'bg-emerald-800 text-white') : (pathname === '/' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white')}`}>Madrasa</Link>
                                <Link href="/contact" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/contact') ? (pathname === '/' ? 'bg-white/10 text-emerald-300 shadow-inner border border-white/5' : 'bg-emerald-800 text-white') : (pathname === '/' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white')}`}>Contact</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-4">
                            {user ? (
                                <>
                                    <span className="text-emerald-400 text-sm font-medium mr-2">Hello, {user.name?.split(' ')[0] || 'User'}</span>
                                    {user.role === 'admin' ? (
                                        <Link href="/admin/dashboard" className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${pathname === '/' ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}>Dashboard</Link>
                                    ) : (
                                        <Link href="/citizen/dashboard" className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${pathname === '/' ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}>My Dashboard</Link>
                                    )}
                                    <button onClick={logout} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname === '/' ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-emerald-200 hover:text-white'}`}>Logout</button>
                                </>
                            ) : (
                                <Link href="/login" className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-900 transform hover:-translate-y-0.5 shadow-lg ${pathname === '/' ? 'bg-emerald-400 hover:bg-emerald-300 hover:shadow-emerald-500/25' : 'bg-white hover:bg-emerald-50'}`}>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-emerald-800 inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-800">Home</Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">About Us</Link>
                        <Link href="/madrasa" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">Madrasa</Link>
                        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">Contact</Link>
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <Link href="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">Dashboard</Link>
                                ) : (
                                    <Link href="/citizen/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">My Dashboard</Link>
                                )}
                                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">Logout</button>
                            </>
                        ) : (
                            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
