"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const [role, setRole] = useState<'admin' | 'citizen'>('citizen');
    const [identifier, setIdentifier] = useState(''); // Username for admin, MembershipID/Mobile for citizen
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (role === 'admin') {
                response = await api.post('/auth/admin/login', { username: identifier, password });
            } else {
                response = await api.post('/auth/citizen/login', { identifier, password });
            }

            login(response.data.token, response.data);
            toast.success(`Welcome back, ${response.data.name || 'Admin'}!`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-gray-800">
            <ToastContainer />

            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-black opacity-90 z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center z-0"></div>

                <div className="relative z-20 text-white p-12 max-w-xl">
                    <div className="mb-8 animate-fade-in-up">
                        <span className="text-emerald-300 text-sm font-bold tracking-widest uppercase">Welcome to</span>
                        <h1 className="text-5xl font-bold mt-2 mb-4 leading-tight">Izzathul Islam Madrasa Portal</h1>
                        <p className="text-emerald-100 text-lg leading-relaxed">
                            Manage your family records, track monthly fee payments, and stay connected with our community through this dedicated portal.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-12 text-sm text-emerald-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                            </div>
                            <span>Family Management</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                            </div>
                            <span>Secure Fee Payments</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-4xl">🕌</span>
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Or <Link href="/contact" className="font-medium text-emerald-600 hover:text-emerald-500">contact support</Link> if you need help.
                        </p>
                    </div>


                    {/* Role Toggles */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setRole('citizen')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === 'citizen'
                                ? 'bg-white text-emerald-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Citizen Login
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === 'admin'
                                ? 'bg-white text-emerald-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Admin Login
                        </button>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                                    {role === 'admin' ? 'Username' : 'Mobile Number / Membership ID'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="identifier"
                                        name="identifier"
                                        type="text"
                                        required
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors text-black"
                                        placeholder={role === 'admin' ? 'Enter username' : 'Enter mobile or ID'}
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors text-black"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5 shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="absolute bottom-6 text-center text-xs text-gray-400">
                    &copy; 2026 Izzathul Islam Madrasa Portal. All rights reserved.
                </div>
            </div>
        </div>
    );
}
