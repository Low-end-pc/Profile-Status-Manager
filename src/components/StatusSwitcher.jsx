import React, { useState } from 'react';
import { STATUS_OPTIONS } from '../data/profileData';
import { Check, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';

export default function StatusSwitcher({ currentStatus, onSelectStatus, isDrawerOpen, setIsDrawerOpen }) {
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const customStatus = {
      id: `custom-${Date.now()}`,
      label: customText.trim(),
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.15)',
      bgTint: 'rgba(56, 189, 248, 0.08)',
      borderTint: 'rgba(56, 189, 248, 0.25)',
      badgeText: 'Custom',
      description: customText.trim()
    };

    onSelectStatus(customStatus);
    setCustomText('');
    setShowCustomInput(false);
  };

  return (
    <div className="status-drawer">
      <div 
        className="status-drawer-header" 
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <div className="status-drawer-title-wrap">
          <span className="status-drawer-title">Status Switcher</span>
          <span className="status-count-tag">{STATUS_OPTIONS.length} Presets</span>
        </div>
        
        <div className="status-header-actions">
          <button 
            type="button" 
            className="btn-custom-status"
            onClick={(e) => {
              e.stopPropagation();
              setShowCustomInput(!showCustomInput);
              if (!isDrawerOpen) setIsDrawerOpen(true);
            }}
          >
            <Edit3 size={13} />
            <span>Custom</span>
          </button>
          <button 
            type="button" 
            aria-label="Toggle status presets"
            className="glass-icon-btn toggle-arrow-btn"
          >
            {isDrawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="status-content-wrap">
          {showCustomInput && (
            <form onSubmit={handleCustomSubmit} className="custom-status-form">
              <input
                type="text"
                placeholder="Type custom status (e.g. Brainstorming UI, On a flight...)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="custom-status-input"
                autoFocus
              />
              <button 
                type="submit" 
                className="custom-status-submit-btn" 
                disabled={!customText.trim()}
              >
                Apply
              </button>
            </form>
          )}

          <div className="status-grid-options">
            {STATUS_OPTIONS.map((status) => {
              const isSelected = currentStatus.id === status.id;
              return (
                <button
                  key={status.id}
                  type="button"
                  className={`status-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectStatus(status)}
                >
                  <span
                    className="status-option-dot"
                    style={{ backgroundColor: status.color }}
                  />
                  <div className="status-option-content">
                    <div className="status-option-row">
                      <span className="status-option-name">{status.label}</span>
                      {isSelected && <Check size={12} style={{ color: status.color }} />}
                    </div>
                    <span className="status-option-desc">
                      {status.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
