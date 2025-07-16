import React, { useState, FormEvent, FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';
import { useUser } from '../context/UserContext';

const SignUp: FC = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const regError = await register(name, email, password);
    if (regError) {
      setError(regError);
      return;
    }
    setError('');
    navigate('/signin');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="auth-container premium-bg" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form className="auth-form premium-form" onSubmit={handleSubmit} style={{
          background: '#181818',
          border: '2px solid #ff0000',
          boxShadow: '0 2px 8px rgba(255,0,0,0.08)',
        }}>
          <h2 className="premium-title">Create Your Account</h2>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="premium-input"
          />
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
          <button type="submit" className="premium-btn">Sign Up</button>
          <div className="auth-links">
            <span>Already have an account? <Link to="/signin">Sign In</Link></span>
            <span><Link to="/forgot-password">Forgot Password?</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 