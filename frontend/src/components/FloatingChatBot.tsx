'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  MessageSquare, X, Send, Bot, User, Sparkles,
  Calendar, CheckCircle2, ChevronRight, Loader2,
  FileText, Shield, ArrowLeft, Phone, Mail, Globe, Clock
} from 'lucide-react';
import { sendChatMessage, bookAppointmentFromChat } from '@/lib/api';

interface Message {
  id: string;
  role: 'model' | 'user';
  text: string;
  suggestedService?: string;
  isBookingPrompt?: boolean;
}

const QUICK_PROMPTS = [
  '🇺🇸 How to form a US LLC & get EIN?',
  '🇬🇧 UK Ltd formation & VAT requirements',
  '🇵🇰 Pakistan SECP & FBR NTN process',
  '📑 IRS Form 5472 & 1120 requirements',
];

// Inline markdown parser to render **bold** and *italic* cleanly without raw asterisks
function parseInlineMarkdown(text: string, isUser: boolean = false) {
  // Regex to match **bold** or *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong
          key={i}
          className={`font-black ${isUser ? 'text-slate-950 underline decoration-slate-950/30' : 'text-[#0c1a2e]'}`}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `👋 **Hello! Welcome to SMARTax Global.**\n\nHow can I help you today with your US, UK, or Pakistan tax filing, business formation, or bookkeeping?`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // In-Chat Booking View (replaces separate awkward popup modal)
  const [viewMode, setViewMode] = useState<'chat' | 'booking'>('chat');
  const [bookingService, setBookingService] = useState('US LLC Formation & Registered Agent');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    preferredTime: 'Earliest Available (Today / Tomorrow)',
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && viewMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, viewMode]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      const res = await sendChatMessage(text.trim(), history);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: res.reply,
        suggestedService: res.suggestedService,
        isBookingPrompt: res.canBook,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (res.suggestedService) {
        setBookingService(res.suggestedService);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: `⚠️ I encountered a brief connection delay. Please feel free to schedule a free appointment or try again in a moment.`,
          isBookingPrompt: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBooking = (service?: string) => {
    if (service) setBookingService(service);
    setViewMode('booking');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitting(true);

    try {
      const userQuestions = messages
        .filter((m) => m.role === 'user')
        .map((m) => m.text)
        .join(' | ');

      await bookAppointmentFromChat({
        ...bookingForm,
        service: bookingService,
        message: userQuestions || 'Requested consultation through SMARTax Chat Assistant.',
      });

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setViewMode('chat');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'model',
            text: `🎉 **Appointment Confirmed!**\n\nThank you, **${bookingForm.name}**. Your consultation for **${bookingService}** has been received. Our senior advisor will reach out at **${bookingForm.email}** shortly!`,
          },
        ]);
      }, 1500);
    } catch {
      alert('Could not submit booking. Please try again or use the Contact page.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <>
      {/* ─── Floating Trigger Button (Hidden when chat window is open) ─ */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <div className="relative flex items-center justify-end">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open SMARTax Support Chat"
              className="peer pointer-events-auto relative w-14 h-14 rounded-full bg-[#0c1a2e] hover:bg-[#122642] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-[#2DC55F] cursor-pointer"
            >
              <MessageSquare className="w-6 h-6 text-[#2DC55F]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2DC55F] rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-slate-950" />
              </span>
            </button>

            {/* Tooltip appears ONLY when directly hovering over the button (peer-hover) */}
            <div className="absolute right-full mr-3 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-200 text-xs font-semibold text-slate-800 whitespace-nowrap opacity-0 peer-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#2DC55F] animate-ping" />
              <span>Consultation & Booking</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Floating Chat & Booking Window ──────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-w-[440px] h-[600px] max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

          {/* Header - Cleaned up: Removed 'SMARTax Advisor AI' and 'Gemini' */}
          <div className="bg-[#0c1a2e] px-4 py-3.5 text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              {viewMode === 'booking' ? (
                <button
                  onClick={() => setViewMode('chat')}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Chat</span>
                </button>
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center border border-[#2DC55F]/40 shadow-sm">
                    <Image src="/logo-icon.png" alt="SMARTax Global" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white tracking-tight">SMARTax Global</span>
                    <p className="text-[10.5px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F] inline-block" />
                      <span>US • UK • Pakistan Advisory</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── View 1: Chat Stream ──────────────────────────────────── */}
          {viewMode === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'model' && (
                      <div className="w-7 h-7 rounded-full bg-[#0c1a2e] flex items-center justify-center shrink-0 mt-1 border border-[#2DC55F]">
                        <Bot className="w-4 h-4 text-[#2DC55F]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${m.role === 'user'
                        ? 'bg-[#2DC55F] text-slate-950 font-medium rounded-tr-none shadow-sm'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm'
                        }`}
                    >
                      <div className="space-y-1">
                        {m.text.split('\n').map((line, idx) => {
                          if (!line.trim()) {
                            return <div key={idx} className="h-1" />;
                          }
                          if (line.startsWith('### ')) {
                            return (
                              <h4 key={idx} className="font-extrabold text-sm text-[#0c1a2e] mt-2 mb-1">
                                {parseInlineMarkdown(line.replace('### ', ''), m.role === 'user')}
                              </h4>
                            );
                          }
                          if (line.startsWith('#### ')) {
                            return (
                              <h5 key={idx} className="font-bold text-xs text-[#0c1a2e] mt-1.5 mb-0.5">
                                {parseInlineMarkdown(line.replace('#### ', ''), m.role === 'user')}
                              </h5>
                            );
                          }
                          if (line.startsWith('- ') || line.startsWith('• ')) {
                            const bulletContent = line.replace(/^[-•]\s*/, '');
                            return (
                              <div key={idx} className="flex items-start gap-1.5 ml-1 my-0.5">
                                <span className="text-[#2DC55F] font-bold text-xs shrink-0">•</span>
                                <span className="leading-relaxed">
                                  {parseInlineMarkdown(bulletContent, m.role === 'user')}
                                </span>
                              </div>
                            );
                          }
                          return (
                            <p key={idx} className="leading-relaxed">
                              {parseInlineMarkdown(line, m.role === 'user')}
                            </p>
                          );
                        })}
                      </div>

                      {/* In-Chat Seamless Booking Action Card */}
                      {m.role === 'model' && m.isBookingPrompt && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
                          {m.suggestedService && (
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100/80 px-2 py-1 rounded">
                              <FileText className="w-3 h-3 text-[#2DC55F]" />
                              <span>{m.suggestedService}</span>
                            </div>
                          )}
                          <button
                            onClick={() => handleOpenBooking(m.suggestedService)}
                            className="w-full bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Free Appointment</span>
                            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                          </button>
                        </div>
                      )}
                    </div>

                    {m.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
                    <Loader2 className="w-4 h-4 animate-spin text-[#2DC55F]" />
                    <span>Preparing guidance...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              {messages.length <= 2 && (
                <div className="p-2 bg-slate-100/60 border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 transition-colors shadow-2xs font-medium cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about US LLC, UK VAT, Pakistan taxes..."
                  disabled={loading}
                  className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2DC55F]/30 focus:border-[#2DC55F] transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading || !inputText.trim()}
                  className="w-9 h-9 rounded-xl bg-[#2DC55F] hover:bg-[#23a54e] disabled:bg-slate-200 text-slate-950 disabled:text-slate-400 flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* ── View 2: In-Chat Seamless Appointment Booking Form ─────── */}
          {viewMode === 'booking' && (
            <div className="flex-1 overflow-y-auto p-5 bg-white flex flex-col justify-between">
              {bookingSuccess ? (
                <div className="my-auto text-center space-y-3 p-4">
                  <div className="w-12 h-12 bg-emerald-100 text-[#2DC55F] rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0c1a2e]">Appointment Scheduled!</h4>
                  <p className="text-xs text-slate-600">
                    Your request for <strong>{bookingService}</strong> has been logged. Returning to chat...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-[#2DC55F] shrink-0" />
                    <div>
                      <span className="text-slate-500">Service:</span>{' '}
                      <span className="font-bold text-[#0c1a2e]">{bookingService}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2DC55F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2DC55F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2DC55F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Country
                      </label>
                      <select
                        value={bookingForm.country}
                        onChange={(e) => setBookingForm({ ...bookingForm, country: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2DC55F] bg-white text-slate-800"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Pakistan">Pakistan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={bookingForm.preferredTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2DC55F] bg-white text-slate-800"
                      >
                        <option value="Earliest Available">Earliest Available</option>
                        <option value="Morning (9 AM - 12 PM EST)">Morning (EST)</option>
                        <option value="Afternoon (1 PM - 5 PM EST)">Afternoon (EST)</option>
                        <option value="Evening (6 PM - 9 PM EST)">Evening (EST)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingSubmitting}
                    className="w-full mt-3 bg-[#2DC55F] hover:bg-[#23a54e] disabled:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {bookingSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Schedule</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10.5px] text-center text-slate-400 mt-2">
                    🔒 Request is forwarded directly to our senior accounting team.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
