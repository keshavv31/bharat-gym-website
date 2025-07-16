import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface FreeTrialFormProps {
  onSuccess: () => void;
}

const FreeTrialForm: React.FC<FreeTrialFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !phone || !email || !date) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      await addDoc(collection(db, 'freeTrialRequests'), {
        name,
        phone,
        email,
        date,
        created: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1200);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: '#ff0000', marginBottom: 8 }}>{error}</div>}
      {success ? (
        <div style={{ color: '#00b300', marginBottom: 8 }}>Request submitted! We will contact you soon.</div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Submit Request
          </button>
        </>
      )}
    </form>
  );
};

export default FreeTrialForm; 