import { useEffect, useState } from 'react';
import api from '../services/api';

const EMPTY = { company: '', roleTitle: '', status: 'APPLIED', appliedDate: new Date().toISOString().slice(0, 10), jobUrl: '', notes: '' };
const statuses = ['SAVED','APPLIED','SCREENING','ASSESSMENT','INTERVIEW','OFFER','REJECTED','WITHDRAWN'];

export default function Dashboard() {
  const [summary, setSummary] = useState({ total: 0, applied: 0, interviews: 0, offers: 0, rejected: 0 });
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [s, a] = await Promise.all([api.get('/applications/summary'), api.get('/applications', { params: { keyword, status } })]);
      setSummary(s.data); setApps(a.data); setError('');
    } catch (err) { setError(err.response?.data?.message || 'Could not load applications'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [keyword, status]);

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editingId) await api.put(`/applications/${editingId}`, form);
      else await api.post('/applications', form);
      setForm(EMPTY); setEditingId(null); await load();
    } catch (err) { setError(err.response?.data?.message || 'Could not save application'); }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({ company: item.company, roleTitle: item.roleTitle, status: item.status, appliedDate: item.appliedDate, jobUrl: item.jobUrl || '', notes: item.notes || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try { await api.delete(`/applications/${id}`); await load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  return <main className="page">
    <section className="hero">
      <div><p className="eyebrow">JOB SEARCH COMMAND CENTER</p><h1>Stay organized. Follow up. Get hired.</h1><p className="muted">A full-stack portfolio application built with React, Spring Boot, JPA/Hibernate and MySQL.</p></div>
      <div className="hero-badge">JWT + REST + SQL</div>
    </section>

    {error && <div className="alert error">{error}</div>}

    <section className="stats">
      <Stat title="Total" value={summary.total} /><Stat title="Applied" value={summary.applied} /><Stat title="Interviews" value={summary.interviews} /><Stat title="Offers" value={summary.offers} /><Stat title="Rejected" value={summary.rejected} />
    </section>

    <section className="panel">
      <div className="panel-head"><div><h2>{editingId ? 'Edit application' : 'Add application'}</h2><p className="muted">One record = one job opportunity.</p></div>{editingId && <button className="secondary" onClick={() => { setEditingId(null); setForm(EMPTY); }}>Cancel edit</button>}</div>
      <form className="grid-form" onSubmit={submit}>
        <Field label="Company" value={form.company} onChange={v => setForm({ ...form, company: v })} required />
        <Field label="Role title" value={form.roleTitle} onChange={v => setForm({ ...form, roleTitle: v })} required />
        <label>Status<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
        <label>Applied date<input type="date" value={form.appliedDate} onChange={e => setForm({ ...form, appliedDate: e.target.value })} required /></label>
        <Field label="Job URL" value={form.jobUrl} onChange={v => setForm({ ...form, jobUrl: v })} />
        <label className="span-2">Notes<textarea rows="3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></label>
        <div className="span-2"><button className="primary">{editingId ? 'Update application' : 'Save application'}</button></div>
      </form>
    </section>

    <section className="panel">
      <div className="panel-head"><div><h2>Applications</h2><p className="muted">Search and filter the jobs you are tracking.</p></div><div className="filters"><input placeholder="Search company or role" value={keyword} onChange={e => setKeyword(e.target.value)} /><select value={status} onChange={e => setStatus(e.target.value)}><option value="">All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></div></div>
      {loading ? <p className="muted">Loading…</p> : apps.length === 0 ? <div className="empty">No applications yet. Add your first one above.</div> : <div className="table-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Status</th><th>Date</th><th>Link</th><th>Actions</th></tr></thead><tbody>{apps.map(item => <tr key={item.id}><td>{item.company}</td><td>{item.roleTitle}</td><td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td><td>{item.appliedDate}</td><td>{item.jobUrl ? <a href={item.jobUrl} target="_blank" rel="noreferrer">Open</a> : '—'}</td><td><button className="table-btn" onClick={() => edit(item)}>Edit</button><button className="table-btn danger" onClick={() => remove(item.id)}>Delete</button></td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}

function Stat({ title, value }) { return <div className="stat"><span>{title}</span><strong>{value}</strong></div>; }
function Field({ label, value, onChange, required=false }) { return <label>{label}<input value={value} onChange={e => onChange(e.target.value)} required={required} /></label>; }
