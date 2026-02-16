"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFamilyMembers, deleteFamilyMember, FamilyMember } from '../../../utils/familyApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function FamilyPage() {
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

    const fetchMembers = async () => {
        try {
            const data = await getFamilyMembers();
            setMembers(data);
        } catch (error) {
            toast.error('Failed to fetch family members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this family member?')) {
            try {
                await deleteFamilyMember(id);
                setMembers(members.filter(m => m._id !== id));
                toast.success('Member removed');
                setSelectedMember(null); // Close panel if open
            } catch (error) {
                toast.error('Failed to remove member');
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 pb-20">
            <ToastContainer />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Family</h1>
                    <p className="text-gray-500 mt-1">Manage your family records</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {members.map((member, index) => (
                            <motion.div
                                key={member._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedMember(member)}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 font-bold text-2xl shadow-inner border border-white">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{member.name}</h3>
                                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 mt-1">
                                            {member.relation}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between text-sm text-gray-500 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-gray-100 p-1.5 rounded-full">🎂</span>
                                        {member.age} yrs
                                    </div>
                                    {member.bloodGroup && (
                                        <div className="flex items-center gap-2">
                                            <span className="bg-red-50 p-1.5 rounded-full text-red-500">🩸</span>
                                            {member.bloodGroup}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {members.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4">👨‍👩‍👧‍👦</div>
                            <h3 className="text-xl font-bold text-gray-900">No family members yet</h3>
                            <p className="text-gray-500 mt-2 max-w-sm">Add your family members to start tracking their records and fee payments.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Action Button */}
            <Link
                href="/citizen/family/add"
                className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95 z-40"
            >
                <span className="pb-1">+</span>
            </Link>

            {/* Slide-in Details Panel & Overlay */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <h2 className="text-2xl font-bold text-gray-900">Member Details</h2>
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col items-center mb-10">
                                <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-5xl mb-6 border-4 border-emerald-50">
                                    {selectedMember.name.charAt(0)}
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 text-center">{selectedMember.name}</h3>
                                <span className="mt-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                    {selectedMember.relation}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</label>
                                    <p className="text-lg font-medium text-gray-900">{selectedMember.age} Years Old</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Group</label>
                                    <p className="text-lg font-medium text-gray-900">{selectedMember.bloodGroup || 'Not specified'}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Education / Job</label>
                                    <p className="text-lg font-medium text-gray-900">{selectedMember.studying || selectedMember.working || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="mt-12 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => handleDelete(selectedMember._id)}
                                    className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Remove this Member
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
