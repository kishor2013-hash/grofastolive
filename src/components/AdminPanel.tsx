import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  LogOut, 
  Search, 
  Filter, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Eye, 
  Download, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  X,
  FileCode,
  Check
} from 'lucide-react';
import { Lead, LeadStatus, BusinessType, PurposeRequirement, AdminStats } from '../types';
import { 
  getStoredLeads, 
  updateLeadStatus, 
  deleteLead, 
  calculateAdminStats, 
  checkAdminAuth, 
  setAdminAuth 
} from '../data/mockAndStorage';
import { downloadHostingerZip } from '../utils/hostingerBundle';

interface AdminPanelProps {
  onNavigate: (path: string) => void;
}

const ALL_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed'];

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Leads and filter states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    newLeads: 0,
    contacted: 0,
    followUp: 0,
    converted: 0,
    closed: 0,
    todayLeads: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [purposeFilter, setPurposeFilter] = useState<string>('All');

  // Selected lead for detail view
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Check existing session
  useEffect(() => {
    const authed = checkAdminAuth();
    setIsAuthenticated(authed);
    if (authed) {
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    const data = getStoredLeads();
    // Newest first
    const sorted = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setLeads(sorted);
    setStats(calculateAdminStats(sorted));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Verification check for admin and password
    // Password requested by user: Grof@stoAdmin#2026
    if (loginUsername === 'admin' && loginPassword === 'Grof@stoAdmin#2026') {
      setAdminAuth(true);
      setIsAuthenticated(true);
      loadLeads();
    } else {
      setLoginError('Invalid username or password. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setIsAuthenticated(false);
    setLoginPassword('');
  };

  const handleStatusChange = (id: number, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus);
    loadLeads();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (id: number) => {
    deleteLead(id);
    loadLeads();
    setShowDeleteConfirm(null);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }
  };

  const handleExportZip = async () => {
    setIsDownloadingZip(true);
    try {
      await downloadHostingerZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating deployment zip', err);
      alert('Failed to generate zip. Files are accessible in workspace repository.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      l.full_name.toLowerCase().includes(q) ||
      l.mobile.toLowerCase().includes(q) ||
      l.business_name.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchType = typeFilter === 'All' || l.business_type === typeFilter;
    const matchPurpose = purposeFilter === 'All' || l.purpose === purposeFilter;

    return matchQuery && matchStatus && matchType && matchPurpose;
  });

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] py-16 px-4 flex items-center justify-center bg-radial-gradient">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>Secure Authentication</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grofasto Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Lead Management &amp; System Configuration
            </p>
          </div>

          <div className="rounded-2xl bg-[#0a1020]/95 border border-slate-800 p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Default User:</span>
                  <span className="font-mono text-slate-300">admin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Initial Password:</span>
                  <span className="font-mono text-lime-400">Grof@stoAdmin#2026</span>
                </div>
              </div>

              <button
                type="submit"
                id="admin-login-submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => onNavigate('/')}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                &larr; Return to Grofasto Public Website
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 pb-16">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0a1020]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">
            GF
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
              <span>GROFASTO ADMIN</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-lime-500/20 text-lime-400 border border-lime-500/30">
                ACTIVE
              </span>
            </h1>
            <span className="text-[10px] text-slate-400">Lead CRM &amp; Hostinger Exporter</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download Hostinger Package Button */}
          <button
            id="admin-download-hostinger-btn"
            onClick={handleExportZip}
            disabled={isDownloadingZip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 shadow-sm transition-all cursor-pointer"
            title="Download complete PHP + MySQL project ready for Hostinger public_html"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-lime-400" />
                <span className="hidden sm:inline">Downloaded ZIP!</span>
              </>
            ) : isDownloadingZip ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-lime-400" />
                <span className="hidden sm:inline">Packaging ZIP...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-lime-400" />
                <span className="hidden sm:inline">Download Hostinger ZIP</span>
                <span className="sm:hidden">ZIP</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700/60 transition-colors cursor-pointer"
          >
            View Site
          </button>

          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:text-red-200 bg-red-950/40 border border-red-500/30 transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          
          <div className="p-4 rounded-2xl bg-[#0a1020] border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL LEADS</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{stats.total}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-blue-500/40">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">NEW LEADS</span>
            <span className="text-2xl font-extrabold text-blue-400 mt-1 block">{stats.newLeads}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-yellow-500/40">
            <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider block">CONTACTED</span>
            <span className="text-2xl font-extrabold text-yellow-400 mt-1 block">{stats.contacted}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-sky-500/40">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">FOLLOW-UP</span>
            <span className="text-2xl font-extrabold text-sky-400 mt-1 block">{stats.followUp}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-emerald-500/40">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">CONVERTED</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{stats.converted}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">CLOSED</span>
            <span className="text-2xl font-extrabold text-slate-400 mt-1 block">{stats.closed}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1020] border border-lime-500/40 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider block">TODAY'S LEADS</span>
            <span className="text-2xl font-extrabold text-lime-400 mt-1 block">{stats.todayLeads}</span>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-3">
          <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search name, mobile, business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {ALL_STATUSES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {/* Reset filter button */}
              {(searchQuery || statusFilter !== 'All' || typeFilter !== 'All' || purposeFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                    setTypeFilter('All');
                    setPurposeFilter('All');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Clear Filters
                </button>
              )}

              <button
                onClick={loadLeads}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
                title="Refresh leads"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-2xl bg-[#0a1020] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">NAME</th>
                  <th className="py-3 px-4">MOBILE</th>
                  <th className="py-3 px-4">BUSINESS</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">PURPOSE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-500">
                      No leads match your current criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusColors: Record<LeadStatus, string> = {
                      New: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                      Contacted: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
                      'Follow-up': 'bg-sky-500/20 text-sky-300 border-sky-500/40',
                      Converted: 'bg-emerald-500/20 text-lime-300 border-emerald-500/40',
                      'Not Interested': 'bg-slate-800 text-slate-400 border-slate-700',
                      Closed: 'bg-slate-800 text-slate-400 border-slate-700',
                    };

                    const formattedDate = new Date(lead.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    });

                    return (
                      <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                          #{lead.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          {lead.full_name}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-lime-400">
                          <a href={`tel:+91${lead.mobile}`} className="hover:underline">
                            +91 {lead.mobile}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-slate-200">
                          {lead.business_name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {lead.business_type}
                        </td>
                        <td className="py-3.5 px-4 text-blue-300 font-medium">
                          {lead.purpose}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer bg-slate-900 ${
                              statusColors[lead.status] || 'text-white'
                            }`}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st} className="bg-slate-900 text-white">
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {formattedDate}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900 text-blue-300 border border-blue-500/30"
                              title="View full lead info & UTM"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(`Hello ${lead.full_name}, thank you for contacting Grofasto Digital Solution regarding ${lead.purpose}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30"
                              title="Message on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => setShowDeleteConfirm(lead.id)}
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30"
                              title="Delete lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hostinger Shared Hosting Deployment Box */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0d1c38] via-[#09152b] to-[#0d1c38] border border-blue-500/40 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 uppercase">
                <FileCode className="w-4 h-4" />
                <span>Hostinger Shared Hosting Package Ready</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Download Complete PHP 8+ &amp; MySQL Project Files
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                The full project with <code className="text-lime-300 font-mono">index.php</code>, <code className="text-lime-300 font-mono">contact.php</code>, <code className="text-lime-300 font-mono">database.sql</code>, <code className="text-lime-300 font-mono">.htaccess</code>, clean URLs, and admin panel is packaged. Upload directly to Hostinger's <code className="text-white font-mono">public_html</code>.
              </p>
            </div>

            <button
              onClick={handleExportZip}
              disabled={isDownloadingZip}
              className="px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 via-blue-500 to-lime-500 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Hostinger .ZIP</span>
            </button>
          </div>
        </div>

      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0a1020] border border-slate-700 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400">LEAD ID #{selectedLead.id}</span>
                <h3 className="text-xl font-bold text-white">{selectedLead.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Mobile</span>
                <a href={`tel:+91${selectedLead.mobile}`} className="text-lime-400 font-mono font-bold hover:underline">
                  +91 {selectedLead.mobile}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Business Name</span>
                <span className="text-white font-bold">{selectedLead.business_name}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                <span className="text-slate-300 font-mono">{selectedLead.email || 'None Provided'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Business Type</span>
                <span className="text-blue-300">{selectedLead.business_type}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Purpose / Requirement</span>
                <span className="text-yellow-400 font-semibold">{selectedLead.purpose}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Status</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="mt-1 bg-slate-800 text-white rounded px-2 py-0.5 text-xs font-bold border border-slate-700"
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            {selectedLead.message && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Customer Message</span>
                <p className="text-slate-200 leading-relaxed">{selectedLead.message}</p>
              </div>
            )}

            {/* Marketing & Tracking Information */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Marketing &amp; Campaign Attribution (Google Ads / UTM)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                <div><span className="text-slate-500">UTM Source:</span> <span className="text-slate-200">{selectedLead.utm_source || 'direct'}</span></div>
                <div><span className="text-slate-500">UTM Medium:</span> <span className="text-slate-200">{selectedLead.utm_medium || 'none'}</span></div>
                <div><span className="text-slate-500">UTM Campaign:</span> <span className="text-slate-200">{selectedLead.utm_campaign || 'none'}</span></div>
                <div><span className="text-slate-500">UTM Term:</span> <span className="text-slate-200">{selectedLead.utm_term || 'none'}</span></div>
                <div><span className="text-slate-500">UTM Content:</span> <span className="text-slate-200">{selectedLead.utm_content || 'none'}</span></div>
                <div><span className="text-slate-500">GCLID:</span> <span className="text-lime-400 break-all">{selectedLead.gclid || 'none'}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex flex-col gap-1 font-mono">
                <div><strong className="text-slate-500">Landing Page:</strong> <span className="break-all">{selectedLead.landing_page}</span></div>
                <div><strong className="text-slate-500">Referrer:</strong> <span className="break-all">{selectedLead.referrer || 'direct'}</span></div>
                <div><strong className="text-slate-500">Received Timestamp:</strong> {new Date(selectedLead.created_at).toLocaleString()}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+91${selectedLead.mobile}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-lime-400" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/91${selectedLead.mobile}?text=${encodeURIComponent(`Hello ${selectedLead.full_name}, this is Grofasto Digital Solution regarding your inquiry for ${selectedLead.purpose}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 max-w-sm w-full text-center space-y-4">
            <h4 className="text-base font-bold text-white">Delete Lead #{showDeleteConfirm}?</h4>
            <p className="text-xs text-slate-400">This lead will be permanently removed from your records.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(showDeleteConfirm)}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
