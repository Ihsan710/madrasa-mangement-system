"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getProfile, updateProfile } from '../../../utils/citizenApi';
import { getFamilyMembers } from '../../../utils/familyApi';
import { getMyFees } from '../../../utils/feeApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        bloodGroup: '',
        password: ''
    });
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Real Stats State
    const [stats, setStats] = useState({
        familyCount: 0,
        totalContributed: 0,
        memberSince: new Date().getFullYear()
    });

    // Helper to construct image URL
    const getImageUrl = (path: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;

        // Remove '/api' from the end of NEXT_PUBLIC_API_URL if it exists
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000';
        return `${baseUrl}${path}`;
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Parallel fetching for performance
                const [profileData, familyData, feeData] = await Promise.all([
                    getProfile(),
                    getFamilyMembers(),
                    getMyFees()
                ]);

                // Update Profile Form Data
                setFormData({
                    name: profileData.name,
                    mobile: profileData.mobile,
                    address: profileData.address,
                    bloodGroup: profileData.bloodGroup || '',
                    password: ''
                });

                if (profileData.profilePhoto) {
                    setPreviewUrl(getImageUrl(profileData.profilePhoto));
                }

                // Calculate Stats
                const totalFees = feeData.reduce((acc: number, record: any) => {
                    const paidAmount = record.payments
                        .filter((p: any) => p.paid)
                        .reduce((sum: number, p: any) => sum + p.amount, 0);
                    return acc + paidAmount;
                }, 0);

                // Calculate Member Since from MongoDB _id (first 4 bytes are timestamp)
                // Fallback to current year if something fails
                let joinYear = new Date().getFullYear();
                if (profileData._id) {
                    const timestamp = parseInt(profileData._id.substring(0, 8), 16) * 1000;
                    joinYear = new Date(timestamp).getFullYear();
                }

                setStats({
                    familyCount: familyData.length,
                    totalContributed: totalFees,
                    memberSince: joinYear
                });

            } catch (error) {
                console.error("Error fetching profile data", error);
                toast.error('Failed to load some profile details');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfileData();
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToUpdate = new FormData();
            for (const key in formData) {
                if (formData[key as keyof typeof formData] !== '') {
                    dataToUpdate.append(key, formData[key as keyof typeof formData]);
                }
            }
            if (profilePhoto) {
                dataToUpdate.append('profilePhoto', profilePhoto);
            }

            const updatedUser = await updateProfile(dataToUpdate);

            if (updatedUser.profilePhoto) {
                setPreviewUrl(getImageUrl(updatedUser.profilePhoto));
            }

            if (user) {
                const newUserData = { ...user, ...updatedUser };
                updateUser(newUserData); // No redirect
            }

            toast.success('Profile Updated Successfully');
            setFormData(prev => ({ ...prev, password: '' }));
            setProfilePhoto(null);
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto pb-10">
            <ToastContainer />

            {/* Profile Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6"
            >
                {/* Banner/Cover area */}
                <div className="h-40 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-16 mb-6">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg relative z-10">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-4xl font-bold">
                                        {formData.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 z-20 bg-emerald-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-emerald-700 transition shadow-md border-2 border-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            )}
                        </div>

                        <div className="mb-2 hidden sm:block">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm ${isEditing
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
                                    }`}
                            >
                                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">{formData.name}</h1>
                        <p className="text-emerald-600 font-medium">✨ Active Member</p>
                        <p className="text-gray-500 mt-2 max-w-lg">{formData.address || "No address provided yet."}</p>
                    </div>

                    {/* Quick Stats Row - REAL DATA */}
                    <div className="flex gap-8 mt-8 border-t border-gray-100 pt-6">
                        <div className="text-center sm:text-left">
                            <span className="block text-xl font-bold text-gray-900">{stats.familyCount}</span>
                            <span className="text-sm text-gray-500">Family Members</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <span className="block text-xl font-bold text-gray-900 whitespace-nowrap">₹ {stats.totalContributed.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">Contributed</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <span className="block text-xl font-bold text-gray-900">{stats.memberSince}</span>
                            <span className="text-sm text-gray-500">Member Since</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Edit Button (only visible on small screens) */}
            <div className="sm:hidden mb-6">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`w-full py-3 rounded-xl font-bold transition-all shadow-sm ${isEditing
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-emerald-600 text-white'
                        }`}
                >
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
            </div>

            {/* Edit Form Section */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white shadow-sm rounded-3xl p-8 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Update Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        >
                                            <option value="">Select Group</option>
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                        <textarea
                                            name="address"
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-200 transform hover:-translate-y-0.5 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
