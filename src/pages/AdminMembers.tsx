import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface Member {
  name: string;
  email: string;
  plan: string;
  planStart?: string;
  planEnd?: string;
}

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'adminbharatgym@gmail.com') {
      navigate('/');
      return;
    }
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const all = snapshot.docs.map(doc => doc.data() as Member);
      setMembers(all.filter(u => u.email !== 'adminbharatgym@gmail.com'));
    };
    fetchMembers();
  }, [user, navigate]);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.plan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '60px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#181818', borderRadius: 16, boxShadow: '0 8px 32px rgba(255,0,0,0.10)', padding: '2.5rem 2rem' }}>
        <h1 style={{ color: '#ff0000', fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 32, textAlign: 'center', textShadow: '0 2px 24px #ff0000' }}>
          Current Members (Admin)
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search by name, email, or plan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #ff0000', fontSize: '1.1rem', marginRight: 16, background: '#222', color: '#fff' }}
          />
        </div>
        <div style={{ overflowX: 'auto', borderRadius: 8, boxShadow: '0 2px 12px rgba(255,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#222', color: '#fff', fontSize: '1.05rem' }}>
            <thead>
              <tr style={{ background: '#1a1a1a', color: '#ff0000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                <th style={{ padding: '1rem 0.5rem' }}>Email</th>
                <th style={{ padding: '1rem 0.5rem' }}>Plan</th>
                <th style={{ padding: '1rem 0.5rem' }}>Plan Start</th>
                <th style={{ padding: '1rem 0.5rem' }}>Plan Expiry</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#ff0000', fontWeight: 700 }}>
                    No members found.
                  </td>
                </tr>
              ) : (
                filtered.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #333', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.8rem 0.5rem', fontWeight: 700 }}>{m.name}</td>
                    <td style={{ padding: '0.8rem 0.5rem' }}>{m.email}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#ff0000', fontWeight: 700 }}>{m.plan || 'None'}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#ccc' }}>{m.planStart ? new Date(m.planStart).toLocaleDateString() : '-'}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#ccc' }}>{m.planEnd ? new Date(m.planEnd).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers; 