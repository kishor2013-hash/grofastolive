import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  Building,
  Target,
  Mail,
  User,
  AlertCircle
} from 'lucide-react';
import { BusinessType, PurposeRequirement } from '../types';
import { saveLead } from '../data/mockAndStorage';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  initialPurpose?: string;
}

const BUSINESS_TYPES: BusinessType[] = [
  'School',
  'Doctor',
  'Clinic',
  'Hospital',
  'Shop / Retail',
  'Restaurant',
  'Hotel',
  'Real Estate',
  'NGO',
  'Business / Service',
  'Professional',
  'Other',
];

const PURPOSE_OPTIONS: PurposeRequirement[] = [
  'Website Design & Development',
  'School Website',
  'Doctor Website',
  'Hospital Website',
  'Google Business Profile',
  'Google Maps Promotion',
  'Local SEO',
  'Google Ranking',
  'Google Ads',
  'Meta Ads',
  'Facebook Ads',
  'Instagram Marketing',
  'Social Media Marketing',
  'Branding',
  'Domain & Hosting',
  'App Development',
  'Digital Marketing',
  'Website + Google Profile',
  'Free Demo Website',
  'Retail Business',
  'Business Website',
  'Free Demo',
  'Other',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, initialPurpose }) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('Business / Service');
  const [purpose, setPurpose] = useState<PurposeRequirement>('Free Demo Website');
  const [message, setMessage] = useState('');

  // Anti-spam honeypot and timing check
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState<number>(Date.now());

  // UTM tracking parameters
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    landing_page: '',
    referrer: '',
  });

  // Validation & status
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize and parse query parameters from window.location
  useEffect(() => {
    setFormRenderTime(Date.now());
    
    // Read URL search params
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);

    // Purpose parameter handling (URL PURPOSE AUTO-SELECTION)
    const urlPurpose = urlParams.get('purpose') || initialPurpose;
    if (urlPurpose) {
      const decoded = decodeURIComponent(urlPurpose).trim();
      // Match case-insensitively or exact match
      const matched = PURPOSE_OPTIONS.find(
        (p) => p.toLowerCase() === decoded.toLowerCase()
      );
      if (matched) {
        setPurpose(matched);
      } else {
        // Find partial match (e.g., "Google Ads" or "School")
        const partial = PURPOSE_OPTIONS.find((p) =>
          p.toLowerCase().includes(decoded.toLowerCase())
        );
        if (partial) setPurpose(partial);
      }
    }

    // Capture marketing tracking parameters
    setUtmParams({
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || '',
      gclid: urlParams.get('gclid') || '',
      landing_page: window.location.href,
      referrer: document.referrer || '',
    });
  }, [initialPurpose]);

  // Validation function: 10-digit Indian Mobile Number
  const validateIndianMobile = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, '');
    // Indian standard 10 digit starting with 6, 7, 8, 9
    const regex = /^[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot spam check
    if (honeypot.trim() !== '') {
      console.warn('Spam detected via honeypot');
      return;
    }

    // Submission timing check (avoid bots submitting in < 1 second)
    const elapsedSeconds = (Date.now() - formRenderTime) / 1000;
    if (elapsedSeconds < 1.2) {
      setErrorMessage('Please wait a moment before submitting.');
      return;
    }

    // Required fields check
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanedMobile = mobile.replace(/\D/g, '');
    if (!validateIndianMobile(cleanedMobile)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
      return;
    }

    if (!businessName.trim()) {
      setErrorMessage('Please enter your business or organization name.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Store lead into database storage
      saveLead({
        full_name: fullName.trim(),
        mobile: cleanedMobile,
        business_name: businessName.trim(),
        email: email.trim(),
        business_type: businessType,
        purpose: purpose,
        message: message.trim(),
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
        gclid: utmParams.gclid,
        landing_page: utmParams.landing_page || window.location.href,
        referrer: utmParams.referrer,
      });

      // GOOGLE ADS CONVERSION TRACKING HOOK (PLACEHOLDER)
      // NOTE: Insert your real Google Ads Conversion event snippet below:
      // window.gtag && window.gtag('event', 'conversion', {
      //   'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYY',
      //   'event_callback': function() { /* ... */ }
      // });
      console.log('Lead submitted successfully. Google Ads Conversion Trigger Ready.');

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Something went wrong while submitting. Please call us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] py-12 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      {/* Back button & top navigation breadcrumb */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919457690255"
            className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 9457690255</span>
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        
        {/* Main Content Box */}
        <div className="rounded-3xl bg-[#0a1020]/95 border border-slate-800 p-6 sm:p-10 shadow-2xl shadow-black/60 backdrop-blur-xl">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Official Inquiry &amp; Demo Request</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-300">Business Online</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Get Your Free Demo Website Today
            </p>

            {purpose && (
              <div className="inline-block mt-2 px-3.5 py-1 rounded-lg bg-blue-900/40 border border-blue-500/30 text-xs font-semibold text-blue-300">
                Selected Requirement: <span className="text-white font-bold">{purpose}</span>
              </div>
            )}
          </div>

          {/* Inline Success Section - NO POPUP */}
          {isSubmitted ? (
            <div 
              id="lead-submission-success"
              className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#071322] border border-emerald-500/40 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Thank You!
                </h2>
                <p className="text-lime-400 font-semibold text-base sm:text-lg">
                  Your request has been received successfully.
                </p>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Our digital marketing and web team in Meerut will review your business requirements and contact you shortly.
                </p>
              </div>

              {/* Action Buttons in Success View */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
                <a
                  id="success-whatsapp-cta"
                  href={`https://wa.me/919457690255?text=${encodeURIComponent(`Hello Grofasto, I just submitted an inquiry for ${businessName || 'my business'} regarding ${purpose}. Please connect with me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>

                <a
                  id="success-call-cta"
                  href="tel:+919457690255"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-lime-400" />
                  <span>CALL NOW</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setMobile('');
                    setBusinessName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Lead Capture Form */
            <form id="grofasto-contact-form" onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Box */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Anti-spam Honeypot (hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url_check">Leave this field blank</label>
                <input
                  type="text"
                  id="website_url_check"
                  name="website_url_check"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact_full_name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    FULL NAME <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="contact_full_name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_mobile" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    MOBILE NUMBER <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      id="contact_mobile"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-12 pr-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">10-digit Indian WhatsApp / Calling number</span>
                </div>
              </div>

              {/* Business Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact_business_name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    BUSINESS NAME <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="contact_business_name"
                      required
                      placeholder="e.g. Apex Hospital / Sharma Store"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    EMAIL ADDRESS <span className="text-slate-400 text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="contact_email"
                      placeholder="e.g. info@yourbusiness.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Business Type & Purpose (Auto-selected from URL) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact_business_type" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    BUSINESS TYPE <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="contact_business_type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                    className="w-full px-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt} className="bg-slate-900 text-white">
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact_purpose" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>PURPOSE / REQUIREMENT <span className="text-red-400">*</span></span>
                    <span className="text-[10px] text-lime-400 font-normal">URL Auto-Synced</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact_purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as PurposeRequirement)}
                      className="w-full px-3 py-3 rounded-xl bg-slate-900/90 border border-blue-500/50 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold cursor-pointer"
                    >
                      {PURPOSE_OPTIONS.map((po) => (
                        <option key={po} value={po} className="bg-slate-900 text-white">
                          {po}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message / Requirement notes */}
              <div>
                <label htmlFor="contact_message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  MESSAGE / SPECIFIC REQUIREMENTS <span className="text-slate-400 text-[10px]">(Optional)</span>
                </label>
                <textarea
                  id="contact_message"
                  rows={3}
                  placeholder="Tell us what you would like to include in your demo website or marketing campaign..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                ></textarea>
              </div>

              {/* Marketing tracking indicator if UTM present */}
              {utmParams.utm_source && (
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                  <span>Tracking: {utmParams.utm_source} / {utmParams.utm_campaign || 'direct'}</span>
                  {utmParams.gclid && <span className="text-lime-400">GCLID Captured</span>}
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT REQUEST</span>
                  </>
                )}
              </button>

              {/* Trust & Privacy Notice */}
              <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Your information is 100% private. We never share your phone number or spam.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
