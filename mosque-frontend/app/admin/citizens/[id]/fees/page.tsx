"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link
import { getFees, initializeFees, updateFeeStatus } from '../../../../../utils/feeApi';
import { getCitizenById } from '../../../../../utils/citizenApi';
import { useParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageFeesPage() {
    const params = useParams();
    const id = params.id as string;

    const [citizen, setCitizen] = useState<any>(null);
    const [fees, setFees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [amount, setAmount] = useState(100);

    const fetchData = async () => {
        try {
            // Need to implement getCitizenById in utils/citizenApi.ts first
            // For now, let's assume it exists or fetch from list if passed as state (not possible with direct link)
            // We will implement getCitizenById properly.
            // const citizenData = await getCitizenById(id); 
            // setCitizen(citizenData); 

            const feesData = await getFees(id);
            setFees(feesData);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleInitialize = async () => {
        try {
            await initializeFees({ citizenId: id, year, monthlyAmount: amount });
            toast.success('Fees initialized for the year');
            fetchData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to initialize fees');
        }
    };

    const handlePay = async (monthYear: string, status: boolean) => {
        try {
            await updateFeeStatus({ citizenId: id, monthYear, paid: status });
            toast.success(status ? 'Payment recorded' : 'Payment reverted');
            fetchData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update payment status');
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="mb-6">
                <Link href="/admin/citizens" className="text-emerald-600 hover:text-emerald-800 flex items-center font-medium">
                    ← Back to Citizens
                </Link>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Monthly Fees</h1>

            {/* Initialize Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-emerald-800">Initialize Fees for {year}</h2>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full md:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-black" />
                    </div>
                    <div className="w-full md:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-black" />
                    </div>
                    <button onClick={handleInitialize} className="w-full md:w-auto bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">Set Fees</button>
                </div>
            </div>

            {/* Fees List */}
            {loading ? <p className="text-gray-500">Loading fee records...</p> : (
                <div className="space-y-6">
                    {fees.map((feeYear) => (
                        <div key={feeYear._id} className="bg-white shadow-sm overflow-hidden sm:rounded-xl border border-gray-100">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">Year: {feeYear.year}</h3>
                                <div className="text-sm font-medium text-gray-500">
                                    {feeYear.payments.filter((p: any) => p.paid).length} of 12 Paid
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {feeYear.payments.map((payment: any) => (
                                    <div key={payment._id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full mr-4 ${payment.paid ? 'bg-green-500 shadow-sm shadow-green-200' : 'bg-red-500 shadow-sm shadow-red-200'}`}></div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{payment.month}</p>
                                                <p className="text-xs text-gray-500">₹{payment.amount}</p>
                                            </div>
                                        </div>
                                        {!payment.paid ? (
                                            <button onClick={() => handlePay(payment.month, true)} className="text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded text-xs font-medium transition-colors">
                                                Mark as Paid
                                            </button>
                                        ) : (
                                            <button onClick={() => handlePay(payment.month, false)} className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold border border-green-200 hover:bg-red-100 hover:text-red-800 hover:border-red-200 transition-colors cursor-pointer" title="Click to revert">
                                                Paid ✓
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {fees.length === 0 && (
                        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No fee records found. Initialize fees above to get started.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
