import React, { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import GlassControls from './components/GlassControls';
import { STATUS_OPTIONS, PROFILE_DATA, GLASS_TINTS, BACKGROUND_PRESETS } from './data/profileData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentStatus, setCurrentStatus] = useState(STATUS_OPTIONS[0]); // Default to Online
  // change: define solid theme state for screen, card, font, and spacing
  const [themeSettings, setThemeSettings] = useState({
    screenBg: '#090a0f',        // পুরো স্ক্রিন/প্ল্যাটফর্ম ব্যাকগ্রাউন্ড
    cardBg: '#12151c',          // মেইন কন্টেইনার ফ্লোর কালার
    frameBg: '#1c2230',         // নতুন: প্রতিটি ক্লিকেবল কার্ড ফ্রেমের সলিড BG
    frameFg: '#ffffff',         // নতুন: প্রতিটি ক্লিকেবল কার্ড ফ্রেমের টেক্সট/ফন্ট কালার (FG)
    cardBorder: '#2e384d',      // প্রতিটি ফ্রেমের বর্ডার কালার
    fontFamily: "'Inter', sans-serif", // change: active font family
    letterSpacing: 0,           // change: letter spacing in px
    lineHeight: 1.5,            // change: line height multiplier
    cardRadius: 20,             // change: card corner radius in px
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <div
      className="app-container"
      style={{
        backgroundColor: themeSettings.screenBg, // change: apply solid screen background
        fontFamily: themeSettings.fontFamily,     // change: apply chosen font family globally
        letterSpacing: `${themeSettings.letterSpacing}px`, // change: apply dynamic letter spacing
        lineHeight: themeSettings.lineHeight,    // change: apply dynamic line spacing
        '--status-color': currentStatus.color,
        '--status-glow': currentStatus.glow,
        '--status-bg': currentStatus.bgTint,
        '--status-border': currentStatus.borderTint,
        '--frame-bg': themeSettings.frameBg,  // change: CSS variable for frame BG
        '--frame-fg': themeSettings.frameFg,  // change: CSS variable for frame FG (font)
      }}
    >
      {/* Profile Bio Card Workstation */}
      <main className="main-content-flow">
        <ProfileCard
          profile={PROFILE_DATA}
          currentStatus={currentStatus}
          onSelectStatus={(status) => {
            setCurrentStatus(status);
            triggerToast(`Status set to ${status.label}`);
          }}
          onShowToast={triggerToast}
          themeSettings={themeSettings} // change: pass themeSettings down to card
        />
      </main>

      {/* Solid Design & Typography Customizer Studio */}
      <GlassControls
        themeSettings={themeSettings}       // change: pass solid theme settings to studio
        setThemeSettings={setThemeSettings} // change: pass setter for theme settings
        currentStatus={currentStatus}
        onShowToast={triggerToast}
      />

      {/* Feedback Toast */}
      <div className={`toast-glass ${showToast ? 'show' : ''}`}>
        <CheckCircle2 size={16} style={{ color: currentStatus.color }} />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
