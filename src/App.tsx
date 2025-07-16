import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
import Services from './pages/Services';
import Locations from './pages/Locations';
import Memberships from './pages/Memberships';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import PlanSelection from './pages/PlanSelection';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import WorkoutDetails from './pages/WorkoutDetails';
import Settings from './pages/Settings';
import Goals from './pages/Goals';
import AdminRequests from './pages/AdminRequests';
import AdminMembers from './pages/AdminMembers';
import { UserProvider } from './context/UserContext';
import { WorkoutProvider } from './context/WorkoutContext';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500); // Show intro for 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      <WorkoutProvider>
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="intro"
              className="premium-intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Background */}
              <div className="premium-bg">
                <div className="gradient-overlay"></div>
                <div className="subtle-particles"></div>
              </div>

              {/* Main Content */}
              <motion.div
                className="intro-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Brand Text */}
                <motion.div
                  className="brand-container"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  <motion.h1
                    className="premium-brand-text"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    <span className="bharat-premium">BHARAT</span>
                    <span className="gym-premium">GYM</span>
                  </motion.h1>
                </motion.div>

                {/* Elegant Tagline */}
                <motion.p
                  className="premium-tagline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  Where Champions Are Made
                </motion.p>

                {/* Progress Bar */}
                <motion.div
                  className="progress-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                >
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, delay: 2.5 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showIntro && (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/services" element={<Services />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/memberships" element={<Memberships />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/plan-selection" element={<PlanSelection />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/workout/:day" element={<WorkoutDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/admin-requests" element={<AdminRequests />} />
                <Route path="/admin-members" element={<AdminMembers />} />
                <Route path="/book-classes" element={<Trainers />} />
              </Routes>
            </main>
            {location.pathname !== '/profile' && location.pathname !== '/settings' && <Footer />}
          </div>
        )}
      </WorkoutProvider>
    </UserProvider>
  );
}

export default App; 