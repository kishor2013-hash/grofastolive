import React from 'react';
import {
  Code,
  Store,
  TrendingUp,
  Search,
  Share2,
  Palette,
  Server,
  Smartphone,
  Cpu,
  MapPin,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (path: string) => void;
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  purpose: string;
  badge: string;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const services: ServiceItem[] = [
    {
      id: 'srv-web',
      number: '01',
      title: 'Website Design & Development',
      subtitle: 'Business / School / Hospital / Personal',
      description: 'Ultra-fast, mobile-first responsive websites engineered with clean PHP/HTML5/React code, built to capture customer leads and rank on Google.',
      icon: Code,
      purpose: 'Website Design & Development',
      badge: 'Core Service',
    },
    {
      id: 'srv-gbp',
      number: '02',
      title: 'Google Business Profile',
      subtitle: 'Setup & Optimization',
      description: 'Get verified on Google, configure official business categories, upload high-res photos, enable messaging, and collect 5-star customer reviews.',
      icon: Store,
      purpose: 'Google Business Profile',
      badge: 'High Demand',
    },
    {
      id: 'srv-maps',
      number: '03',
      title: 'Google Maps Promotion',
      subtitle: 'Local Navigation & Driving Directions',
      description: 'Drive physical foot-traffic and phone calls to your store or clinic when local buyers search on Google Maps near your location.',
      icon: MapPin,
      purpose: 'Google Maps Promotion',
      badge: 'Footfall Boost',
    },
    {
      id: 'srv-seo',
      number: '04',
      title: 'Local SEO & Google Ranking',
      subtitle: 'First Page Visibility',
      description: 'Keyword research, on-page optimization, local business citations, schema markup, and speed tuning to get your business onto Page 1.',
      icon: TrendingUp,
      purpose: 'Local SEO',
      badge: 'Organic Traffic',
    },
    {
      id: 'srv-gads',
      number: '05',
      title: 'Google Ads',
      subtitle: 'Search & Display Campaigns',
      description: 'Laser-focused Google Ads showing right when buyers search for your services. High quality scores with optimized landing pages for lower CPC.',
      icon: Search,
      purpose: 'Google Ads',
      badge: 'Instant Leads',
    },
    {
      id: 'srv-meta',
      number: '06',
      title: 'Meta Ads',
      subtitle: 'Facebook & Instagram Ads',
      description: 'Visually striking creative video & carousel ad campaigns targeting local demographics, interests, and pin codes for maximum inquiry generation.',
      icon: Share2,
      purpose: 'Meta Ads',
      badge: 'Hyper Targeted',
    },
    {
      id: 'srv-smm',
      number: '07',
      title: 'Social Media Marketing & Branding',
      subtitle: 'Brand Recognition & Trust',
      description: 'Professional social post designs, brand logo styling, festival greetings, and business branding that turns viewers into loyal customers.',
      icon: Palette,
      purpose: 'Social Media Marketing',
      badge: 'Reputation',
    },
    {
      id: 'srv-hosting',
      number: '08',
      title: 'Domain & Hosting Support',
      subtitle: 'Reliable Cloud Infrastructure',
      description: 'Domain registration, DNS setup, business emails (info@yourbusiness.com), free SSL certificates, and fast Hostinger shared hosting support.',
      icon: Server,
      purpose: 'Domain & Hosting',
      badge: '24/7 Security',
    },
    {
      id: 'srv-app',
      number: '09',
      title: 'App Development',
      subtitle: 'Android & iOS Mobile Solutions',
      description: 'Custom mobile application architecture for schools, healthcare portals, e-commerce, and appointment booking apps.',
      icon: Smartphone,
      purpose: 'App Development',
      badge: 'Custom Tech',
    },
    {
      id: 'srv-digital',
      number: '10',
      title: 'Digital Business Solutions',
      subtitle: 'End-to-End Business Modernization',
      description: 'CRM lead tracking, WhatsApp automated notifications, digital catalogs, payment gateways, and end-to-end digital sales funnels.',
      icon: Cpu,
      purpose: 'Digital Marketing',
      badge: 'All-In-One',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#080d19] relative border-t border-slate-800/80">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-lime-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/60 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <span>Full-Stack Digital Growth</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-400">Services</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Everything your business needs to establish authority, outrank competitors, and convert local inquiries into paying clients.
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigate('/contact?purpose=Website%20Design%20%26%20Development')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              <span>Explore Custom Quotation</span>
              <ExternalLink className="w-3.5 h-3.5 text-lime-400" />
            </button>
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                id={srv.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c1426]/90 p-6 border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Number, Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-lime-500 group-hover:text-white transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-lime-400 border border-slate-700">
                        {srv.badge}
                      </span>
                      <span className="text-sm font-mono font-bold text-slate-400">
                        {srv.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mb-3">
                    {srv.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Direct CTA button to /contact?purpose=SERVICE_NAME */}
                <button
                  id={`cta-${srv.id}`}
                  onClick={() => onNavigate(`/contact?purpose=${encodeURIComponent(srv.purpose)}`)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-slate-800/80 group-hover:bg-blue-600 text-slate-200 group-hover:text-white border border-slate-700 group-hover:border-blue-500 transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
