import React from 'react';
import { Phone, MessageSquare, MapPin, Globe, Sparkles, Mail, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  onNavigate: (path: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  return (
    <section id="contact-info" className="py-16 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0b162a]/95 to-slate-900/90 border border-slate-800 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Business Contact Summary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <span>Direct Contact Information</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                GROFASTO <span className="text-lime-400">DIGITAL SOLUTION</span>
              </h2>

              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Connect with our technology &amp; marketing consultants in Meerut. Whether you need a brand-new school portal, clinic booking system, or Google Business profile boost, we are ready to assist.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Direct Phone</span>
                    <a href="tel:+919457690255" className="font-bold text-white hover:text-blue-400 transition-colors">
                      +91 9457690255
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Headquarters</span>
                    <span className="font-bold text-white">Meerut, Uttar Pradesh, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Official Website</span>
                    <a href="https://www.grofasto.com" className="font-bold text-white hover:text-sky-400 transition-colors">
                      www.grofasto.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Business Email</span>
                    <span className="font-bold text-white">info.grofasto@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button Stack */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <a
                id="contact-section-call"
                href="tel:+919457690255"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>CALL NOW: +91 9457690255</span>
              </a>

              <a
                id="contact-section-whatsapp"
                href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP CHAT</span>
              </a>

              <button
                id="contact-section-demo-btn"
                onClick={() => onNavigate('/contact?purpose=Free%20Demo%20Website')}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>GET FREE DEMO</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
