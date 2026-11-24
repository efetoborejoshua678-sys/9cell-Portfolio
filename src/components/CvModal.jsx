import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, MessageCircle, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function CvModal({ isOpen, onClose, cvUrl }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const url = cvUrl || personalInfo.cvUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="fixed inset-0"
          style={{ background: 'rgba(10, 14, 20, 0.85)', backdropFilter: 'blur(14px)' }}
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-3xl overflow-hidden z-10 my-4 shadow-2xl flex flex-col max-h-[92vh]"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {/* Header Bar */}
          <div
            className="p-4 sm:px-6 py-4 flex items-center justify-between gap-3 border-b"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'color-mix(in srgb, var(--steel) 20%, transparent)', color: 'var(--accent)' }}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-base sm:text-lg tracking-tight truncate" style={{ color: 'var(--accent)' }}>
                  Curriculum Vitae
                </h3>
                <p className="text-xs font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                  Efetobore Joshua • Software Engineer
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Decision to Download */}
              <a
                href={url}
                download="Efetobore_Joshua_CV.pdf"
                onClick={() => sound.playPop()}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                title="Download CV"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </a>

              {/* Open Fullscreen / New Tab */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="p-2.5 rounded-xl transition-colors"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                }}
                className="p-2.5 rounded-xl transition-colors"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                title="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full p-2 sm:p-4 overflow-hidden" style={{ background: 'var(--bg-page)' }}>
            <div className="w-full h-[68vh] rounded-2xl overflow-hidden shadow-inner relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <object
                data={`${url}#view=FitH`}
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback for browsers or devices that don't support inline PDF objects */}
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <FileText className="w-16 h-16 mb-4" style={{ color: 'var(--accent)' }} />
                  <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--accent)' }}>
                    Preview Ready
                  </h4>
                  <p className="text-sm max-w-md mb-6" style={{ color: 'var(--text-muted)' }}>
                    Your browser does not support inline PDF previews. You can view or download the CV directly below.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                      style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View in Browser</span>
                    </a>
                    <a
                      href={url}
                      download="Efetobore_Joshua_CV.pdf"
                      className="px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>

          {/* Footer Bar */}
          <div
            className="px-6 py-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
          >
            <span>Decide after reviewing: Download or connect directly</span>
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
                style={{ color: '#6fcf97' }}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
