"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllFees, updateFeeStatus } from '../../../utils/feeApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

interface FeePayment {
    month: string;
    amount: number;
    paid: boolean;
    date: Date;
    _id: string;
}

interface FeeRecord {
    _id: string;
    citizenId: {
        _id: string;
        name: string;
        membershipId: string;
        mobile: string;
    };
    year: number;
    payments: FeePayment[];
}

export default function AdminFeePage() {
    const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFees = async () => {
            try {
                setLoading(true);
                const data = await getAllFees(year);
                setFeeRecords(data);
            } catch (error) {
                toast.error('Failed to fetch fee records');
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
    }, [year]);

    const handleToggleStatus = async (citizenId: string, monthYear: string, newStatus: boolean) => {
        try {
            await updateFeeStatus({ citizenId, monthYear, paid: newStatus });
            toast.success(`Updated ${monthYear} to ${newStatus ? 'Paid' : 'Unpaid'}`);
            // Optimistic update
            const updatedRecords = feeRecords.map(record => {
                if (record.citizenId._id === citizenId) {
                    const updatedPayments = record.payments.map(p => {
                        if (p.month === monthYear) return { ...p, paid: newStatus, date: newStatus ? new Date() : p.date }; // Keep old date if unpaid for reference? No, clear it in UI logic if needed, but here simple toggle
                        return p;
                    });
                    return { ...record, payments: updatedPayments };
                }
                return record;
            });
            setFeeRecords(updatedRecords);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const filteredRecords = feeRecords.filter(record =>
        record.citizenId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.citizenId.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <ToastContainer />

            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fee Management</h1>
                    <p className="text-gray-500 mt-1">Track monthly collections for {year}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setYear(year - 1)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                    >
                        ← Prev Year
                    </button>
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 flex items-center">
                        {year}
                    </span>
                    <button
                        onClick={() => setYear(year + 1)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                    >
                        Next Year →
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm shadow-sm transition-all"
                    placeholder="Search citizen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                </div>
            ) : (
                <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 w-64 shadow-sm">
                                        Citizen
                                    </th>
                                    {months.map(month => (
                                        <th key={month} scope="col" className="px-3 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                                            {month.slice(0, 3)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {filteredRecords.map((record, index) => (
                                    <motion.tr
                                        key={record._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/30 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10 shadow-sm border-r border-gray-100 group">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs mr-3">
                                                    {record.citizenId.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{record.citizenId.name}</div>
                                                    <div className="text-xs text-gray-500">{record.citizenId.membershipId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {months.map(month => {
                                            const monthKey = `${month}-${year}`;
                                            const payment = record.payments.find(p => p.month === monthKey);
                                            const isPaid = payment?.paid;

                                            return (
                                                <td key={month} className="px-3 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => handleToggleStatus(record.citizenId._id, monthKey, !isPaid)}
                                                        className={`inline-flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${isPaid
                                                            ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600 shadow-sm border border-transparent hover:border-red-200'
                                                            : 'bg-white border-2 border-dashed border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'
                                                            }`}
                                                        title={isPaid ? "Mark as Unpaid" : "Mark as Paid"}
                                                    >
                                                        {isPaid ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block hover:hidden" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </>
                                                        ) : (
                                                            <span className="text-xl font-bold leading-none mb-0.5">+</span>
                                                        )}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </motion.tr>
                                ))}
                                {filteredRecords.length === 0 && (
                                    <tr>
                                        <td colSpan={13} className="px-6 py-16 text-center text-gray-500 bg-gray-50/50">
                                            <div className="mx-auto h-12 w-12 text-gray-300 text-4xl mb-3">🔍</div>
                                            <p className="text-lg font-medium text-gray-900">No records found</p>
                                            <p className="text-sm mt-1">Try adjusting the year or initializing fees for citizens.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Initialize Fees Button (Ideally separate modal, but putting here for simplicity) */}
            <div className="flex justify-end mt-8">
                <Link href="/admin/fees/initialize" className="text-sm text-emerald-600 hover:text-emerald-800 underline">
                    Initialize Fees for New Year?
                </Link>
            </div>
        </div>
    );
}
