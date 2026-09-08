import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onNavigate: (path: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onNavigate }) => {
  return (
    <aside 
      id="mobile-sticky-cta-bar"
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-lg border-t border-slate-800 p-2 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2">
        
        {/* CALL */}
        <a
          id="mobile-bottom-call"
          href="tel:+919457690255"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 text-white active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-lime-400 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">CALL</span>
        </a>

        {/* WHATSAPP */}
        <a
          id="mobile-bottom-whatsapp"
          href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 active:scale-95 transition-all text-center"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WHATSAPP</span>
        </a>

        {/* FREE DEMO */}
        <button
          id="mobile-bottom-demo"
          onClick={() => onNavigate('/contact?purpose=Free%20Demo%20Website')}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-blue-600 to-lime-500 text-white font-bold active:scale-95 transition-all shadow-md shadow-blue-600/30 text-center cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">FREE DEMO</span>
        </button>

      </div>
    </aside>
  );
};
