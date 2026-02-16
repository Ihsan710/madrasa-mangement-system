"use client";

import { useState } from 'react';
import Link from 'next/link';
import { addFamilyMember } from '../../../../utils/familyApi';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddFamilyMemberPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        relation: '',
        age: '',
        maritalStatus: 'Single',
        spouseName: '',
        bloodGroup: '',
        studying: '',
        working: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addFamilyMember(formData);
            toast.success('Family member added');
            setTimeout(() => router.push('/citizen/family'), 1500);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add member');
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="mb-6">
                <Link href="/citizen/family" className="text-emerald-600 hover:text-emerald-800 flex items-center font-medium">
                    ← Back to Family List
                </Link>
            </div>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Family Member</h1>
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black" />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Relation</label>
                                <select name="relation" required value={formData.relation} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black">
                                    <option value="">Select...</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Son">Son</option>
                                    <option value="Daughter">Daughter</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input type="number" name="age" required value={formData.age} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black">
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

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black">
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                </select>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Studying (Optional)</label>
                                <input type="text" name="studying" value={formData.studying} onChange={handleChange} placeholder="Class / Course" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black" />
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Working (Optional)</label>
                                <input type="text" name="working" value={formData.working} onChange={handleChange} placeholder="Job Title / Company" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-emerald-500 sm:text-sm text-black" />
                            </div>

                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-emerald-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                Save Family Member
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
