import React, { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function MyCars() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Confimation state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    try {
      const { data } = await api.get('/cars');
      // Filter by addedBy - handle both string ID and object reference
      setCars(data.filter((car: any) => {
        const addedById = typeof car.addedBy === 'object' ? car.addedBy?._id : car.addedBy;
        return addedById === user?._id || addedById === user?.id;
      }));
    } catch {
      toast.error('Failed to load your fleet');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/cars/${id}`);
      toast.success('Vehicle retired from fleet.');
      setCars(cars.filter(c => c._id !== id));
      setDeletingId(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove vehicle');
    }
  };

  return (
    <div className="py-12 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
        <div>
          <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-bold">Admin Hub</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mt-2">My Fleet</h1>
        </div>
        
        <Link to="/add-car" className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-widest text-center hover:bg-[#e5e5e7] transition-colors">
          + Commission Vehicle
        </Link>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d4af37] animate-spin"></div>
        </div>
      ) : cars.length === 0 ? (
        <div className="py-24 text-center border border-white/5 bg-[#161618]">
          <p className="text-white text-xl font-serif mb-2">You haven't added any vehicles yet.</p>
          <p className="text-[#71717a] text-sm">Commission a vehicle to expand the fleet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car: any, i: number) => (
            <motion.div 
              key={car._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161618] border border-white/5 overflow-hidden flex flex-col group"
            >
              <div 
                className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${car.image})` }}
              />
              <div className="p-6 bg-[#111113] z-10 flex flex-col flex-1">
                <span className="text-[10px] text-[#71717a] uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                  {car.brand}
                </span>
                <h3 className="text-xl font-serif text-white mb-2 line-clamp-1">{car.title}</h3>
                <p className="text-xs text-[#71717a] mb-6">{car.bookingCount || 0} Lifetime trips</p>
                
                {deletingId === car._id ? (
                  <div className="mt-auto flex flex-col p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-[10px] text-red-400 uppercase tracking-widest mb-3">Confirm Retirement?</p>
                    <div className="flex gap-2">
                       <button onClick={() => handleDelete(car._id)} className="flex-1 bg-red-600 text-white py-2 text-[10px] uppercase font-bold hover:bg-red-700">Retire</button>
                       <button onClick={() => setDeletingId(null)} className="flex-1 bg-white/10 text-white py-2 text-[10px] uppercase tracking-widest hover:bg-white/20">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto flex justify-between gap-4">
                     <button onClick={() => setDeletingId(car._id)} className="w-full border border-white/20 text-white py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 hover:border-red-500/50 hover:text-red-400 transition-colors">Retire Vehicle</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
