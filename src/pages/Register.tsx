import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Registration successful. Welcome!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#161618] border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">Join Exclusive</h1>
          <p className="text-xs uppercase tracking-widest text-[#71717a]">Elevate your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
              placeholder="e.g. Drive123"
            />
            <p className="text-[10px] text-[#71717a] mt-2">Must have 1 uppercase, 1 lowercase, and 6+ chars.</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Apply for Membership'}
          </button>
        </form>
        
        <p className="text-center mt-8 text-xs text-[#71717a]">
          Already a member? <Link to="/login" className="text-white hover:text-[#d4af37] transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
