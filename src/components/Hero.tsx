import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Zap, 
  Award,
  Globe,
  ArrowUpRight
} from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-radial-gradient">
      {/* Subtle background tech glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-lime-500/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-lime-400"></span>
              <span className="text-blue-400">Your Business</span>
              <span className="text-slate-500">|</span>
              <span className="text-lime-400">Our Technology</span>
              <span className="text-slate-500">|</span>
              <span className="text-yellow-400">More Growth</span>
            </div>

            {/* Main Hindi Heading as in Banner */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              अब आपके <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-300">Business</span> की <br className="hidden sm:inline" />
              Online Presence होगी <span className="relative inline-block text-lime-400">Strong!</span>
            </h1>

            {/* Supporting Hindi Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              हम बनाते हैं <strong className="text-white font-semibold">Professional Website</strong> और <strong className="text-white font-semibold">Google Business Profile</strong>, जिससे आपके ग्राहक आपको आसानी से ढूंढ सकें!
            </p>

            {/* Main Concept Highlight */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-blue-500/20 backdrop-blur-sm max-w-xl mx-auto lg:mx-0 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold text-slate-200">
              <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>WEBSITE + GOOGLE PROFILE + DIGITAL MARKETING = YOUR BUSINESS GROWTH</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-free-demo-cta"
                onClick={() => onNavigate('/contact?purpose=Free%20Demo%20Website')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-lime-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>GET FREE DEMO</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                id="hero-whatsapp-cta"
                href="https://wa.me/919457690255?text=Hello%20Grofasto%2C%20I%20want%20a%20free%20demo%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-slate-800/90 hover:bg-slate-700/90 text-white border border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-black/30 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  SEO Friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Secure & Fast
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Mobile Responsive
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Better Conversions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Trusted Service
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Original Digital Business Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Board */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-[#0c1527]/95 p-5 border border-slate-700/80 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
                
                {/* Header bar of visual mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-[11px] font-mono text-slate-400">grofasto.com/client-growth</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lime-500/20 text-lime-300 border border-lime-500/40">
                    LIVE PREVIEW
                  </span>
                </div>

                {/* Simulated Business Showcase with Laptop & Mobile */}
                <div className="space-y-3">
                  
                  {/* Digital Presence Card */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-blue-500/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500 flex items-center justify-center text-blue-400">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Modern Business Portal</h4>
                          <p className="text-[11px] text-slate-400">High-speed React &amp; PHP Core</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <TrendingUp className="w-3 h-3" /> +280% Leads
                      </span>
                    </div>

                    {/* Miniature Growth Metric Bar */}
                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" /> Meerut &amp; Pan-India
                      </span>
                      <span className="text-blue-400 font-semibold">99.9% Uptime</span>
                    </div>
                  </div>

                  {/* Google Profile Concept Card */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900/90 border border-slate-700/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center font-bold text-xs text-blue-600">
                          G
                        </div>
                        <span className="text-xs font-bold text-white">Google Business Profile</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/40">
                        #1 Local Rank
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>Customer Reviews &amp; Maps Routing</span>
                      <span className="text-yellow-400 font-bold">★★★★★ 4.9</span>
                    </div>
                  </div>

                  {/* Devices & Marketing Concept Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
                      <Laptop className="w-5 h-5 text-sky-400 mb-1" />
                      <span className="text-[11px] font-semibold text-slate-200">Desktop Optimized</span>
                      <span className="text-[9px] text-slate-400">Fluid Retina Displays</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
                      <Smartphone className="w-5 h-5 text-lime-400 mb-1" />
                      <span className="text-[11px] font-semibold text-slate-200">Mobile First</span>
                      <span className="text-[9px] text-slate-400">Instant WhatsApp / Calls</span>
                    </div>
                  </div>

                </div>

                {/* Floating Micro Badge 1: Verification */}
                <div className="absolute -bottom-4 -left-4 p-2.5 rounded-xl bg-[#0b1424] border border-lime-500/50 shadow-xl flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-white">Verified Setup</span>
                    <span className="block text-[9px] text-slate-400">Ready in 48 Hours</span>
                  </div>
                </div>

                {/* Floating Micro Badge 2: Lead Engine */}
                <div className="absolute -top-3 -right-3 p-2.5 rounded-xl bg-[#0b1424] border border-blue-500/50 shadow-xl flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-white">Local SEO</span>
                    <span className="block text-[9px] text-lime-400">Google Map Top-3</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
