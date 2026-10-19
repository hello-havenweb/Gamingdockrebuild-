import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'game-request',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const supportEmail = 'contact@gamingdock.local';
  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(
    formData.subject || 'Gaming Dock Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nTopic: ${formData.topic}\n\n${formData.message}`
  )}`;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      
      {/* HEADER */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3045]/10 border border-[#ff3045]/30 text-xs font-bold text-[#ff3045] uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Contact Gaming Dock
        </h1>
        <p className="text-base text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
          Have a game suggestion, broken link report, or general feedback? Send us a message or contact our team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* CONTACT INFO SIDEBAR */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Direct Contact</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              For official correspondence or immediate questions, reach out via direct email:
            </p>

            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-2 p-3 rounded-xl bg-[#0b0c10] border border-[#242836] hover:border-[#ff3045] text-xs font-semibold text-white transition-colors w-full group"
            >
              <Mail className="w-4 h-4 text-[#ff3045]" />
              <span className="truncate group-hover:text-[#ff3045] transition-colors">
                {supportEmail}
              </span>
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3 text-xs text-[#9ca3af]">
            <h4 className="font-heading font-semibold text-sm text-white">Notice regarding links</h4>
            <p className="leading-relaxed">
              If a store or official game page link is out-of-date or expired, please select <strong>Broken Link Report</strong> and specify the game title.
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="md:col-span-2">
          <div className="p-8 rounded-3xl bg-[#15171e] border border-[#242836] shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-2xl text-white">Message Prepared</h3>
                  <p className="text-xs text-[#9ca3af] max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Because this is a static showcase environment, your message can be sent directly through your local email client:
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={mailtoLink}
                    className="px-6 py-3 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-[#ff3045]/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'game-request', subject: '', message: '' });
                    }}
                    className="px-5 py-3 rounded-xl bg-[#202430] hover:bg-[#282d3d] text-white font-semibold text-xs"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#242836] rounded-xl text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#242836] rounded-xl text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white">Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#242836] rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3045] cursor-pointer"
                    >
                      <option value="game-request">Suggest a Game</option>
                      <option value="broken-link">Broken Link Report</option>
                      <option value="general-feedback">General Feedback</option>
                      <option value="partnership">Partnership Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white">Subject</label>
                    <input
                      type="text"
                      placeholder="Brief subject summary"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#242836] rounded-xl text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Enter your message, suggestions, or comments here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#242836] rounded-xl text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045]"
                  />
                </div>

                <p className="text-[11px] text-[#6b7280]">
                  Gaming Dock respects your privacy. We never share or sell contact information.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#ff3045]/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
