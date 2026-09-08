import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface FreeDemoSectionProps {
  onNavigate: (path: string) => void;
}

export const FreeDemoSection: React.FC<FreeDemoSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070b14] via-[#091326] to-[#070b14] border-t border-b border-slate-800/80">
      {/* Glow lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-lime-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0b162c]/95 to-slate-900/95 p-8 sm:p-12 md:p-16 border border-blue-500/30 shadow-2xl shadow-blue-950/60 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Risk-Free Digital Trial</span>
          </div>

          {/* Large Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              GET YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-300">FREE DEMO WEBSITE</span>
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-lime-400 tracking-wide pt-1">
              पहले देखें, फिर निर्णय लें!
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get a professional demo website for your business. See the design first, test the mobile experience on your phone, and decide later.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="free-demo-large-cta"
              onClick={() => onNavigate('/contact?purpose=Free%20Demo%20Website')}
              className="w-full sm:w-auto px-9 py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>GET FREE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="free-demo-whatsapp-cta"
              href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-slate-800 hover:bg-slate-700 text-white border border-emerald-500/50 hover:border-emerald-400 transition-all flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>

          {/* Security & Guarantee line */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
            <span>No upfront payment required &bull; 48-hour delivery &bull; 100% Mobile Ready</span>
          </div>

        </div>
      </div>
    </section>
  );
};
