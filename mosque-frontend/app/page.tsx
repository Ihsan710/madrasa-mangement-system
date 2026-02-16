"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {

  // No auto-redirect; let the user explore the landing page

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/masjid-cover.jpg"
            alt="Mosque Interior"
            className="w-full h-full object-cover fixed top-0"
          />
          {/* Stronger overlay for the white building */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-emerald-900/40 to-gray-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-sm font-semibold tracking-wider mb-6 uppercase">
              Welcome to Izzathul Islam
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
              Faith, Community, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                & Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Serving the community with dedication, striving for spiritual growth and educational brilliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => scrollToSection('about')} className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl backdrop-blur-sm" suppressHydrationWarning>
                Learn About Us
              </button>
              <button onClick={() => scrollToSection('login-section')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center" suppressHydrationWarning>
                <span>Login Portal</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20" onClick={() => scrollToSection('about')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold tracking-wide uppercase">Who We Are</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">About Our Community</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img src="/about-cover.jpg" alt="Community Gathering" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-xl">Establishment</p>
                <p className="text-sm">SERVING SINCE 1995</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">A Center for Spiritual & Social Growth</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Izzathul Islam is more than just a mosque; it is a vibrant community hub dedicated to fostering brotherly bonds, educational excellence, and charitable initiatives.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our mission is to provide comprehensive support to our members, ranging from religious education in our Madrasa to social welfare programs for families in need.
              </p>
              <Link href="/about" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-800 transition-colors group">
                Read Full History
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MADRASA SECTION */}
      <section id="madrasa" className="py-24 bg-gray-50 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold tracking-wide uppercase">Our Education</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">The Madrasa</h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">Nurturing the next generation with knowledge and character.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-emerald-500">
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center text-3xl mb-6">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quranic Studies</h3>
              <p className="text-gray-600">Comprehensive Hifz and Tajweed programs designed for students of all ages.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-teal-500">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-3xl mb-6">🕌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Islamic Jurisprudence</h3>
              <p className="text-gray-600">Deep dives into Fiqh and Hadith to understand the practical applications of faith.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-emerald-500">
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center text-3xl mb-6">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Moral Education</h3>
              <p className="text-gray-600">Focusing on Tarbiyah (upbringing) to mold characters rooted in integrity and compassion.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/madrasa" className="inline-block px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-600 hover:text-white transition-all">
              Explore Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-emerald-900 text-white relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="text-emerald-300 font-semibold tracking-wide uppercase">Get in Touch</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Visit Us Today</h2>
              <p className="text-emerald-100 text-lg mb-8">
                We welcome everyone to join our prayers and participate in our community events.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mt-1 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg">Address</h4>
                    <p className="text-emerald-200">CWH6+GFC, Koyilandy - Edavanna Rd, Kedavur, Kerala 673573</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mt-1 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg">Phone</h4>
                    <p className="text-emerald-200">+91 98478 81554</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mt-1 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-emerald-200">contact@izzathulislam.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder or Form */}
            <div className="bg-emerald-800 rounded-2xl p-8 shadow-inner">
              <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400" />
                <textarea rows={3} placeholder="Message" className="w-full px-4 py-3 rounded-lg bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"></textarea>
                <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-lg transition-colors">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOGIN SECTION AREA */}
      <div id="login-section" className="relative z-10 bg-white py-24 scroll-mt-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-emerald-600 font-semibold tracking-wide uppercase">Member Access</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2 mb-8">Login to Portal</h2>
            <p className="text-gray-500 mb-12">
              Access exclusive features for registered citizens and administrative staff. Manage fees, view family records, and stay updated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Citizen Login Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-emerald-300 group"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Citizen Login</h3>
              <p className="text-gray-500 mb-8">For community members to check status and payments.</p>
              <Link href="/login" className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex justify-center items-center">
                Login as Citizen <span className="ml-2">→</span>
              </Link>
            </motion.div>

            {/* Admin Access Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-blue-300 group"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h3>
              <p className="text-gray-500 mb-8">For verified administrators to manage the system.</p>
              <Link href="/login" className="w-full py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-lg hover:border-gray-900 hover:bg-gray-100 transition-all flex justify-center items-center">
                Admin Login <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-gray-900 border-t border-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-bold text-emerald-500">Izzathul Islam</span>
            <p className="text-gray-400 text-sm mt-1">© 2026 All rights reserved.</p>
          </div>
          <div className="flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection('madrasa')} className="text-gray-400 hover:text-white transition-colors">Madrasa</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
