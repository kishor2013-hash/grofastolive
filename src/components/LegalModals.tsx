import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="rounded-2xl bg-[#0a1020] border border-slate-700 max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-blue-400" />
            ) : (
              <FileText className="w-5 h-5 text-lime-400" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p>
              Grofasto Digital Solution (&quot;Grofasto&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), operating in Meerut, Uttar Pradesh, India, is committed to safeguarding the privacy and confidentiality of our website visitors and clients.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">1. Information We Collect</h4>
            <p>
              When you fill out our contact or demo request form, we collect your full name, 10-digit mobile number, business name, optional email, business category, service requirements, and marketing source parameters (such as UTM attributes and GCLID).
            </p>
            <h4 className="text-sm font-bold text-white pt-2">2. How We Use Your Information</h4>
            <p>
              Your contact details are solely used to prepare custom demo websites, discuss quotes via phone or WhatsApp, setup Google Business Profiles, and configure digital marketing campaigns. We never sell, rent, or distribute your personal details to third-party telemarketers.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">3. Data Security</h4>
            <p>
              All customer submissions are stored with secure parameters and password-protected administrative interfaces. For inquiries regarding your records, contact us at info.grofasto@gmail.com or +91 9457690255.
            </p>
          </div>
        ) : (
          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p>
              By accessing www.grofasto.com or ordering web design, Google Business Profile optimization, or digital advertising services from Grofasto Digital Solution, you agree to these Terms.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">1. Scope of Services</h4>
            <p>
              Grofasto delivers professional website design, shared hosting deployment, Google Maps verification assistance, SEO architecture, and paid digital ads management. Specific deliverables and turnaround times are mutually agreed upon prior to project kickoff.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">2. Demo Websites</h4>
            <p>
              Our &quot;Free Demo Website&quot; initiative allows prospective customers to preview customized layout structures and responsive designs before contracting. Final ownership and source code transfer occur upon formal agreement.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">3. Transparency &amp; Rankings</h4>
            <p>
              We apply white-hat local SEO practices, accurate Google schema markup, and high-quality landing page architecture. We do not make false claims, guarantee fixed algorithmic positions, or employ manipulative tactics.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
