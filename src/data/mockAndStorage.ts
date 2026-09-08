import { Lead, LeadStatus, AdminStats } from '../types';

const STORAGE_KEY = 'grofasto_leads_store';
const ADMIN_SESSION_KEY = 'grofasto_admin_session';

const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: 101,
    full_name: 'Dr. Rajesh Sharma',
    mobile: '9897123450',
    business_name: 'Sharma Multispeciality Clinic',
    email: 'drsharma@example.com',
    business_type: 'Clinic',
    purpose: 'Doctor Website',
    message: 'We need appointment booking and Google Business profile optimization in Meerut.',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'doctor_website_lead',
    utm_term: 'doctor website design meerut',
    utm_content: 'ad_variant_a',
    gclid: 'Cj0KCQjw1234GrofastoSampleGclid_Doc',
    landing_page: 'https://www.grofasto.com/contact?purpose=Doctor%20Website',
    referrer: 'https://www.google.com/',
    status: 'New',
    created_at: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: 102,
    full_name: 'Suresh Singhal',
    mobile: '9412345678',
    business_name: 'Singhal Global Public School',
    email: 'admissions@singhalschool.edu.in',
    business_type: 'School',
    purpose: 'School Website',
    message: 'Need online admission portal, fee structure notice board, and local ranking.',
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'school_admission_2026',
    landing_page: 'https://www.grofasto.com/contact?purpose=School%20Website',
    referrer: 'https://facebook.com',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
  },
  {
    id: 103,
    full_name: 'Amit Bansal',
    mobile: '9837098765',
    business_name: 'Bansal Electronics & Appliances',
    email: 'bansalelectronics@gmail.com',
    business_type: 'Shop / Retail',
    purpose: 'Google Maps Promotion',
    message: 'Want to appear #1 on Google Maps when customers search electronics shop near me.',
    utm_source: 'google',
    utm_medium: 'organic',
    utm_campaign: 'local_seo',
    landing_page: 'https://www.grofasto.com/contact?purpose=Google%20Maps%20Promotion',
    referrer: 'https://www.grofasto.com/',
    status: 'Follow-up',
    created_at: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
  }
];

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
      return INITIAL_SAMPLE_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_LEADS;
  } catch {
    return INITIAL_SAMPLE_LEADS;
  }
}

export function saveLead(newLead: Omit<Lead, 'id' | 'created_at' | 'status'>): Lead {
  const current = getStoredLeads();
  const nextId = current.length > 0 ? Math.max(...current.map((l) => l.id)) + 1 : 101;
  const lead: Lead = {
    ...newLead,
    id: nextId,
    status: 'New',
    created_at: new Date().toISOString(),
  };
  const updated = [lead, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save lead to localStorage', e);
  }
  return lead;
}

export function updateLeadStatus(id: number, status: LeadStatus): boolean {
  const current = getStoredLeads();
  const index = current.findIndex((l) => l.id === id);
  if (index === -1) return false;
  current[index].status = status;
  current[index].updated_at = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch {
    return false;
  }
}

export function deleteLead(id: number): boolean {
  const current = getStoredLeads();
  const filtered = current.filter((l) => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function calculateAdminStats(leads: Lead[]): AdminStats {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  return {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    followUp: leads.filter((l) => l.status === 'Follow-up').length,
    converted: leads.filter((l) => l.status === 'Converted').length,
    closed: leads.filter((l) => l.status === 'Closed' || l.status === 'Not Interested').length,
    todayLeads: leads.filter((l) => l.created_at.startsWith(todayStr)).length,
  };
}

export function checkAdminAuth(): boolean {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function setAdminAuth(authenticated: boolean): void {
  try {
    if (authenticated) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    console.error('Error saving admin auth', e);
  }
}
