import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-12 py-12 shrink-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-serif tracking-widest text-white mb-4">DRIVEFLEET</div>
          <p className="text-sm text-[#71717a] max-w-sm leading-relaxed">
            Redefining the journey with an elite fleet of high-performance vehicles curated for those who demand excellence on every mile.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white mb-6">Concierge</h4>
          <ul className="space-y-3 text-sm text-[#71717a]">
            <li><a href="#" className="hover:text-white transition-colors">Explore Fleet</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chauffeur Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Long-term Leasing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white mb-6">Connect</h4>
          <ul className="space-y-3 text-sm text-[#71717a]">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#71717a] uppercase tracking-widest gap-4">
        <p>&copy; {new Date().getFullYear()} DriveFleet. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
