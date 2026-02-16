"use client";

import Navbar from '../../components/Navbar';

export default function MadrasaPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">Education</h2>
                        <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Our Madrasa Services
                        </h1>
                    </div>

                    {/* Classes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Primary Level</h3>
                                <p className="text-emerald-600 text-sm font-semibold mb-4">Ages 5-10</p>
                                <p className="text-gray-600 mb-6">Foundational learning focusing on reading the Quran with Tajweed, basic Duas, and Islamic stories.</p>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-center">✅ Quran Reading (Qaida)</li>
                                    <li className="flex items-center">✅ Basic Islamic Beliefs</li>
                                    <li className="flex items-center">✅ Daily Adhkar</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg border-2 border-emerald-500 overflow-hidden transform md:-translate-y-4 hover:shadow-xl transition-all">
                            <div className="bg-emerald-600 text-white text-xs font-bold uppercase tracking-wide py-1 text-center">Most Popular</div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Secondary Level</h3>
                                <p className="text-emerald-600 text-sm font-semibold mb-4">Ages 11-15</p>
                                <p className="text-gray-600 mb-6">Advanced Quranic studies, Hifz (Memorization) basics, Seerah of the Prophet (PBUH), and Fiqh.</p>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-center">✅ Quran Memorization</li>
                                    <li className="flex items-center">✅ Seerah & Hadith</li>
                                    <li className="flex items-center">✅ Jurisprudence (Fiqh)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Level</h3>
                                <p className="text-emerald-600 text-sm font-semibold mb-4">Ages 16+</p>
                                <p className="text-gray-600 mb-6">Deep dive into Islamic theology, Tafseer, advanced Arabic grammar, and comprehensive ethical training.</p>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-center">✅ Tafseer Studies</li>
                                    <li className="flex items-center">✅ Advanced Arabic</li>
                                    <li className="flex items-center">✅ Ethical Grooming</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-emerald-900 rounded-2xl p-10 md:p-16 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Typical Class Schedule</h2>
                        <div className="flex flex-col md:flex-row justify-center gap-8 text-left max-w-4xl mx-auto">
                            <div className="bg-emerald-800 p-6 rounded-lg flex-1">
                                <h3 className="text-xl font-bold mb-2 text-emerald-100">Morning Shift</h3>
                                <p className="text-3xl font-bold mb-1">06:00 AM</p>
                                <p className="text-emerald-200">- 08:00 AM</p>
                            </div>
                            <div className="bg-emerald-800 p-6 rounded-lg flex-1">
                                <h3 className="text-xl font-bold mb-2 text-emerald-100">Evening Shift</h3>
                                <p className="text-3xl font-bold mb-1">04:30 PM</p>
                                <p className="text-emerald-200">- 06:30 PM</p>
                            </div>
                        </div>
                        <p className="mt-8 text-emerald-200 max-w-2xl mx-auto">
                            Classes are held from Monday to Saturday. Sunday is a holiday. Special classes for adults are arranged on weekends.
                        </p>
                    </div>

                </div>
            </div>
            {/* Footer */}
            <footer className="bg-gray-900 mt-auto">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-gray-500">
                            &copy; 2026 Izzathul Islam Madrasa. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
