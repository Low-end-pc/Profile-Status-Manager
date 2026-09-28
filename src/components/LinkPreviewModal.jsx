import React from 'react';
import { ArrowLeft, ExternalLink, Globe, ShieldCheck, Copy, X } from 'lucide-react';

export default function LinkPreviewModal({ link, onClose, onShowToast }) {
  if (!link) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link.url);
      onShowToast('Link copied to clipboard! 📋');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-modal-container browser-modal" onClick={(e) => e.stopPropagation()}>
        {/* Browser Top Navigation Bar with Prominent Back Button */}
        <div className="browser-topbar">
          <div className="browser-nav-buttons">
            <button 
              type="button" 
              className="browser-back-btn" 
              onClick={onClose}
              title="Return to Profile"
            >
              <ArrowLeft size={16} />
              <span>Back to Profile</span>
            </button>
          </div>

          <div className="browser-address-bar">
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span className="browser-url-text">{link.url}</span>
          </div>

          <div className="browser-actions">
            <button
              type="button"
              className="glass-icon-btn"
              style={{ width: '32px', height: '32px' }}
              title="Copy URL"
              onClick={handleCopy}
            >
              <Copy size={14} />
            </button>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-icon-btn"
              style={{ width: '32px', height: '32px' }}
              title="Open in new window"
            >
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              className="glass-icon-btn"
              style={{ width: '32px', height: '32px' }}
              title="Close"
              onClick={onClose}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Modal Content Preview */}
        <div className="browser-content-area">
          <div className="link-destination-hero">
            <div className="destination-icon-large">
              <Globe size={40} style={{ color: link.color || '#38bdf8' }} />
            </div>
            <h2>Visiting {link.name}</h2>
            <p className="destination-subtext">
              Account: <span className="highlight-code">{link.handle}</span>
            </p>
            <p className="destination-desc">
              External platforms (such as {link.name}) restrict direct iframe embedding due to X-Frame-Options security policies.
            </p>

            <div className="destination-btn-row">
              <button
                type="button"
                className="btn-back-primary"
                onClick={onClose}
              >
                <ArrowLeft size={16} />
                <span>Return to Profile</span>
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external-link"
              >
                <span>Launch in New Tab</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
