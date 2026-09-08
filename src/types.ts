export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Not Interested' | 'Closed';

export type BusinessType =
  | 'School'
  | 'Doctor'
  | 'Clinic'
  | 'Hospital'
  | 'Shop / Retail'
  | 'Restaurant'
  | 'Hotel'
  | 'Real Estate'
  | 'NGO'
  | 'Business / Service'
  | 'Professional'
  | 'Other';

export type PurposeRequirement =
  | 'Website Design & Development'
  | 'School Website'
  | 'Doctor Website'
  | 'Hospital Website'
  | 'Google Business Profile'
  | 'Google Maps Promotion'
  | 'Local SEO'
  | 'Google Ranking'
  | 'Google Ads'
  | 'Meta Ads'
  | 'Facebook Ads'
  | 'Instagram Marketing'
  | 'Social Media Marketing'
  | 'Branding'
  | 'Domain & Hosting'
  | 'App Development'
  | 'Digital Marketing'
  | 'Website + Google Profile'
  | 'Free Demo Website'
  | 'Retail Business'
  | 'Business Website'
  | 'Free Demo'
  | 'Other';

export interface Lead {
  id: number;
  full_name: string;
  mobile: string;
  business_name: string;
  email: string;
  business_type: BusinessType | string;
  purpose: PurposeRequirement | string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page: string;
  referrer: string;
  status: LeadStatus;
  created_at: string;
  updated_at?: string;
}

export interface AdminStats {
  total: number;
  newLeads: number;
  contacted: number;
  followUp: number;
  converted: number;
  closed: number;
  todayLeads: number;
}
