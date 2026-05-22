import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e5e5e7] flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
