import React, { useState, useEffect } from 'react';
import { 
  BadgeCheck, 
  Share2, 
  UserPlus, 
  UserCheck, 
  MapPin, 
  Clock, 
  Layers, 
  Activity, 
  Link2, 
  MessageSquare, 
  ArrowUpRight,
  ExternalLink,
  Mail
} from 'lucide-react';
import StatusSwitcher from './StatusSwitcher';
import LinkPreviewModal from './LinkPreviewModal';
import MessageModal from './MessageModal';

// Clean brand SVG icons
const SocialIcon = ({ iconName, size = 16, color }) => {
  switch (iconName) {
    case 'Github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'Twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    case 'Dribbble':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      );
    case 'Figma':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        </svg>
      );
    case 'Mail':
      return <Mail size={size} style={{ color }} />;
    default:
      return <ExternalLink size={size} style={{ color }} />;
  }
};

export default function ProfileCard({
  profile,
  currentStatus,
  onSelectStatus,
  onShowToast,
  themeSettings // change: receive themeSettings prop
}) {
  const [activeTab, setActiveTab] = useState('about');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(28412);
  const [isStatusDrawerOpen, setIsStatusDrawerOpen] = useState(true);
  const [localTime, setLocalTime] = useState('');
  const [selectedLinkForPreview, setSelectedLinkForPreview] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Live local clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Profile link copied to clipboard! 📋');
    } else {
      onShowToast('Profile link ready to share!');
    }
  };

  const handleToggleFollow = () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    if (nextState) {
      setFollowerCount((prev) => prev + 1);
      onShowToast(`Connected with ${profile.name} ✨`);
    } else {
      setFollowerCount((prev) => prev - 1);
      onShowToast(`Disconnected from ${profile.name}`);
    }
  };

  const formattedFollowers = (followerCount / 1000).toFixed(1) + 'k';

  return (
    <div className="profile-card-wrapper">
      <article 
        className="solid-card main-workspace-card" // change: switch from glass-card to solid-card
        style={{
          backgroundColor: themeSettings.cardBg,            // change: solid card background color
          borderColor: themeSettings.cardBorder,            // change: solid card border color
          borderRadius: `${themeSettings.cardRadius}px`,    // change: dynamic corner radius
          fontFamily: themeSettings.fontFamily,             // change: apply chosen font family
          letterSpacing: `${themeSettings.letterSpacing}px`,// change: apply custom letter spacing
          lineHeight: themeSettings.lineHeight,             // change: apply custom line spacing
          '--card-bg': themeSettings.cardBg,                // change: CSS var for inner components
          '--card-border': themeSettings.cardBorder,        // change: CSS var for inner borders
          '--status-color': currentStatus.color,
          '--status-glow': currentStatus.glow,
          '--status-bg': currentStatus.bgTint,
          '--status-border': currentStatus.borderTint,
        }}
      >
        {/* Banner Header */}
        <div 
          className="card-banner"
          style={{ backgroundImage: `url(${profile.bannerUrl})` }}
        >
          <div className="banner-solid-tint" /> {/* change: solid gradient overlay */}
          <div className="banner-actions">
            <button 
              type="button" 
              className="glass-action-pill" 
              onClick={handleShare}
              title="Copy Profile URL"
            >
              <Share2 size={13} />
              <span>Share Profile</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="card-two-col-layout">
          
          {/* LEFT COLUMN: Profile Identity */}
          <aside className="profile-identity-col">
            <div className="avatar-wrapper">
              <div className="avatar-ring">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="avatar-img"
                />
              </div>
              <div 
                className="avatar-status-badge" 
                title={`Status: ${currentStatus.label}`} 
              />
            </div>

            <div className="identity-header-info">
              <div className="identity-name-row">
                <h1 className="user-name">{profile.name}</h1>
                <span className="verified-badge" title="Verified Professional">
                  <BadgeCheck size={17} />
                </span>
              </div>
              <span className="user-handle">{profile.handle}</span>
              <p className="user-role">{profile.role}</p>
            </div>

            {/* Quiet Status Pill */}
            <div className="status-pill-section">
              <button 
                type="button"
                className="live-status-pill-btn"
                onClick={() => setIsStatusDrawerOpen(!isStatusDrawerOpen)}
                title="Click to toggle status switcher"
              >
                <span 
                  className="status-dot-mini" 
                  style={{ backgroundColor: currentStatus.color }}
                />
                <span className="status-label-bold">{currentStatus.label}</span>
                <span className="status-tag-mini">{currentStatus.badgeText}</span>
              </button>
            </div>

            {/* Clear Stats Counter Grid */}
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{formattedFollowers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.stats[1].value}</span>
                <span className="stat-label">{profile.stats[1].label}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.stats[2].value}</span>
                <span className="stat-label">{profile.stats[2].label}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-row">
              <button 
                type="button" 
                className={`btn-primary-action ${isFollowing ? 'is-following' : ''}`}
                onClick={handleToggleFollow}
              >
                {isFollowing ? (
                  <>
                    <UserCheck size={15} />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={15} />
                    <span>Follow</span>
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="btn-secondary-action"
                onClick={() => setIsMessageModalOpen(true)}
                title="Open Direct Messages"
              >
                <MessageSquare size={15} />
                <span>Message</span>
              </button>
            </div>

            {/* Location & Timezone info */}
            <div className="meta-badges-row">
              <div className="meta-glass-badge">
                <MapPin size={13} style={{ color: '#94a3b8' }} />
                <span>{profile.location}</span>
              </div>
              <div className="meta-glass-badge">
                <Clock size={13} style={{ color: '#94a3b8' }} />
                <span>{localTime || 'PST'} local time</span>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Workstation Tabs & Status Switcher */}
          <section className="profile-content-col">
            {/* Tab Navigation */}
            <nav className="tab-nav-container" aria-label="Profile Sections">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <Layers size={14} />
                <span>Overview</span>
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                <Activity size={14} />
                <span>Activity</span>
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <Link2 size={14} />
                <span>Links ({profile.socialLinks.length})</span>
              </button>
            </nav>

            {/* Tab Panels */}
            <div className="tab-panel-wrapper">
              {/* ABOUT TAB */}
              {activeTab === 'about' && (
                <div className="tab-panel-about">
                  <div className="about-card-section">
                    <h2 className="section-subtitle">About</h2>
                    <p className="bio-paragraph">{profile.bio}</p>
                  </div>

                  <div className="about-card-section">
                    <div className="section-header-flex">
                      <h2 className="section-subtitle">Skills & Expertise</h2>
                      {selectedSkill && (
                        <button 
                          type="button" 
                          className="btn-clear-filter"
                          onClick={() => setSelectedSkill(null)}
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                    
                    <div className="skills-cloud">
                      {profile.skills.map((skill, index) => {
                        const isChosen = selectedSkill === skill.name;
                        return (
                          <button 
                            key={index} 
                            type="button"
                            className={`skill-pill ${isChosen ? 'skill-active-filter' : ''}`}
                            onClick={() => {
                              setSelectedSkill(isChosen ? null : skill.name);
                              onShowToast(`Filtered by ${skill.name}`);
                            }}
                          >
                            <span>{skill.name}</span>
                            <span className="skill-level-tag">{skill.level}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="highlights-grid">
                    <div className="highlight-box">
                      <span className="highlight-num">4.9 / 5</span>
                      <span className="highlight-label">Figma Community Rating</span>
                    </div>
                    <div className="highlight-box">
                      <span className="highlight-num">100%</span>
                      <span className="highlight-label">Open Source Primitives</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVITY TAB */}
              {activeTab === 'activity' && (
                <div className="tab-panel-activity">
                  <div className="current-work-card">
                    <div className="work-header">
                      <span className="work-category">{profile.currentActivity.category}</span>
                      <span className="work-time">{profile.currentActivity.timeSpent}</span>
                    </div>
                    <h3 className="work-title">{profile.currentActivity.title}</h3>
                    <div className="work-progress-bar-bg">
                      <div 
                        className="work-progress-bar-fill" 
                        style={{ width: `${profile.currentActivity.progress}%` }} 
                      />
                    </div>
                    <div className="work-footer">
                      <span className="work-branch">{profile.currentActivity.branch}</span>
                      <span className="work-percent">{profile.currentActivity.progress}% completed</span>
                    </div>
                  </div>

                  <h3 className="section-subtitle" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                    Recent Timeline
                  </h3>
                  <div className="activity-feed-list">
                    {profile.recentActivities.map((act) => (
                      <div 
                        key={act.id} 
                        className="activity-item"
                        onClick={() => onShowToast(act.title)}
                      >
                        <div className="activity-info">
                          <span className="activity-title">{act.title}</span>
                          <span className="activity-meta">{act.time}</span>
                        </div>
                        <span className="activity-badge">{act.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SOCIALS & LINKS TAB */}
              {activeTab === 'socials' && (
                <div className="tab-panel-socials">
                  <div className="links-instructions-banner">
                    <span>Click any link to inspect inside the <strong>In-App Browser</strong> with a dedicated <strong>← Back to Profile</strong> button, or launch directly in a new window.</span>
                  </div>

                  <div className="links-grid">
                    {profile.socialLinks.map((link, index) => (
                      <div
                        key={index}
                        className="glass-link-row"
                        onClick={() => setSelectedLinkForPreview(link)}
                      >
                        <div className="link-icon-wrap">
                          <div className="link-icon-badge">
                            <SocialIcon iconName={link.icon} color={link.color} />
                          </div>
                          <div className="link-text-block">
                            <span className="link-name">{link.name}</span>
                            <span className="link-handle">{link.handle}</span>
                          </div>
                        </div>

                        <div className="link-row-actions">
                          <span className="link-preview-tag">Preview & Return</span>
                          <button
                            type="button"
                            className="glass-icon-btn link-external-btn"
                            title="Open in new tab"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(link.url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Switcher Component */}
            <StatusSwitcher
              currentStatus={currentStatus}
              onSelectStatus={onSelectStatus}
              isDrawerOpen={isStatusDrawerOpen}
              setIsDrawerOpen={setIsStatusDrawerOpen}
            />
          </section>
        </div>
      </article>

      {/* In-App Browser Modal with Prominent "← Back to Profile" Button */}
      <LinkPreviewModal
        link={selectedLinkForPreview}
        onClose={() => setSelectedLinkForPreview(null)}
        onShowToast={onShowToast}
      />

      {/* Direct Message Modal */}
      <MessageModal
        profile={profile}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onShowToast={onShowToast}
      />
    </div>
  );
}
