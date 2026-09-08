import React from 'react';
import { 
  Palette, 
  Smartphone, 
  SearchCheck, 
  Zap, 
  ShieldCheck, 
  CheckCircle, 
  Target, 
  Sliders
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: 'Professional Design',
      desc: 'Sleek dark-mode & clean branding crafted to make your business look like an established market leader.',
      icon: Palette,
      color: 'text-blue-400',
    },
    {
      title: 'Mobile Responsive',
      desc: 'Pixel-perfect on 360px up to 4K screens. Zero horizontal scroll, lightning-fast touch navigation.',
      icon: Smartphone,
      color: 'text-lime-400',
    },
    {
      title: 'SEO Friendly',
      desc: 'Semantic HTML5 structure, schema.org tags, clean URLs, and meta tags built for Google bots.',
      icon: SearchCheck,
      color: 'text-sky-400',
    },
    {
      title: 'Fast Loading',
      desc: 'Optimized scripts, minified CSS, and lightweight PHP backend ready for 90+ Google PageSpeed score.',
      icon: Zap,
      color: 'text-yellow-400',
    },
    {
      title: 'Secure & Hardened',
      desc: 'HTTPS SSL ready, anti-spam honeypot security, SQL injection protection, and sanitized data handling.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
    {
      title: 'Google Friendly',
      desc: 'Seamless integration with Google Business Profile, Maps directions, and Google Search index.',
      icon: CheckCircle,
      color: 'text-blue-300',
    },
    {
      title: 'Lead Focused',
      desc: 'Direct click-to-call, instant WhatsApp triggers, and dedicated landing pages built for high conversion.',
      icon: Target,
      color: 'text-rose-400',
    },
    {
      title: 'Easy to Manage',
      desc: 'Simple web admin panel to monitor incoming leads, update progress statuses, and export data in 1-click.',
      icon: Sliders,
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="py-20 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/60 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider">
            <span>The Grofasto Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-400">Grofasto?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We don't just build websites — we build lead-generating growth engines customized for the Indian market.
          </p>
        </div>

        {/* 8 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c1426]/90 border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/30"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${b.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
