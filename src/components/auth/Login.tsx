import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          {/* Text-based logo instead of image */}
          <div className="logo-text" style={{ marginBottom: '1rem' }}>
            <h1 style={{ 
              color: '#005AFF', 
              fontSize: '2.5rem', 
              margin: 0,
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}>NOKIA</h1>
            <p style={{ 
              color: '#6B7280', 
              fontSize: '0.9rem', 
              margin: 0,
              fontWeight: '500'
            }}>Rollout Management</p>
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nokia Rollout Management</h1>
          <p style={{ color: '#6B7280' }}>Project Rollout and Activity Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Developed by Engr. John Carlo Rabanes, ECE</p>
          <p className="nokia-copyright">© 2024 Nokia Shanghai Bell</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
