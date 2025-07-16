import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled 
          ? '1px solid rgba(255, 0, 0, 0.2)' 
          : 'none',
        transition: 'all 0.3s ease',
        height: '80px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ 
        padding: '0 1rem', 
        maxWidth: '100%', 
        width: '100%',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Logo and Brand Text */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              {/* Logo Image */}
              <img 
                src="/logo.png" 
                alt="BHARAT GYM" 
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
                }}
              />
              {/* Brand Text */}
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#ffffff' }}>BHARAT</span>
                <span style={{ color: '#ff0000' }}>GYM</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center'
            }}>
              {[
                { path: '/', label: 'Home' },
                ...(user ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
                { path: '/trainers', label: 'Trainers' },
                { path: '/memberships', label: 'Memberships' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' },
                ...(user && user.email === 'adminbharatgym@gmail.com' ? [{ path: '/admin-requests', label: 'Admin' }] : [])
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: location.pathname === item.path ? '#ff0000' : '#ffffff',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff0000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = location.pathname === item.path ? '#ff0000' : '#ffffff';
                  }}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      style={{
                        position: 'absolute',
                        bottom: '-0.5rem',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#ff0000'
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Sign In/User Info */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>
                    Welcome, {user.name}
                  </span>
                  <Link
                    to="/profile"
                    style={{
                      color: '#ff0000',
                      textDecoration: 'none',
                      fontWeight: 600,
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      border: '1px solid transparent',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ff0000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'transparent',
                      color: '#ff0000',
                      border: '1px solid #ff0000',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      fontSize: '0.9rem'
                    }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link to="/signin" style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7rem 1.5rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 8px rgba(255,0,0,0.10)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  Sign In
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && !isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-menu-button"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              ☰
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate={isMobileMenuOpen ? "open" : "closed"}
            className="mobile-menu-container"
            style={{
              display: isMobileMenuOpen ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '1rem',
              borderRadius: '0 0 12px 12px',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1001
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                position: 'absolute',
                top: 10,
                right: 16,
                cursor: 'pointer',
                zIndex: 1002
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
            {[
              { path: '/', label: 'Home' },
              ...(user ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
              { path: '/trainers', label: 'Trainers' },
              { path: '/memberships', label: 'Memberships' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' },
              ...(user && user.email === 'adminbharatgym@gmail.com' ? [{ path: '/admin-requests', label: 'Admin' }] : [])
            ].map((item) => (
              <motion.div key={item.path} variants={menuItemVariants}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: location.pathname === item.path ? '#ff0000' : '#ffffff',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    padding: '0.75rem 0',
                    display: 'block',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff0000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = location.pathname === item.path ? '#ff0000' : '#ffffff';
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile User Actions */}
            {user ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: '0.5rem'
              }}>
                <span style={{ 
                  color: '#ffffff', 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  textAlign: 'center',
                  marginBottom: '0.5rem'
                }}>
                  Welcome, {user.name}
                </span>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: '#ff0000',
                    textDecoration: 'none',
                    fontWeight: 600,
                    padding: '0.75rem',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    border: '1px solid #ff0000',
                    fontSize: '1rem',
                    textAlign: 'center',
                    display: 'block'
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    color: '#ff0000',
                    border: '1px solid #ff0000',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link 
                to="/signin" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 8px rgba(255,0,0,0.10)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '0.5rem'
                }}
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 