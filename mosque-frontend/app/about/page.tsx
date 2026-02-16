"use client";

import Navbar from '../../components/Navbar';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">Our Story</h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            About Our Madrasa
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                            Dedicated to fostering knowledge, spiritual growth, and community unity for over two decades.
                        </p>
                    </div>

                    <div className="mt-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="bg-emerald-50 rounded-lg p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To provide high-quality Islamic and modern education that empowers our students to become compassionate, ethical, and knowledgeable leaders of tomorrow. We strive to create an inclusive environment where every student is valued and encouraged to reach their full potential.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    A vibrant community united by faith and knowledge, where the Madrasa serves as a beacon of light, guiding generations towards righteousness and success in this life and the hereafter.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <div className="prose prose-emerald mx-auto text-gray-500">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our History</h3>
                            <p className="mb-4">
                                Established in 2000, our Madrasa began as a humble initiative with just a handful of students and a single teacher. The goal was simple: to ensure that the children of our community had access to foundational Islamic teachings.
                            </p>
                            <p className="mb-4">
                                Over the years, through the unwavering support of our community members and the blessings of the Almighty, we have grown into a fully-fledged institution. Today, we cater to hundreds of students, offering a comprehensive curriculum that blends traditional religious studies with contemporary learning.
                            </p>
                            <p>
                                We are proud of our alumni who have gone on to serve the community in various capacities, bearing witness to the quality of education and values instilled within these walls. As we look to the future, we remain committed to our founding principles while embracing new methods to better serve our students.
                            </p>
                        </div>
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
