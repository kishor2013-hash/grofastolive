import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            id="header-brand-logo"
            onClick={(e) => handleNav('/', e)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-lime-400 p-[2px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center font-bold text-lg text-white">
                <span className="text-blue-400 font-extrabold text-xl">G</span>
                <span className="text-lime-400 font-extrabold text-xl">F</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  GROFASTO
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              </div>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Digital Solution
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              id="nav-link-home"
              onClick={(e) => handleNav('/', e)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <a
              id="nav-link-industries"
              href="#industries"
              onClick={(e) => handleSectionScroll('industries', e)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Industries
            </a>
            <a
              id="nav-link-services"
              href="#services"
              onClick={(e) => handleSectionScroll('services', e)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Services
            </a>
            <a
              id="nav-link-how-it-works"
              href="#how-it-works"
              onClick={(e) => handleSectionScroll('how-it-works', e)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <button
              id="nav-link-contact"
              onClick={(e) => handleNav('/contact', e)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPath.startsWith('/contact') ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-call-btn"
              href="tel:+919457690255"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 transition-all"
              title="Call Grofasto Digital Solution"
            >
              <Phone className="w-3.5 h-3.5 text-lime-400" />
              <span>+91 9457690255</span>
            </a>

            <button
              id="header-free-demo-btn"
              onClick={(e) => handleNav('/contact?purpose=Free%20Demo%20Website', e)}
              className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-lime-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
              <span>GET FREE DEMO</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+919457690255"
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-lime-400 hover:text-white"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-b border-slate-800 bg-[#070b14]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 py-2">
            <button
              id="mobile-nav-home"
              onClick={(e) => handleNav('/', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-200 hover:text-white hover:bg-slate-800/60"
            >
              Home
            </button>
            <button
              id="mobile-nav-industries"
              onClick={(e) => handleSectionScroll('industries', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              Industries
            </button>
            <button
              id="mobile-nav-services"
              onClick={(e) => handleSectionScroll('services', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              Services
            </button>
            <button
              id="mobile-nav-how"
              onClick={(e) => handleSectionScroll('how-it-works', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              How It Works
            </button>
            <button
              id="mobile-nav-contact"
              onClick={(e) => handleNav('/contact', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-blue-400 hover:bg-slate-800/60"
            >
              Contact / Book Online
            </button>
            <button
              id="mobile-nav-admin"
              onClick={(e) => handleNav('/admin', e)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Admin Portal
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
            <a
              href="tel:+919457690255"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-lime-400" />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            id="mobile-nav-cta-btn"
            onClick={(e) => handleNav('/contact?purpose=Free%20Demo%20Website', e)}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-center bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-md shadow-blue-600/30"
          >
            GET FREE DEMO WEBSITE
          </button>
        </div>
      )}
    </header>
  );
};
