import React, { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/mine');
        setBookings(data);
      } catch (error) {
        toast.error('Failed to load your active reservations');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="py-12 px-6 md:px-12">
      <div className="mb-12">
        <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-bold">Concierge</span>
        <h1 className="text-4xl md:text-5xl font-serif text-white mt-2">My Bookings</h1>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d4af37] animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="py-24 text-center border border-white/5 bg-[#161618]">
          <p className="text-white text-xl font-serif mb-2">No active reservations.</p>
          <p className="text-[#71717a] text-sm">Your journey hasn't started yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking: any, i: number) => (
            <motion.div 
              key={booking._id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161618] border border-white/5 flex flex-col md:flex-row overflow-hidden group"
            >
              <div 
                className="w-full md:w-64 h-48 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${booking.car?.image})` }}
              />
              <div className="p-6 md:p-8 flex-1 flex flex-col bg-[#111113]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] text-[#71717a] uppercase tracking-widest">{booking.car?.brand}</span>
                    <h3 className="text-2xl font-serif text-white">{booking.car?.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#d4af37]">
                    {booking.status}
                  </span>
                </div>
                
                <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-white/5">
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-1">Pick-up</p>
                     <p className="text-sm font-medium text-white">{new Date(booking.startDate).toLocaleDateString()}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-1">Return</p>
                     <p className="text-sm font-medium text-white">{new Date(booking.endDate).toLocaleDateString()}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-1">Total Due</p>
                     <p className="text-sm font-medium text-white">${booking.totalPrice}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
