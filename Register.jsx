import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try { await register(form.name, form.email, form.password); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
  };

  return <main className="auth-page">
    <form className="auth-card" onSubmit={submit}>
      <p className="eyebrow">CREATE YOUR TRACKER</p>
      <h1>Create account</h1>
      {error && <div className="alert error">{error}</div>}
      <label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
      <label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
      <label>Password<input type="password" minLength="8" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
      <button className="primary">Create account</button>
      <p className="muted">Already registered? <Link to="/login">Sign in</Link></p>
    </form>
  </main>;
}
