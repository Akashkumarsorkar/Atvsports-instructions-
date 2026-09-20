import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulated reliable submission feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Editorial &amp; Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Contact ATV Sports Blog
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
          Have feedback on an installation guide, spotted a software update anomaly, or want to suggest sports technology topics? Send our editors a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to ATV Sports Blog. Our editorial desk reviews incoming inquiries regularly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-900 text-xs text-red-300">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Guide Feedback / Bug Report"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please include details about your device model, Android OS version, or editorial query..."
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Channels & Placeholders */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-white">Direct Ecosystem Links</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              For official client downloads and direct software release mirrors:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-red-500" />
                  <span className="text-neutral-300 font-medium">Main Web Portal:</span>
                </div>
                <a
                  href="https://atvsports.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-mono underline"
                >
                  atvsports.site
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-300 font-medium">Editorial Desk:</span>
                </div>
                <span className="text-neutral-400 font-mono">contact@atvsports.site</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-3 text-xs text-neutral-400">
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider text-[11px]">
              Configurable Social Media Channels
            </h4>
            <p className="leading-relaxed">
              Official community discussion rooms and social announcements (configured via site admin):
            </p>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span className="font-semibold text-neutral-300">Telegram Channel:</span>
                <span className="font-mono text-neutral-500 text-[11px]">t.me/atvsports_official (placeholder)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span className="font-semibold text-neutral-300">X / Twitter:</span>
                <span className="font-mono text-neutral-500 text-[11px]">@ATVSportsApp (placeholder)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span className="font-semibold text-neutral-300">YouTube Guides:</span>
                <span className="font-mono text-neutral-500 text-[11px]">youtube.com/@atvsports (placeholder)</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>We respect user privacy and do not sell or distribute contact data.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
