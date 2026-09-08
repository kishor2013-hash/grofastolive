import React from 'react';
import { 
  GraduationCap, 
  Stethoscope, 
  Building2, 
  ShoppingBag, 
  Briefcase, 
  Layers, 
  ArrowRight,
  Check
} from 'lucide-react';

interface IndustriesProps {
  onNavigate: (path: string) => void;
}

interface IndustryItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  accentColor: string;
  features: string[];
  ctaText: string;
  purposeUrl: string;
  tagline: string;
}

export const Industries: React.FC<IndustriesProps> = ({ onNavigate }) => {
  const industries: IndustryItem[] = [
    {
      id: 'ind-schools',
      title: 'SCHOOLS',
      category: 'Education & Academics',
      icon: GraduationCap,
      accentColor: 'from-blue-600 to-sky-400',
      tagline: 'Admission | Updates | Online Reputation',
      features: [
        'Online admission inquiry form',
        'Notice board & event gallery',
        'CBSE / ICSE compliance ready',
        'Google Profile with parent reviews'
      ],
      ctaText: 'GET SCHOOL WEBSITE',
      purposeUrl: '/contact?purpose=School%20Website',
    },
    {
      id: 'ind-doctors',
      title: 'DOCTORS & CLINICS',
      category: 'Healthcare Practitioners',
      icon: Stethoscope,
      accentColor: 'from-emerald-500 to-teal-400',
      tagline: 'Appointments | Patient Trust | Google Profile',
      features: [
        'Direct WhatsApp appointment booking',
        'OPD clinic timings & specialization',
        'Patient reviews & trust credentials',
        'Google Maps location direction'
      ],
      ctaText: 'GET DOCTOR WEBSITE',
      purposeUrl: '/contact?purpose=Doctor%20Website',
    },
    {
      id: 'ind-hospitals',
      title: 'HOSPITALS',
      category: 'Medical Centers',
      icon: Building2,
      accentColor: 'from-blue-600 to-indigo-500',
      tagline: 'Services | Timings | Ratings | Emergency Info',
      features: [
        '24x7 emergency hotline button',
        'Doctor roster & department listings',
        'Cashless TPA & insurance details',
        'Local SEO ranking for city patients'
      ],
      ctaText: 'GET HOSPITAL WEBSITE',
      purposeUrl: '/contact?purpose=Hospital%20Website',
    },
    {
      id: 'ind-retail',
      title: 'SHOPS & RETAIL',
      category: 'Local Commerce',
      icon: ShoppingBag,
      accentColor: 'from-amber-500 to-yellow-400',
      tagline: 'Products | Offers | Local Search | More Walk-ins',
      features: [
        'Digital product & catalog showcase',
        'Festival offers & discount banners',
        '"Near me" Google Maps optimization',
        'Click-to-call & WhatsApp order inquiry'
      ],
      ctaText: 'GROW MY SHOP',
      purposeUrl: '/contact?purpose=Retail%20Business',
    },
    {
      id: 'ind-business',
      title: 'BUSINESSES & SERVICES',
      category: 'Corporate & B2B',
      icon: Briefcase,
      accentColor: 'from-lime-500 to-emerald-400',
      tagline: 'Branding | Leads | Online Growth | Website + Google Profile',
      features: [
        'High-converting lead capture form',
        'Custom domain & business emails',
        'B2B service portfolio & case studies',
        'Google Ads & Meta Ads landing page'
      ],
      ctaText: 'GROW MY BUSINESS',
      purposeUrl: '/contact?purpose=Business%20Website',
    },
    {
      id: 'ind-more',
      title: 'AND MORE...',
      category: 'Tailored Solutions',
      icon: Layers,
      accentColor: 'from-purple-500 to-blue-500',
      tagline: 'Restaurants | Hotels | Real Estate | NGOs | Professionals & More',
      features: [
        'Custom interactive features',
        'Property & menu visual galleries',
        'Donation & volunteer registration',
        'Professional portfolio & branding'
      ],
      ctaText: 'GET FREE DEMO',
      purposeUrl: '/contact?purpose=Free%20Demo',
    },
  ];

  return (
    <section id="industries" className="py-20 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span>Targeted Industry Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-400">Who We Serve</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every business has unique customer needs. We craft specialized digital platforms and verified Google profiles designed to attract your specific local audience.
          </p>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                id={ind.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0b1324]/90 p-6 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.accentColor} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {ind.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {ind.title}
                  </h3>
                  <div className="text-xs font-semibold text-lime-400/90 mb-4 tracking-wide">
                    {ind.tagline}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-300">
                    {ind.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct CTA button to /contact?purpose=... */}
                <button
                  id={`cta-${ind.id}`}
                  onClick={() => onNavigate(ind.purposeUrl)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-slate-800/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-lime-600 text-white border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-600/20 cursor-pointer"
                >
                  <span>{ind.ctaText}</span>
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
