import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../index.css';
import AdminMembers from './AdminMembers';

const Profile: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: user?.plan || ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleSave = () => {
    // Placeholder: Save profile data
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;
  const isAdmin = user.email === 'adminbharatgym@gmail.com';

  return (
    <div className="premium-bg" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
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
              Your Profile
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Manage your account and track your fitness journey
            </p>
          </div>

          {/* Profile Card */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase'
              }}>
                Personal Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  background: isEditing ? '#ff0000' : 'transparent',
                  color: '#ffffff',
                  border: '1px solid #ff0000',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                    {profileData.name}
                  </p>
                )}
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Email
                </label>
                <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                  {profileData.email}
                </p>
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Fitness Plan
                </label>
                <p style={{ color: '#ff0000', fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  {profileData.fitnessGoal || 'Not Selected'}
                </p>
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                    {profileData.age || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Weight (kg)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.weight}
                    onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                    {profileData.weight || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Height (cm)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.height}
                    onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                    {profileData.height || 'Not set'}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  onClick={handleSave}
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
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Stats Card */}
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
              Your Stats
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
                  12
                </div>
                <div style={{ color: '#cccccc', fontSize: '1rem' }}>Workouts Completed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
                  85%
                </div>
                <div style={{ color: '#cccccc', fontSize: '1rem' }}>Goal Progress</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
                  4.2
                </div>
                <div style={{ color: '#cccccc', fontSize: '1rem' }}>Average Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
                  30
                </div>
                <div style={{ color: '#cccccc', fontSize: '1rem' }}>Days Streak</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => navigate('/settings')}
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
                letterSpacing: '0.08em',
                marginRight: '1rem'
              }}
            >
              Settings
            </button>
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
        {isAdmin && (
          <div style={{ marginTop: '3rem' }}>
            <AdminMembers />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 