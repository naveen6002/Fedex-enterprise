import React, { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MEMBER_TYPES } from '../../utils/constants.js';
import { useAuth } from '../../services/auth.jsx';

export default function LoginPage() {
  const auth = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const stateFrom = location.state?.from?.pathname;
    return typeof stateFrom === 'string' ? stateFrom : null;
  }, [location.state]);

  const [memberType, setMemberType] = useState(MEMBER_TYPES.FEDEX);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (auth.isAuthed) {
    const fallback = auth.isFedEx ? '/fedex/dashboard' : '/dca/dashboard';
    return <Navigate to={from || fallback} replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await auth.login({ username, password, memberType });
      const dest =
        memberType === MEMBER_TYPES.FEDEX ? '/fedex/dashboard' : '/dca/dashboard';
      nav(from || dest, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card app-card">
          <div className="card-body p-4">
            <h4 className="mb-1">Sign in</h4>
            <div className="muted mb-4">Choose member type and continue.</div>

            {error ? (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Member type</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberType"
                      id="member-fedex"
                      checked={memberType === MEMBER_TYPES.FEDEX}
                      onChange={() => setMemberType(MEMBER_TYPES.FEDEX)}
                    />
                    <label className="form-check-label" htmlFor="member-fedex">
                      FedEx Member
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="memberType"
                      id="member-dca"
                      checked={memberType === MEMBER_TYPES.DCA}
                      onChange={() => setMemberType(MEMBER_TYPES.DCA)}
                    />
                    <label className="form-check-label" htmlFor="member-dca">
                      DCA Member
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Login'}
              </button>
              <div className="muted small mt-3">
                Tip: mock mode is enabled in dev by default.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

