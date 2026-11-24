import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, Check, Copy, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    confetti({ particleCount: 70, spread: 55, origin: { y: 0.72 } });
    setSubmitted(true);
    const encode = (d) => Object.keys(d).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(d[k])).join('&');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    }).catch(() => {});
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'var(--bg-raised)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-panel)', borderTop: '1px solid var(--border)' }}
    >
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-12"
        style={{ background: 'var(--steel)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <Mail className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
            Let's Build Together
          </h2>
          <p className="mt-4 text-base font-normal" style={{ color: 'var(--text-muted)' }}>
            Have an ambitious project, freelance opportunity, or internship position? I'd love to connect.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">

          {/* Direct channels */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div
              className="p-8 rounded-3xl shadow-xl space-y-5"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <div>
                <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--accent)' }}>
                  Direct Channels
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Fastest response via WhatsApp or email.
                </p>
              </div>

              {/* Status */}
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'rgba(107,207,151,0.07)', border: '1px solid rgba(107,207,151,0.2)' }}
              >
                <span className="w-3 h-3 rounded-full animate-ping flex-shrink-0" style={{ background: '#6fcf97' }} />
                <div className="text-xs">
                  <div className="font-semibold" style={{ color: '#6fcf97' }}>Status: Active & Available</div>
                  <div className="font-mono text-[11px]" style={{ color: 'rgba(107,207,151,0.7)' }}>Open to freelance gigs & tech roles</div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl flex items-center justify-between group transition-all"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,207,151,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl" style={{ background: 'rgba(107,207,151,0.1)', color: '#6fcf97' }}>
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>WHATSAPP INSTANT</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{personalInfo.whatsapp}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--steel)' }} />
              </a>

              {/* Email */}
              <div
                className="p-4 rounded-2xl flex items-center justify-between"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl" style={{ background: 'rgba(77,96,112,0.2)', color: 'var(--accent)' }}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>PRIMARY EMAIL</div>
                    <div className="text-sm font-semibold truncate max-w-[180px]" style={{ color: 'var(--accent)' }}>
                      {personalInfo.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {copiedEmail
                    ? <Check className="w-4 h-4" style={{ color: '#6fcf97' }} />
                    : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div
                className="p-4 rounded-2xl flex items-center gap-3.5"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
              >
                <div className="p-2.5 rounded-xl" style={{ background: 'rgba(77,96,112,0.2)', color: 'var(--accent)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>LOCATION BASE</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{personalInfo.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 sm:p-10 rounded-3xl shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(18px)',
              }}
            >
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(107,207,151,0.1)', border: '1px solid rgba(107,207,151,0.3)' }}
                  >
                    <Check className="w-8 h-8" style={{ color: '#6fcf97' }} />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl" style={{ color: 'var(--accent)' }}>
                    Message Delivered!
                  </h3>
                  <p className="text-sm mt-2 max-w-md" style={{ color: 'var(--text-muted)' }}>
                    Joshua will review your message and reply via email or WhatsApp promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors"
                    style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Your Name', name: 'name', type: 'text', placeholder: 'e.g. Alex Morgan' },
                      { label: 'Email Address', name: 'email', type: 'email', placeholder: 'alex@company.com' },
                    ].map(({ label, name, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          required
                          value={formData[name]}
                          onChange={e => setFormData({ ...formData, [name]: e.target.value })}
                          placeholder={placeholder}
                          style={{ ...inputStyle, '::placeholder': { color: 'var(--text-muted)' } }}
                          onFocus={e => { e.target.style.borderColor = 'var(--border-hover)'; }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Web Application Development / Freelance Inquiry"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--border-hover)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, and goals..."
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => { e.target.style.borderColor = 'var(--border-hover)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all hover:scale-[1.01] shadow-lg"
                    style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="text-[11px] font-mono text-center pt-1" style={{ color: 'var(--text-muted)' }}>
                    ⚡ Netlify Forms • Direct to {personalInfo.email}
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
