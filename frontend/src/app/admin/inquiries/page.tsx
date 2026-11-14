'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LogOut, RefreshCw, Mail, Phone, Globe, Briefcase,
  Calendar, CheckCircle2, Clock, AlertCircle, Search,
  ChevronDown, Users, TrendingUp, Inbox, X
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  country?: string;
  status: 'NEW' | 'CONTACTED' | 'RESOLVED';
  createdAt: string;
}

const STATUS_CONFIG = {
  NEW: { label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Inbox },
  CONTACTED: { label: 'Contacted', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  RESOLVED: { label: 'Resolved', color: 'bg-emerald-100 text-[#2DC55F] border-emerald-200', icon: CheckCircle2 },
};

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getToken = useCallback(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('smartax_admin_token');
  }, []);

  const fetchInquiries = useCallback(async () => {
    const token = getToken();
    if (!token) { router.push('/admin/login'); return; }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { router.push('/admin/login'); return; }
      if (!res.ok) throw new Error('Failed to load inquiries');
      setInquiries(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, router]);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/admin/login'); return; }
    setAdminEmail(localStorage.getItem('smartax_admin_email') || '');
    fetchInquiries();
  }, [fetchInquiries, getToken, router]);

  const updateStatus = async (id: string, status: string) => {
    const token = getToken();
    if (!token) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:4000/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      if (selected?.id === id) setSelected(updated);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('smartax_admin_token');
    localStorage.removeItem('smartax_admin_email');
    router.push('/admin/login');
  };

  // Stats
  const total = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'NEW').length;
  const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
  const resolvedCount = inquiries.filter((i) => i.status === 'RESOLVED').length;

  // Filtered
  const filtered = inquiries.filter((i) => {
    const matchStatus = filterStatus === 'ALL' || i.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      (i.country || '').toLowerCase().includes(q) ||
      (i.service || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="bg-[#0c1a2e] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg p-0.5 flex items-center justify-center shrink-0">
              <Image src="/logo-icon.jpg" alt="SMARTax" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <span className="text-white font-black text-lg">SMARTax <span className="text-[#2DC55F]">Global</span></span>
              <span className="text-slate-400 text-xs ml-3">Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-xs hidden sm:block">{adminEmail}</span>
            <button
              onClick={fetchInquiries}
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#0c1a2e]">Consultation Inquiries</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and respond to all client consultation requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: total, icon: Users, color: 'text-slate-700', bg: 'bg-slate-100' },
            { label: 'New', value: newCount, icon: Inbox, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Contacted', value: contactedCount, icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
            { label: 'Resolved', value: resolvedCount, icon: TrendingUp, color: 'text-[#2DC55F]', bg: 'bg-emerald-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
              <div className={`${bg} p-2.5 rounded-lg`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0c1a2e]">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, country, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 focus:border-[#2DC55F]"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Status</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
            <button onClick={fetchInquiries} className="ml-auto text-xs underline">Retry</button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              <span>Loading inquiries...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Inbox className="w-10 h-10 mb-3" />
              <p className="font-medium">No inquiries found</p>
              <p className="text-xs mt-1">{search || filterStatus !== 'ALL' ? 'Try adjusting your filters' : 'Submissions will appear here'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Country</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Service</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((inq) => {
                    const sc = STATUS_CONFIG[inq.status] || STATUS_CONFIG.NEW;
                    const StatusIcon = sc.icon;
                    return (
                      <tr
                        key={inq.id}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => setSelected(inq)}
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#0c1a2e]">{inq.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{inq.email}</p>
                          {inq.phone && <p className="text-xs text-slate-400">{inq.phone}</p>}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-slate-600">{inq.country || '—'}</span>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="text-slate-600 text-xs">{inq.service || '—'}</span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-slate-500 text-xs">{fmt(inq.createdAt)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative">
                            <select
                              value={inq.status}
                              onChange={(e) => updateStatus(inq.id, e.target.value)}
                              disabled={updatingId === inq.id}
                              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 disabled:opacity-50"
                            >
                              <option value="NEW">New</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="RESOLVED">Resolved</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          Showing {filtered.length} of {total} inquiries
        </p>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            {/* Drawer Header */}
            <div className="bg-[#0c1a2e] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-lg">{selected.name}</h2>
                <p className="text-slate-400 text-xs mt-0.5">Inquiry Details</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_CONFIG[selected.status]?.color}`}>
                {(() => { const Icon = STATUS_CONFIG[selected.status]?.icon; return Icon ? <Icon className="w-3.5 h-3.5" /> : null; })()}
                {STATUS_CONFIG[selected.status]?.label}
              </span>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                disabled={updatingId === selected.id}
                className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 disabled:opacity-50"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            {/* Details */}
            <div className="px-6 py-5 space-y-4 flex-1">
              {[
                { icon: Mail, label: 'Email', value: selected.email, link: `mailto:${selected.email}` },
                { icon: Phone, label: 'Phone', value: selected.phone || 'Not provided', link: selected.phone ? `tel:${selected.phone}` : undefined },
                { icon: Globe, label: 'Country', value: selected.country || 'Not specified' },
                { icon: Briefcase, label: 'Service', value: selected.service || 'Not specified' },
                { icon: Calendar, label: 'Submitted', value: fmt(selected.createdAt) },
              ].map(({ icon: Icon, label, value, link }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
                    {link ? (
                      <a href={link} className="text-[#2DC55F] font-medium text-sm hover:underline">{value}</a>
                    ) : (
                      <p className="text-[#0c1a2e] font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Message */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-5 border-t border-slate-100 space-y-2">
              <a
                href={`mailto:${selected.email}?subject=Re: Your SMARTax Global Consultation Request&body=Dear ${selected.name},%0A%0AThank you for reaching out to SMARTax Global.`}
                className="w-full bg-[#2DC55F] hover:bg-[#23a54e] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Reply via Email
              </a>
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Client
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

