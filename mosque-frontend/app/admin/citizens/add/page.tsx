"use client";

import { useState } from 'react';
import Link from 'next/link'; // Import Link
import { addCitizen } from '../../../../utils/citizenApi'; // Adjusted path
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCitizenPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        membershipId: '',
        name: '',
        mobile: '',
        password: '',
        address: '',
        bloodGroup: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addCitizen(formData);
            toast.success('Citizen Added Successfully');
            setTimeout(() => {
                router.push('/admin/citizens');
            }, 1500);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add citizen');
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

            <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Add New Citizen</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Membership ID</label>
                            <input type="text" name="membershipId" required value={formData.membershipId} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black" placeholder="e.g., MEM001" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <input type="text" name="mobile" required value={formData.mobile} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black" placeholder="e.g., 9876543210" />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black" placeholder="Enter full name" />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black" placeholder="Set a temporary password" />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea name="address" required value={formData.address} onChange={handleChange} rows={3} className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black" placeholder="Enter residential address" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-shadow text-black">
                                <option value="">Select...</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <Link href="/admin/citizens" className="bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 mr-4">
                            Cancel
                        </Link>
                        <button type="submit" className="bg-emerald-600 border border-transparent rounded-lg shadow-sm py-2 px-6 inline-flex justify-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                            Save Citizen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
