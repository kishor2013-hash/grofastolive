import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
      <a
        id="floating-whatsapp-trigger"
        href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Direct WhatsApp Chat with Grofasto"
      >
        {/* Pulsing radar circle */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
        
        <MessageSquare className="w-6 h-6 fill-white" />
        
        {/* Tooltip on desktop hover */}
        <span className="hidden md:group-hover:block absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap border border-slate-700 shadow-xl">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
