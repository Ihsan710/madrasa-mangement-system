"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMyFees } from '../../../utils/feeApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FeesPage() {
    const [fees, setFees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentYear] = useState(2026); // Ideally fetch or set dynamic

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const data = await getMyFees();
                setFees(data);
            } catch (error) {
                console.error("Failed to fetch fees", error);
                // toast.error("Could not load fee status");
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
    }, []);

    // Process fees to get month-wise status for the current year
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const feeRecordForYear = fees.find(f => f.year === currentYear);

    // Default amount if not set (or we could fetch it from a setting)
    const monthlyAmount = feeRecordForYear?.payments?.[0]?.amount || 150;

    const monthStatus = months.map(monthName => {
        const monthKey = `${monthName}-${currentYear}`;
        const payment = feeRecordForYear?.payments?.find((p: any) => p.month === monthKey);

        if (payment) {
            return {
                name: monthName,
                status: payment.paid ? 'paid' : 'pending',
                amount: payment.amount,
                date: payment.date ? new Date(payment.date).toISOString().split('T')[0] : null
            };
        }
        return {
            name: monthName,
            status: 'pending',
            amount: 0, // No record initialized yet
            date: null,
            notInitialized: true
        };
    });

    const paidCount = monthStatus.filter(m => m.status === 'paid').length;
    const progress = (paidCount / 12) * 100;
    const totalDue = feeRecordForYear ? feeRecordForYear.payments.reduce((acc: number, curr: any) => acc + curr.amount, 0) : 0;
    const totalPaid = monthStatus.filter(m => m.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);


    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <ToastContainer />
            {/* Header & Progress */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Monthly Fees</h1>
                            <p className="text-gray-500 mt-1">Track your contributions for {currentYear}</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-sm text-gray-500 font-medium uppercase tracking-wider">Total Paid</span>
                            <span className="text-4xl font-extrabold text-emerald-600">₹{totalPaid}</span>
                            <span className="text-gray-400 text-lg"> / ₹{totalDue || '0'}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-100">
                                    {Math.round(progress)}% Completed
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100 border border-gray-200">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-teal-400"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Months Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {monthStatus.map((month, index) => (
                    <motion.div
                        key={month.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative rounded-2xl p-6 border transition-all duration-300 ${month.status === 'paid'
                            ? 'bg-white border-emerald-100 shadow-sm hover:shadow-emerald-200/50 hover:border-emerald-300'
                            : 'bg-gray-50 border-gray-100 opacity-70 hover:opacity-100 hover:bg-white hover:shadow-md'
                            }`}
                    >
                        {month.status === 'paid' && (
                            <div className="absolute top-4 right-4">
                                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <h3 className={`text-lg font-bold mb-1 ${month.status === 'paid' ? 'text-gray-900' : 'text-gray-500'}`}>
                            {month.name}
                        </h3>
                        {month.notInitialized ? (
                            <p className="text-sm text-gray-400 mb-4 h-8 flex items-center">Not Set</p>
                        ) : (
                            <p className={`text-2xl font-bold mb-4 ${month.status === 'paid' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                ₹{month.amount}
                            </p>
                        )}


                        <div className={`mt-auto pt-4 border-t ${month.status === 'paid' ? 'border-emerald-50' : 'border-gray-200'}`}>
                            {month.status === 'paid' ? (
                                <div className="flex items-center text-sm text-emerald-700 font-medium">
                                    <span>Paid on {month.date}</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded">Unpaid</span>
                                    {!month.notInitialized && (
                                        <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => toast.info('Please contact admin to pay')}>
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {!feeRecordForYear && (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                    <p>No fee records found for {currentYear}. Please contact admin.</p>
                </div>
            )}
        </div>
    );
}
