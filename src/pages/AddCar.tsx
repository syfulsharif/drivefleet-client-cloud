import React, { useState } from 'react';
import { api } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AddCar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    pricePerDay: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/cars', {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
      });
      toast.success('Vehicle added to the fleet.');
      navigate('/my-cars');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-6 md:px-12 max-w-4xl mx-auto w-full">
      <div className="mb-12">
        <span className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-bold">Admin Hub</span>
        <h1 className="text-4xl md:text-5xl font-serif text-white mt-2">Commission Vehicle</h1>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="space-y-6 bg-[#161618] border border-white/5 p-8 md:p-12 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Make / Brand</label>
            <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Model / Designation</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Vehicle Image URL</label>
          <input required type="url" placeholder="https://example.com/image.jpg" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Price Per Day ($)</label>
          <input required type="number" min="0" value={formData.pricePerDay} onChange={e => setFormData({...formData, pricePerDay: e.target.value})} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
        </div>

        <div>
           <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Vehicle Description</label>
           <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50" />
        </div>

        <div className="pt-4 flex justify-end gap-4">
           <button type="button" onClick={() => navigate('/my-cars')} className="px-8 py-4 text-xs uppercase tracking-widest font-bold text-white hover:text-[#d4af37] transition-colors">Discard</button>
           <button type="submit" disabled={loading} className="bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors disabled:opacity-50">
             {loading ? 'Processing...' : 'Authorize Vehicle'}
           </button>
        </div>
      </motion.form>
    </div>
  );
}
