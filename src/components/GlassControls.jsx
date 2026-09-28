import React, { useState } from 'react';
import {
  Sliders,
  Code2,
  RotateCcw,
  Copy,
  Check,
  Palette,
  Type,
  Maximize2
} from 'lucide-react';

// change: list of curated solid color presets for quick one-click theme switching
const SOLID_PRESETS = [
  { id: 'obsidian', label: 'Obsidian Dark', screen: '#090a0f', card: '#12151c', border: '#27272a' },
  { id: 'pure-black', label: 'Pure Black', screen: '#000000', card: '#111111', border: '#262626' },
  { id: 'midnight', label: 'Midnight Slate', screen: '#0b0f19', card: '#1e293b', border: '#334155' },
  { id: 'charcoal', label: 'Warm Charcoal', screen: '#171514', card: '#24201d', border: '#3e3833' },
  { id: 'forest', label: 'Forest Deep', screen: '#0a110e', card: '#13221c', border: '#1e382d' },
  { id: 'nordic', label: 'Nordic Navy', screen: '#0f172a', card: '#1e293b', border: '#38bdf8' }
];

// change: list of supported clean font options
const FONT_OPTIONS = [
  { label: 'Modern Sans (Inter)', value: "'Inter', sans-serif" },
  { label: 'Monospace (JetBrains)', value: "'JetBrains Mono', monospace" },
  { label: 'System UI', value: "system-ui, -apple-system, sans-serif" },
  { label: 'Roboto / Grotesk', value: "'Segoe UI', Roboto, sans-serif" },
  { label: 'Classic Serif', value: "Georgia, 'Times New Roman', serif" }
];

export default function GlassControls({
  themeSettings,       // change: receive current themeSettings
  setThemeSettings,   // change: receive setter function
  currentStatus,
  onShowToast
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeStudioTab, setActiveStudioTab] = useState('colors'); // 'colors' | 'typography' | 'css'

  // change: reset theme to clean solid defaults
  const resetDefaults = () => {
    setThemeSettings({
      screenBg: '#090a0f',        // change: reset to default dark canvas
      cardBg: '#12151c',          // change: reset to solid dark card
      cardBorder: '#27272a',      // change: reset to subtle dark border
      fontFamily: "'Inter', sans-serif", // change: reset to Inter font
      letterSpacing: 0,           // change: reset letter spacing to standard
      lineHeight: 1.5,            // change: reset line height to 1.5
      cardRadius: 20,             // change: reset radius to 20px
    });
    onShowToast('Theme reset to clean solid defaults ✨');
  };

  // change: generate clean CSS code export without glassmorphism filters
  const cssSnippet = `/* Clean Solid Card & Typography Styles */
.app-container {
  background-color: ${themeSettings.screenBg}; /* Screen background */
  font-family: ${themeSettings.fontFamily};   /* Font family */
  letter-spacing: ${themeSettings.letterSpacing}px;   /* Letter spacing */
  line-height: ${themeSettings.lineHeight};        /* Line spacing */
}

.solid-card {
  background-color: ${themeSettings.cardBg};   /* Solid card background */
  border: 1px solid ${themeSettings.cardBorder}; /* Solid card border */
  border-radius: ${themeSettings.cardRadius}px;    /* Corner radius */
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6);
}`;

  const copyCss = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cssSnippet);
      setCopiedCode(true);
      onShowToast('Clean CSS styles copied! 📋');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section className="studio-section" aria-label="Solid Design & Typography Studio">
      <div
        className="studio-card solid-studio-card"
        style={{
          backgroundColor: themeSettings.cardBg,     // change: sync studio card bg with cardBg
          borderColor: themeSettings.cardBorder,     // change: sync studio border
          borderRadius: `${themeSettings.cardRadius}px` // change: sync studio corner radius
        }}
      >
        {/* Studio Topbar */}
        <div className="studio-header">
          <div className="studio-title-wrap">
            <div className="studio-icon-badge">
              <Sliders size={16} />
            </div>
            <div>
              <h2 className="studio-title">Design & Typography Studio</h2>
              <p className="studio-subtitle">Customize solid colors, fonts, letter tracking & line height</p>
            </div>
          </div>

          <div className="studio-nav-pills">
            {/* change: Tab 1 - Solid Colors */}
            <button
              type="button"
              className={`studio-tab-pill ${activeStudioTab === 'colors' ? 'active' : ''}`}
              onClick={() => setActiveStudioTab('colors')}
            >
              <Palette size={13} />
              <span>Colors</span>
            </button>

            {/* change: Tab 2 - Typography & Spacing */}
            <button
              type="button"
              className={`studio-tab-pill ${activeStudioTab === 'typography' ? 'active' : ''}`}
              onClick={() => setActiveStudioTab('typography')}
            >
              <Type size={13} />
              <span>Typography</span>
            </button>

            {/* change: Tab 3 - Export Clean CSS */}
            <button
              type="button"
              className={`studio-tab-pill ${activeStudioTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveStudioTab('css')}
            >
              <Code2 size={13} />
              <span>Export CSS</span>
            </button>

            {/* change: Reset button */}
            <button
              type="button"
              className="glass-icon-btn studio-action-btn"
              title="Reset defaults"
              onClick={resetDefaults}
              aria-label="Reset studio defaults"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* TAB 1: SOLID COLOR CUSTOMIZATION */}
        {activeStudioTab === 'colors' && (
          <div className="studio-grid-sliders">
            {/* change: Control Screen Background Color */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Screen Background</span>
                <span className="slider-value-display">{themeSettings.screenBg}</span>
              </div>
              <div className="color-picker-row">
                <input
                  type="color"
                  value={themeSettings.screenBg}
                  className="native-color-picker" // change: native color picker input
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, screenBg: e.target.value }))}
                />
                <span className="color-hex-tag">{themeSettings.screenBg}</span>
              </div>
              <span className="slider-hint">Controls the full-page solid canvas color</span>
            </div>

            {/* change: Control Card Background Color */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Card Background</span>
                <span className="slider-value-display">{themeSettings.cardBg}</span>
              </div>
              <div className="color-picker-row">
                <input
                  type="color"
                  value={themeSettings.cardBg}
                  className="native-color-picker" // change: card color picker input
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, cardBg: e.target.value }))}
                />
                <span className="color-hex-tag">{themeSettings.cardBg}</span>
              </div>
              <span className="slider-hint">Controls solid background color of cards</span>
            </div>




            {/* change: Control Clickable Frames Background Color */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Clickable Cards BG</span>
                <span className="slider-value-display">{themeSettings.frameBg}</span>
              </div>
              <div className="color-picker-row">
                <input
                  type="color"
                  value={themeSettings.frameBg}
                  className="native-color-picker"
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, frameBg: e.target.value }))}
                />
                <span className="color-hex-tag">{themeSettings.frameBg}</span>
              </div>
              <span className="slider-hint">প্রতিটি ক্লিকেবল ফ্রেমের সলিড ব্যাকগ্রাউন্ড কালার</span>
            </div>

            {/* change: Control Clickable Frames Font/Text (FG) Color */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Clickable Cards Font (FG)</span>
                <span className="slider-value-display">{themeSettings.frameFg}</span>
              </div>
              <div className="color-picker-row">
                <input
                  type="color"
                  value={themeSettings.frameFg}
                  className="native-color-picker"
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, frameFg: e.target.value }))}
                />
                <span className="color-hex-tag">{themeSettings.frameFg}</span>
              </div>
              <span className="slider-hint">ক্লিকেবল ফ্রেমের ভেতরের ফন্ট/টেক্সটের কনট্রাস্ট কালার</span>
            </div>




            {/* change: Control Card Border Color */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Card Border Color</span>
                <span className="slider-value-display">{themeSettings.cardBorder}</span>
              </div>
              <div className="color-picker-row">
                <input
                  type="color"
                  value={themeSettings.cardBorder}
                  className="native-color-picker" // change: border color picker input
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, cardBorder: e.target.value }))}
                />
                <span className="color-hex-tag">{themeSettings.cardBorder}</span>
              </div>
              <span className="slider-hint">Controls outline border color of cards</span>
            </div>

            {/* change: Curated Solid Theme Presets */}
            <div className="studio-slider-card" style={{ gridColumn: '1 / -1' }}>
              <div className="slider-meta">
                <span className="slider-name">Curated Solid Palettes</span>
                <span className="slider-value-display">Quick Select</span>
              </div>
              <div className="solid-palette-grid">
                {SOLID_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className="solid-preset-btn" // change: quick palette button
                    onClick={() => {
                      setThemeSettings(prev => ({
                        ...prev,
                        screenBg: preset.screen,
                        cardBg: preset.card,
                        border: preset.border,
                        cardBorder: preset.border
                      }));
                      onShowToast(`Applied ${preset.label} palette`);
                    }}
                  >
                    <div className="preset-swatch-pair">
                      <span className="swatch-screen" style={{ backgroundColor: preset.screen }} title="Screen" />
                      <span className="swatch-card" style={{ backgroundColor: preset.card, borderColor: preset.border }} title="Card" />
                    </div>
                    <span className="preset-name">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY & SPACING */}
        {activeStudioTab === 'typography' && (
          <div className="studio-grid-sliders">
            {/* change: Font Family Selector */}
            <div className="studio-slider-card" style={{ gridColumn: '1 / -1' }}>
              <div className="slider-meta">
                <span className="slider-name">Font Family</span>
                <span className="slider-value-display">{themeSettings.fontFamily.split(',')[0].replace(/['"]/g, '')}</span>
              </div>
              <div className="font-buttons-grid">
                {FONT_OPTIONS.map((f) => {
                  const isActive = themeSettings.fontFamily === f.value;
                  return (
                    <button
                      key={f.label}
                      type="button"
                      className={`font-select-btn ${isActive ? 'active' : ''}`} // change: active state for chosen font
                      style={{ fontFamily: f.value }}
                      onClick={() => setThemeSettings(prev => ({ ...prev, fontFamily: f.value }))}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <span className="slider-hint">Select typeface to apply across the profile card and screen</span>
            </div>

            {/* change: Letter Spacing Tracking Slider */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Letter Spacing</span>
                <span className="slider-value-display">{themeSettings.letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="-1"
                max="4"
                step="0.25"
                value={themeSettings.letterSpacing}
                className="refined-slider"
                aria-label="Letter spacing slider"
                onChange={(e) => setThemeSettings(prev => ({ ...prev, letterSpacing: Number(e.target.value) }))} // change: update letter spacing
              />
              <span className="slider-hint">Controls typography tracking (character spacing)</span>
            </div>

            {/* change: Line Spacing Height Slider */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Line Spacing (Leading)</span>
                <span className="slider-value-display">{themeSettings.lineHeight}x</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.1"
                step="0.05"
                value={themeSettings.lineHeight}
                className="refined-slider"
                aria-label="Line spacing slider"
                onChange={(e) => setThemeSettings(prev => ({ ...prev, lineHeight: Number(e.target.value) }))} // change: update line spacing
              />
              <span className="slider-hint">Controls paragraph leading and vertical text rhythm</span>
            </div>

            {/* change: Corner Radius Slider */}
            <div className="studio-slider-card">
              <div className="slider-meta">
                <span className="slider-name">Card Corner Radius</span>
                <span className="slider-value-display">{themeSettings.cardRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="36"
                step="2"
                value={themeSettings.cardRadius}
                className="refined-slider"
                aria-label="Corner radius slider"
                onChange={(e) => setThemeSettings(prev => ({ ...prev, cardRadius: Number(e.target.value) }))} // change: update corner radius
              />
              <span className="slider-hint">Card curvature from sharp (0px) to rounded (36px)</span>
            </div>
          </div>
        )}

        {/* TAB 3: EXPORT CSS */}
        {activeStudioTab === 'css' && (
          <div className="export-css-section">
            <div className="css-header-row">
              <div>
                <h3 className="css-box-title">Generated Solid Design Tokens</h3>
                <p className="css-box-subtitle">Ready-to-use production CSS variables and rules</p>
              </div>
              <button
                type="button"
                className="btn-copy-css"
                onClick={copyCss}
              >
                {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Clean CSS'}</span>
              </button>
            </div>

            <pre className="css-code-viewport">
              <code>{cssSnippet}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
