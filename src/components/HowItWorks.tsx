import React from 'react';
import { MessageSquareText, MonitorPlay, ThumbsUp, Rocket, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onNavigate: (path: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Tell Us Your Requirement',
      description: 'Fill out our quick 1-minute inquiry form or connect on WhatsApp. Share your business name, domain preference, and service goals.',
      icon: MessageSquareText,
      color: 'from-blue-600 to-sky-400',
    },
    {
      step: '02',
      title: 'We Create Your Demo',
      description: 'Our engineering team crafts a live, high-speed mobile-responsive demo website with sample sections tailored specifically to your trade.',
      icon: MonitorPlay,
      color: 'from-sky-500 to-teal-400',
    },
    {
      step: '03',
      title: 'You Review & Approve',
      description: 'Test the demo directly on your smartphone. Experience the speed, WhatsApp buttons, and layout before making any financial commitment.',
      icon: ThumbsUp,
      color: 'from-emerald-500 to-lime-400',
    },
    {
      step: '04',
      title: 'Go Live & Grow Online',
      description: 'We connect your custom domain, setup your official Google Business Profile, enable Local SEO, and initiate high-conversion ad campaigns.',
      icon: Rocket,
      color: 'from-lime-400 to-yellow-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-400">Works</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Zero complicated jargon. A streamlined, transparent workflow built for busy business owners.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                id={`step-${item.step}`}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0b1324]/90 p-6 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number with Gradient Accent */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-lime-400">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 group-hover:text-lime-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Micro progress indicator */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase">
                  <span>Phase {index + 1} of 4</span>
                  <span className="text-lime-400">100% Transparent</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below steps */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('/contact?purpose=Free%20Demo%20Website')}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Step 01: Request Free Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
