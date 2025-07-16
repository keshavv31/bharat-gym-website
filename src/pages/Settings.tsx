import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../index.css';

const Settings: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisible: true,
      workoutHistory: true,
      progressStats: false
    },
    preferences: {
      theme: 'dark',
      language: 'english',
      units: 'metric'
    }
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="premium-bg" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Settings
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Manage your account preferences and privacy settings
            </p>
          </div>

          {/* Notifications Settings */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              Notifications
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Email Notifications
                  </h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Receive workout reminders and progress updates
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.email ? '#ff0000' : '#333',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: '4px',
                      bottom: '4px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: settings.notifications.email ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Push Notifications
                  </h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Get instant alerts on your device
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.push ? '#ff0000' : '#333',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: '4px',
                      bottom: '4px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: settings.notifications.push ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    SMS Notifications
                  </h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Receive text message reminders
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.notifications.sms ? '#ff0000' : '#333',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: '4px',
                      bottom: '4px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: settings.notifications.sms ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              Privacy
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Public Profile
                  </h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Allow others to view your profile
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.privacy.profileVisible}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.privacy.profileVisible ? '#ff0000' : '#333',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: '4px',
                      bottom: '4px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: settings.privacy.profileVisible ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Workout History
                  </h3>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    Share your workout history with friends
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                  <input
                    type="checkbox"
                    checked={settings.privacy.workoutHistory}
                    onChange={(e) => handleSettingChange('privacy', 'workoutHistory', e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: settings.privacy.workoutHistory ? '#ff0000' : '#333',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: '4px',
                      bottom: '4px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: settings.privacy.workoutHistory ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              Preferences
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Units
                </label>
                <select
                  value={settings.preferences.units}
                  onChange={(e) => handleSettingChange('preferences', 'units', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem'
                  }}
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, ft)</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Language
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem'
                  }}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="punjabi">Punjabi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSaveSettings}
              style={{
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Save Settings
            </button>
            {success && (
              <div style={{ color: '#00ff00', textAlign: 'center', marginBottom: '1rem', fontWeight: 700 }}>
                Settings saved!
              </div>
            )}
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#ff0000',
                border: '2px solid #ff0000',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'all 0.2s'
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 