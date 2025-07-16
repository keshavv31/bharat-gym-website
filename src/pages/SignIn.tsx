import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../index.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const ok = await login(email, password);
    if (!ok) {
      setError('Invalid email or password.');
      return;
    }
    setError('');
    navigate('/plan-selection');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="auth-container premium-bg" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form className="auth-form premium-form" onSubmit={handleSubmit}>
          <h2 className="premium-title">Welcome Back</h2>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="premium-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="premium-input"
          />
          <button type="submit" className="premium-btn">Sign In</button>
          <div className="auth-links">
            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
            <span><Link to="/forgot-password">Forgot Password?</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 