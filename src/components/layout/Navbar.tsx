import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5 shrink-0">
      <Link to="/" className="text-xl md:text-2xl font-serif tracking-widest text-white">DRIVEFLEET</Link>
      <div className="hidden md:flex flex-1 justify-center gap-10 text-xs uppercase tracking-[0.2em] font-medium">
        <Link to="/" className="text-white border-b border-transparent hover:border-white/40 pb-1 transition-colors">Home</Link>
        <Link to="/explore" className="text-white border-b border-transparent hover:border-white/40 pb-1 transition-colors">Explore Fleet</Link>
        {user && (
          <>
            <Link to="/my-bookings" className="text-white border-b border-transparent hover:border-white/40 pb-1 transition-colors">My Bookings</Link>
            <Link to="/my-cars" className="text-white border-b border-transparent hover:border-white/40 pb-1 transition-colors">My Fleet</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {user ? (
          <>
            <span className="hidden md:block text-xs uppercase tracking-widest text-[#a1a1a6]">{user.name}</span>
            <button onClick={handleLogout} className="bg-transparent border border-white/20 text-white px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs uppercase tracking-widest text-[#a1a1a6] hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-[#e5e5e7] transition-colors">Join Exclusive</Link>
          </>
        )}
      </div>
    </nav>
  );
}
