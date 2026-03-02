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
    <div className="min-h-screen font-sans bg-[#0B1120] text-slate-200 overflow-x-hidden selection:bg-emerald-500/30">

      {/* GLOBAL BACKGROUND EFFECTS (ORBS) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-600/10 blur-[150px]"></div>
      </div>

      {/* CUSTOM FLOATING NAVBAR OVERRIDE (For visual impact on landing only, reusing existing Navbar implicitly via layout if needed, but styling locally for the hero) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <Navbar />
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Glowing Pill */}
            <div className="group hidden sm:flex relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-emerald-950/30 px-6 font-medium text-emerald-300 border border-emerald-500/30 backdrop-blur-xl mb-10 transition-all hover:bg-emerald-900/50 hover:border-emerald-400/50 cursor-default">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Digital Madrasa Management Platform
              <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
            </div>

            {/* Massive Typography */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black text-white mb-6 leading-[1.1] tracking-tighter drop-shadow-2xl">
              Faith meets <br className="hidden md:block" />
              <span className="relative">
                <span className="absolute -inset-1 blur-2xl opacity-40 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-200 to-emerald-600">
                  Brilliance.
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Izzathul Islam is redefining community connection. Experience a seamless, transparent, and highly modern approach to Madrasa administration.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
              {/* Primary CTA */}
              <button onClick={() => scrollToSection('login-section')} className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-emerald-500 text-slate-950 font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.8)]" suppressHydrationWarning>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all group-hover:scale-110"></div>
                <span className="relative flex items-center gap-2">
                  Enter Portal
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              {/* Secondary CTA (Glass) */}
              <button onClick={() => scrollToSection('about')} className="relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 text-white font-semibold text-lg rounded-2xl transition-all hover:bg-slate-800/80 hover:border-slate-500/50" suppressHydrationWarning>
                Discover More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 text-slate-500 hover:text-emerald-400 transition-colors"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-8 h-12 rounded-full border-2 border-current flex justify-center p-2">
            <div className="w-1 h-3 bg-current rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      {/* 2. ABOUT US SECTION (ASYMMETRIC) */}
      <section id="about" className="py-32 relative z-10 scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] border-y border-white/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Block */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] blur-xl opacity-50"></div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img src="/about-cover.jpg" alt="Community Gathering" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-emerald-300 text-xs font-bold tracking-widest uppercase mb-3">
                    Est. 1995
                  </div>
                  <h3 className="text-3xl font-bold">Rooted in Tradition</h3>
                </div>
              </div>
            </motion.div>

            {/* Text Overlay Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 lg:-ml-20 relative z-20"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-4 block">Who We Are</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  A Center for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-500">Spiritual Growth</span>
                </h2>
                <div className="w-16 h-1 bg-emerald-500/50 mb-8 rounded-full"></div>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Izzathul Islam is more than just a mosque; it is a highly integrated community hub. We foster powerful brotherly bonds, unmatched educational excellence, and vital charitable initiatives.
                </p>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  From religious up-bringing in our state-of-the-art Madrasa to financial and social welfare programs, we exist to uplift every individual.
                </p>

                <Link href="/about" className="group inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold transition-all hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]">
                  <span className="bg-slate-900 hover:bg-transparent px-6 py-3 rounded-full transition-colors flex items-center">
                    Read Our Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MADRASA SECTION (BENTO GRID) */}
      <section id="madrasa" className="py-32 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Curriculum</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Nurturing the next generation with deep knowledge and unbreakable character.</p>
          </motion.div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">

            {/* Bento Card 1 - Large */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8 flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">📚</div>
              <div className="relative z-10 mt-auto">
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2 block">Core</span>
                <h3 className="text-3xl font-bold text-white mb-4">Quranic Studies</h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-md">Comprehensive Hifz (memorization) and Tajweed (elocution) programs meticulously designed for students of all ages to connect with the divine word.</p>
              </div>
            </motion.div>

            {/* Bento Card 2 - Top Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 relative rounded-3xl overflow-hidden group border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-2xl rounded-full"></div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-xl mb-6 group-hover:-translate-y-2 transition-transform">🕌</div>
              <h3 className="text-2xl font-bold text-white mb-2">Islamic Jurisprudence</h3>
              <p className="text-slate-400">Deep dives into Fiqh and Hadith. Understand the practical, day-to-day applications of faith in the modern world.</p>
            </motion.div>

            {/* Bento Card 3 - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 relative rounded-3xl overflow-hidden group border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-sm p-8"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-6 group-hover:-translate-y-2 transition-transform">🎓</div>
              <h3 className="text-2xl font-bold text-white mb-2">Moral Education</h3>
              <p className="text-emerald-100/70">Focusing heavily on Tarbiyah (upbringing). We exist to mold characters rooted in unshakeable integrity, empathy, and compassion.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LOGIN SECTION AREA (SLEEK SaaS STYLE) */}
      <div id="login-section" className="relative z-10 py-32 scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Access Your Dashboard</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Secure, role-based entry to the management infrastructure.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">

            {/* Citizen Login Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 flex flex-col items-center text-center transition-all hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] group"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Citizen Portal</h3>
              <p className="text-slate-400 mb-10 flex-grow">Access personal family records, view transparent fee status, and update your profile instantly.</p>
              <Link href="/login" className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">
                Citizen Sign In
              </Link>
            </motion.div>

            {/* Admin Access Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-10 flex flex-col items-center text-center transition-all hover:border-blue-400/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Admin Infrastructure</h3>
              <p className="text-slate-400 mb-10 flex-grow">Full system oversight. Manage directory, process fees, and view real-time organizational analytics.</p>
              <Link href="/login" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
                Admin Authentication
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5. MINIMALIST CONTACT SECTION */}
      <section id="contact" className="py-24 relative z-10 scroll-mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">Connect With Us</h2>
                <p className="text-slate-400 text-lg">We welcome everyone to join our prayers and participate in our community events.</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", icon2: "M15 11a3 3 0 11-6 0 3 3 0 016 0z", title: "HQ Address", desc: "CWH6+GFC, Koyilandy - Edavanna Rd, Kerala" },
                  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Direct Line", desc: "+91 98478 81554" },
                  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Electronic Mail", desc: "contact@izzathulislam.org" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-emerald-400 mr-6 group-hover:bg-emerald-500/20 transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        {item.icon2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon2} />}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glass Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none"></div>
              <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Send a Dispatch</h3>
              <form className="space-y-5 relative z-10">
                <input type="text" placeholder="Full Identity" className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light" />
                <input type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light" />
                <textarea rows={4} placeholder="Your Message" className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light resize-none"></textarea>
                <button className="w-full py-4 bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg">Transmit</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#070b14] text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-6 md:mb-0 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">II</div>
            <span className="text-xl font-bold text-white tracking-tight">Izzathul Islam</span>
          </div>
          <div className="flex space-x-8 font-medium">
            <button onClick={() => scrollToSection('about')} className="hover:text-emerald-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('madrasa')} className="hover:text-emerald-400 transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400 transition-colors">Contact</button>
          </div>
          <div className="mt-6 md:mt-0 text-slate-500 font-light hidden lg:block">
            © 2026 Architectural Code. All systems nominal.
          </div>
        </div>
      </footer>
    </div>
  );
}
