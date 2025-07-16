import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';
import { useUser } from '../context/UserContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'reset' | 'done'>('email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { resetPassword } = useUser();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setStep('reset');
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const result = await resetPassword(email, newPassword);
    if (result) {
      setError(result);
      setStep('email');
      return;
    }
    setError('');
    setStep('done');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="auth-container premium-bg" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form className="auth-form premium-form" onSubmit={step === 'email' ? handleEmailSubmit : handleResetSubmit} style={{
          background: '#181818',
          border: '2px solid #ff0000',
          boxShadow: '0 2px 8px rgba(255,0,0,0.08)',
        }}>
          <h2 className="premium-title">Reset Password</h2>
          {error && <div className="auth-error">{error}</div>}
          {step === 'email' && (
            <>
              <p className="auth-description">
                Enter your email address to reset your password.
              </p>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="premium-input"
              />
              <button type="submit" className="premium-btn">Continue</button>
              <div className="auth-links">
                <span>Remember your password? <Link to="/signin">Sign In</Link></span>
                <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
              </div>
            </>
          )}
          {step === 'reset' && (
            <>
              <p className="auth-description">
                Enter your new password below.
              </p>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="premium-input"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="premium-input"
              />
              <button type="submit" className="premium-btn">Reset Password</button>
              <div className="auth-links">
                <span>Back to <Link to="/signin">Sign In</Link></span>
              </div>
            </>
          )}
          {step === 'done' && (
            <div className="auth-success">
              <p>Password has been reset successfully!</p>
              <button 
                type="button" 
                className="premium-btn"
                onClick={() => navigate('/signin')}
              >
                Back to Sign In
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 