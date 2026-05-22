import React, { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get(`/cars?keyword=${keyword}`);
        setCars(data);
      } catch (error) {
        toast.error('Failed to fetch fleet');
      } finally {
        setLoading(false);
      }
    };
    
    // Add small debounce
    const timer = setTimeout(() => {
      fetchCars();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [keyword]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a vehicle');
      navigate('/login');
      return;
    }
    
    if (!startDate || !endDate) return;

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      if (days <= 0) {
         return toast.error('End date must be after start date');
      }

      const totalPrice = days * selectedCar.pricePerDay;

      await api.post('/bookings', {
        carId: selectedCar._id,
        startDate,
        endDate,
        totalPrice
      });
      
      toast.success('Booking confirmed!');
      setSelectedCar(null);
      setStartDate('');
      setEndDate('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  }

  return (
    <div className="py-12 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
        <div>
          <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-bold">The Fleet</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mt-2">Available Vehicles</h1>
        </div>
        
        <div className="w-full md:w-1/3">
          <input 
            type="text" 
            placeholder="Search by brand, model..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d4af37] animate-spin"></div>
        </div>
      ) : cars.length === 0 ? (
        <div className="py-24 text-center border lg:p-24 border-white/5 bg-[#161618]">
          <p className="text-white text-xl font-serif mb-2">No vehicles found.</p>
          <p className="text-[#71717a] text-sm">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car: any, i: number) => (
            <motion.div 
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161618] border border-white/5 overflow-hidden flex flex-col group cursor-pointer hover:border-[#d4af37]/30 transition-colors"
              onClick={() => setSelectedCar(car)}
            >
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${car.image})` }}
              />
              <div className="p-6 bg-[#111113] z-10 flex flex-col flex-1">
                <span className="text-[10px] text-[#71717a] uppercase tracking-widest mb-2 border-b border-white/5 pb-2 inline-block">
                  {car.brand} {car.addedBy?.name ? `• Added by ${car.addedBy.name}` : ''}
                </span>
                <h3 className="text-xl font-serif text-white mb-4 line-clamp-1">{car.title}</h3>
                
                <div className="mt-auto flex justify-between items-end pt-4">
                  <p className="text-2xl text-white font-serif tracking-tight">${car.pricePerDay} <span className="text-sm font-sans tracking-normal opacity-50">/day</span></p>
                  <p className="text-[10px] text-[#d4af37] uppercase tracking-tighter shadow-sm">{car.bookingCount} Trips</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCar(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl bg-[#161618] border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <div 
              className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedCar.image})` }}
            />
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <button onClick={() => setSelectedCar(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white">&times;</button>
              
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-2">{selectedCar.brand}</span>
              <h2 className="text-3xl font-serif text-white mb-4">{selectedCar.title}</h2>
              <p className="text-sm text-[#a1a1a6] leading-relaxed mb-8">{selectedCar.description}</p>
              
              <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/10">
                 <p className="text-xs text-[#71717a] uppercase tracking-widest">Daily Rate</p>
                 <p className="text-3xl font-serif text-white">${selectedCar.pricePerDay}</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Pick-up</label>
                     <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Return</label>
                     <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
                   </div>
                 </div>
                 <button type="submit" className="w-full bg-white text-black py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors">
                   Confirm Reservation
                 </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
