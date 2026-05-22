import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-12 md:py-24">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row px-6 md:px-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-bold">Your Premium Car Rental Service for Luxury Cars</span>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight text-white">
              Redefining <br/>
              <span className="italic">The Journey.</span>
            </h1>
            <p className="text-[#a1a1a6] text-sm md:text-lg max-w-md leading-relaxed">
              Access an elite fleet of high-performance vehicles curated for those who demand excellence on every mile.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/explore" className="bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest text-center hover:bg-[#e5e5e7] transition-colors">
              Explore Fleet
            </Link>
          </div>
        </motion.div>

        {/* Featured Car Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#d4af37]/10 to-transparent blur-3xl rounded-full"></div>
          <div className="relative bg-[#161618] border border-white/5 rounded-2xl overflow-hidden aspect-video md:aspect-[4/3] flex flex-col">
            <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-end gap-4 bg-[#111113]">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-white">Porsche 911 GT3 RS</h3>
                <div className="flex flex-wrap gap-2 md:gap-4 mt-3">
                  <span className="text-[10px] border border-white/20 px-2 py-1 uppercase tracking-tighter">518 HP</span>
                  <span className="text-[10px] border border-white/20 px-2 py-1 uppercase tracking-tighter">3.2s 0-60</span>
                  <span className="text-[10px] border border-white/20 px-2 py-1 uppercase tracking-tighter">Top: 184 mph</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs text-[#71717a] uppercase tracking-widest mb-1">Daily Rate</p>
                <p className="text-2xl text-white font-serif tracking-tight">$850 <span className="text-sm">/day</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Grid / Stats */}
      <section className="px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-t font-sans border-white/5">
        <div className="space-y-1">
          <p className="text-[#d4af37] text-2xl font-serif">48+</p>
          <p className="text-[10px] text-[#71717a] uppercase tracking-widest font-bold">Premium Models</p>
        </div>
        <div className="space-y-1">
          <p className="text-white text-2xl font-serif">12</p>
          <p className="text-[10px] text-[#71717a] uppercase tracking-widest font-bold">Global Hubs</p>
        </div>
        <div className="col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-6 md:gap-12 mt-4 md:mt-0">
          <div className="text-left sm:text-right">
            <p className="text-xs text-white uppercase tracking-widest">Recent Booking</p>
            <p className="text-[10px] text-[#71717a] italic">Luxury SUV in London, UK</p>
          </div>
          <div className="flex -space-x-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0b] bg-[#222]"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0b] bg-[#333]"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0b] bg-[#d4af37] flex items-center justify-center text-[10px] font-bold text-black">+2k</div>
          </div>
        </div>
      </section>
      
      {/* Static Section 1 */}
      <section className="px-6 md:px-12 text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white">The Art of Mobility</h2>
        <p className="text-[#71717a] text-sm md:text-base leading-relaxed">
          At DriveFleet, we believe that the vehicle you choose is a statement of intent. It's not just about reaching a destination; it's about how you feel during the journey. Our concierge team ensures every requirement is meticulously catered to, providing an unparalleled experience.
        </p>
      </section>
    </div>
  );
}
