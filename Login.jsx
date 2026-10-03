import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setBusy(false); }
  };

  return <main className="auth-page">
    <form className="auth-card" onSubmit={submit}>
      <p className="eyebrow">JAVA FULL STACK PORTFOLIO</p>
      <h1>Welcome back</h1>
      <p className="muted">Track every application from saved to offer.</p>
      {error && <div className="alert error">{error}</div>}
      <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      <button className="primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      <p className="muted">New here? <Link to="/register">Create an account</Link></p>
    </form>
  </main>;
}
