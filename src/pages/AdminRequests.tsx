import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface Request {
  name: string;
  phone: string;
  email: string;
  plan: string;
  created: string;
}

const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'adminbharatgym@gmail.com') {
      navigate('/');
      return;
    }
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'membershipInfoRequests'));
      const reqs: Request[] = snapshot.docs.map(doc => doc.data() as Request);
      setRequests(reqs);
    };
    fetchRequests();
  }, [user, navigate]);

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search) ||
    r.plan.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const header = 'Name,Phone,Email,Plan,Date\n';
    const rows = requests.map(r =>
      [r.name, r.phone, r.email, r.plan, new Date(r.created).toLocaleString()].map(x => `"${x}"`).join(',')
    ).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'membership-requests.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '60px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#181818', borderRadius: 16, boxShadow: '0 8px 32px rgba(255,0,0,0.10)', padding: '2.5rem 2rem' }}>
        <h1 style={{ color: '#ff0000', fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 32, textAlign: 'center', textShadow: '0 2px 24px #ff0000' }}>
          Membership Enquiries (Admin)
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search by name, email, phone, or plan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #ff0000', fontSize: '1.1rem', marginRight: 16, background: '#222', color: '#fff' }}
          />
          <button
            onClick={exportCSV}
            style={{ background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)' }}
          >
            Export CSV
          </button>
        </div>
        <div style={{ overflowX: 'auto', borderRadius: 8, boxShadow: '0 2px 12px rgba(255,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#222', color: '#fff', fontSize: '1.05rem' }}>
            <thead>
              <tr style={{ background: '#1a1a1a', color: '#ff0000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                <th style={{ padding: '1rem 0.5rem' }}>Phone</th>
                <th style={{ padding: '1rem 0.5rem' }}>Email</th>
                <th style={{ padding: '1rem 0.5rem' }}>Plan</th>
                <th style={{ padding: '1rem 0.5rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#ff0000', fontWeight: 700 }}>
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #333', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.8rem 0.5rem', fontWeight: 700 }}>{r.name}</td>
                    <td style={{ padding: '0.8rem 0.5rem' }}>{r.phone}</td>
                    <td style={{ padding: '0.8rem 0.5rem' }}>{r.email}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#ff0000', fontWeight: 700 }}>{r.plan}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#ccc' }}>{new Date(r.created).toLocaleString()}</td>
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

export default AdminRequests; 