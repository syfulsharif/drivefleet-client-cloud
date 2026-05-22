import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24 px-6 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-[#d4af37] text-sm uppercase tracking-[0.4em] font-bold mb-4">404 Error</p>
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">Off Course.</h1>
        <p className="text-[#a1a1a6] text-sm max-w-md mx-auto mb-12">
          The vehicle or destination you're looking for cannot be found in our current coordinates.
        </p>
        <Link to="/" className="bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors">
          Return to Hub
        </Link>
      </motion.div>
    </div>
  );
}
