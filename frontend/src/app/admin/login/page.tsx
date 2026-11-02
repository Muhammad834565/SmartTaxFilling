'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Client-side & server-side sync timer state
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [failedCount, setFailedCount] = useState<number>(0);

  // Active countdown timer effect
  useEffect(() => {
    if (lockoutSeconds <= 0) return;

    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // If locked out (HTTP 429) or retryAfterSec returned
        if (res.status === 429 || data.retryAfterSec) {
          const waitTime = data.retryAfterSec || 10;
          setLockoutSeconds(waitTime);
          setFailedCount(data.attempts || failedCount + 1);
          throw new Error(data.message || `Account locked for ${waitTime}s.`);
        }

        // Normal 401 with attemptsRemaining
        if (data.attempts) {
          setFailedCount(data.attempts);
        } else {
          setFailedCount((prev) => prev + 1);
        }

        throw new Error(data.message || 'Invalid email or password');
      }

      // Success! Reset everything
      setFailedCount(0);
      setLockoutSeconds(0);
      localStorage.setItem('smartax_admin_token', data.access_token);
      localStorage.setItem('smartax_admin_email', data.email);
      router.push('/admin/inquiries');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutSeconds > 0;

  return (
    <div className="min-h-screen bg-[#0c1a2e] flex items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #2DC55F 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2DC55F 0%, transparent 50%)',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image src="/logo-icon.png" alt="SMARTax Global" width={48} height={48} className="object-contain" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">
              SMARTax <span className="text-[#2DC55F]">Global</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Internal Administration Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2DC55F]" />
              <h1 className="text-xl font-bold text-[#0c1a2e]">Admin Sign In</h1>
            </div>
            {failedCount > 0 && failedCount < 3 && (
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                {3 - failedCount} attempts left
              </span>
            )}
          </div>

          {/* Lockout Warning Banner */}
          {isLocked && (
            <div className="mb-5 bg-rose-50 border-2 border-rose-300 text-rose-800 text-sm p-4 rounded-xl flex items-start gap-3 animate-pulse">
              <Clock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900">Security Lockout Active</p>
                <p className="text-xs text-rose-700 mt-1">
                  Too many failed attempts. Try again in{' '}
                  <span className="font-black text-rose-950 text-sm underline">{lockoutSeconds}s</span>
                </p>
              </div>
            </div>
          )}

          {/* Standard Error Notice */}
          {!isLocked && error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1a2e] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  disabled={isLocked || loading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@smartaxglobal.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 focus:border-[#2DC55F] disabled:bg-slate-50 disabled:cursor-not-allowed transition-colors text-slate-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1a2e] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  disabled={isLocked || loading}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 focus:border-[#2DC55F] disabled:bg-slate-50 disabled:cursor-not-allowed transition-colors text-slate-800"
                />
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-40"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit / Countdown Button */}
            <button
              type="submit"
              disabled={isLocked || loading}
              className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                isLocked
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed shadow-none'
                  : 'bg-[#2DC55F] hover:bg-[#23a54e] disabled:bg-emerald-300 text-slate-950 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : isLocked ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Locked: Wait {lockoutSeconds}s</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Admin</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          🔒 Protected by exponential brute-force rate-limiting
        </p>
      </div>
    </div>
  );
}
