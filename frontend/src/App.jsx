import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://jobfinder-production-b62d.up.railway.app';

// ── Reusable Ad Components ──────────────────────────────────────────

// 728x90 Top Banner
function TopBannerAd() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = 'true';
    window.atOptions = {
      key: '8000e87fbdc97fc345d0213ffbfe592f',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    };
    const s = document.createElement('script');
    s.src = 'https://www.highperformanceformat.com/8000e87fbdc97fc345d0213ffbfe592f/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} style={{ textAlign: 'center', marginBottom: '25px', minHeight: '90px' }} />;
}

// Native Banner – In-Feed
function NativeBannerAd() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = 'true';
    const s = document.createElement('script');
    s.async = true;
    s.dataset.cfasync = 'false';
    s.src = 'https://pl28872934.effectivegatecpm.com/e284ba0ec8bd6b0e7a9b4ddae8309f9b/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return (
    <div style={{ margin: '10px 0' }}>
      <div ref={ref} />
      <div id="container-e284ba0ec8bd6b0e7a9b4ddae8309f9b" />
    </div>
  );
}

// 300x250 Rectangle
function RectangleAd() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = 'true';
    window.atOptions = {
      key: '1c1bd31425eabb4929daa9bf7cc527bd',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };
    const s = document.createElement('script');
    s.src = 'https://www.highperformanceformat.com/1c1bd31425eabb4929daa9bf7cc527bd/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return (
    <div style={{ textAlign: 'center', margin: '30px 0', minHeight: '250px' }}>
      <p style={{ fontSize: '10px', color: '#94a3b8', margin: '0 0 10px 0' }}>ADVERTISEMENT</p>
      <div ref={ref} style={{ display: 'inline-block' }} />
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────

function Navbar({ isAdmin }) {
  const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
  return (
    <nav style={{ backgroundColor: '#2c3e50', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>
        JobFinder<span style={{ color: '#27ae60' }}>.</span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>Browse Jobs</Link>
        {(isAuth || isAdmin) && (
          <Link
            to="/admin"
            style={{
              backgroundColor: isAdmin ? '#27ae60' : '#34495e',
              color: 'white', padding: '8px 16px', textDecoration: 'none',
              borderRadius: '6px', fontWeight: '600', fontSize: '14px'
            }}
          >
            {isAdmin ? 'Admin Dashboard' : 'Admin Area'}
          </Link>
        )}
      </div>
    </nav>
  );
}

// ── JobList ──────────────────────────────────────────────────────────

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then(r => r.json())
      .then(data => { setJobs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar isAdmin={false} />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>

        {/* TOP BANNER AD */}
        <TopBannerAd />

        <h1 style={{ color: '#1a202c', marginBottom: '30px', fontSize: '28px', fontWeight: '800' }}>Featured Opportunities</h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#718096' }}>Scanning database...</div>
        ) : jobs.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '50px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#4a5568', fontSize: '18px' }}>No active listings found.</p>
            <p style={{ color: '#718096' }}>Access the admin panel to post your first job.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {jobs.map((job, index) => (
              <React.Fragment key={job._id}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <h2 style={{ margin: '0 0 8px 0', color: '#2b6cb0', fontSize: '22px' }}>{job.title}</h2>
                  <p style={{ margin: '0 0 20px 0', color: '#4a5568', fontWeight: '600', fontSize: '16px' }}>🏢 {job.company}</p>
                  <Link
                    to={`/job/${job._id}`}
                    style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#3182ce', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', display: 'inline-block', fontWeight: 'bold' }}
                  >
                    View Details & Apply
                  </Link>
                </div>

                {/* IN-FEED NATIVE AD — after every 2 jobs */}
                {(index + 1) % 2 === 0 && index !== jobs.length - 1 && (
                  <NativeBannerAd />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* BOTTOM NATIVE AD */}
        <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <NativeBannerAd />
        </div>

      </div>
    </div>
  );
}

// ── JobDetails ───────────────────────────────────────────────────────

 function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/jobs/${id}`)
      .then(r => r.json())
      .then(data => { setJob(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', padding: '100px' }}>Loading job details...</p>;
  if (!job) return <p style={{ textAlign: 'center', padding: '100px' }}>Job listing not found.</p>;

  // Split description into paragraphs and insert ads every 2
  const paragraphs = job.description.split('\n').filter(p => p.trim() !== '');

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Navbar isAdmin={false} />
      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '30px 20px' }}>

        <TopBannerAd />

        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#3182ce', fontWeight: 'bold', fontSize: '15px' }}>&larr; Back to Job Board</Link>

          <div style={{ marginTop: '25px', borderBottom: '2px solid #f1f5f9', paddingBottom: '25px' }}>
            <h1 style={{ color: '#1e293b', fontSize: '34px', marginBottom: '10px', lineHeight: '1.2' }}>{job.title}</h1>
            <p style={{ fontSize: '22px', color: '#64748b', margin: 0, fontWeight: '500' }}>{job.company}</p>
          </div>

          {/* 300x250 RECTANGLE AD */}
          <RectangleAd />

          {/* DESCRIPTION WITH ADS EVERY 2 PARAGRAPHS */}
          <div style={{ margin: '40px 0' }}>
            <h3 style={{ color: '#0f172a', fontSize: '22px', marginBottom: '15px' }}>Role Description</h3>
            {paragraphs.map((para, index) => (
              <React.Fragment key={index}>
                <p style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '16px' }}>
                  {para}
                </p>
                {/* Insert ad after every 2 paragraphs, not after the last one */}
                {(index + 1) % 2 === 0 && index !== paragraphs.length - 1 && (
                  <NativeBannerAd />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* PRE-APPLY NATIVE AD */}
          <div style={{ margin: '40px 0', padding: '20px', border: '2px dashed #93c5fd', borderRadius: '12px', backgroundColor: '#eff6ff' }}>
            <p style={{ fontWeight: '800', marginBottom: '12px', color: '#1d4ed8', fontSize: '14px', textTransform: 'uppercase', textAlign: 'center' }}>Recommended Links:</p>
            <NativeBannerAd />
          </div>

          <button
            onClick={() => window.open(job.applyUrl, '_blank')}
            style={{
              width: '100%', padding: '22px', backgroundColor: '#10b981',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '22px', cursor: 'pointer', fontWeight: '800',
              boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
            }}
          >
            Apply for this Job
          </button>
        </div>
      </div>
    </div>
  );
}
// ── AdminPanel ───────────────────────────────────────────────────────

function AdminPanel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', company: '', description: '', applyUrl: '' });
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAdminAuthenticated') === 'true');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      setIsLoggedIn(true);
    } else {
      alert('Incorrect Password!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('✅ Job posted successfully!');
        navigate('/');
      } else {
        alert('❌ Error saving job. Check backend console.');
      }
    } catch {
      alert('❌ Connection failed. Is your backend server running?');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="password" placeholder="Enter Admin Password"
              value={password} onChange={e => setPassword(e.target.value)}
              required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <button type="submit" style={{ padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Access Dashboard
            </button>
          </form>
          <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#3182ce', fontSize: '14px', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Navbar isAdmin={true} />
      <div style={{ maxWidth: '650px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', margin: 0 }}>Admin Dashboard</h1>
          <button onClick={handleLogout} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Create new listings to monetize your LinkedIn traffic.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#475569' }}>Position Title</label>
            <input type="text" placeholder="e.g. Senior Frontend Developer" onChange={e => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#475569' }}>Hiring Company</label>
            <input type="text" placeholder="e.g. Acme Tech Solutions" onChange={e => setFormData({ ...formData, company: e.target.value })} required style={{ width: '100%', padding: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#475569' }}>Detailed Description</label>
            <textarea rows="8" placeholder="Paste the job requirements here..." onChange={e => setFormData({ ...formData, description: e.target.value })} required style={{ width: '100%', padding: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#475569' }}>Apply Link (URL)</label>
            <input type="url" placeholder="https://company-site.com/careers/apply" onChange={e => setFormData({ ...formData, applyUrl: e.target.value })} required style={{ width: '100%', padding: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={submitting} style={{ padding: '18px', backgroundColor: '#1e293b', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
            {submitting ? 'Connecting to Database...' : '🚀 Publish Job Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── App Router ───────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
