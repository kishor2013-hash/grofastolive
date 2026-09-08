import React from 'react';
import { Phone, MapPin, Mail, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms }) => {
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-300 text-xs relative pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-lime-400 p-[2px]">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[9px] flex items-center justify-center font-extrabold text-white text-base">
                  <span className="text-blue-400">G</span>
                  <span className="text-lime-400">F</span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  GROFASTO DIGITAL SOLUTION
                </span>
                <span className="text-[11px] font-semibold text-lime-400">
                  Your Business | Our Technology | More Growth
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Empowering schools, doctors, clinics, hospitals, retail shops, and businesses across India with modern high-speed websites, Google Business Profile dominance, Local SEO, and ROI-driven digital marketing.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-lime-400" />
                <a href="tel:+919457690255" className="hover:text-white font-bold">
                  +91 9457690255
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href="mailto:info.grofasto@gmail.com" className="hover:text-white">
                  info.grofasto@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Meerut, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleScrollTo('industries', e)}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Industries
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleScrollTo('services', e)}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleScrollTo('how-it-works', e)}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contact / Book Online
                </button>
              </li>
            </ul>
          </div>

          {/* Core Industries */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Industries Served
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/contact?purpose=School%20Website')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Schools &amp; Academics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact?purpose=Doctor%20Website')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Doctors &amp; Clinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact?purpose=Hospital%20Website')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hospitals &amp; Emergency
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact?purpose=Retail%20Business')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shops &amp; Retail Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact?purpose=Business%20Website')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Enterprises &amp; Services
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Legal &amp; Admin
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('/admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 hover:text-white hover:border-blue-500 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            &copy; 2026 Grofasto Digital Solution. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Hostinger Shared Hosting Ready</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-400">Meerut, UP, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
