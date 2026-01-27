import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import FedExLogo from '../common/FedExLogo.jsx';

export default function ReassignCases() {
  const [caseId, setCaseId] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function onEscalate(e) {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);
    try {
      const res = await api.escalateCase({ caseId, reason });
      setMsg(`Escalated ${res.caseId} successfully.`);
      setCaseId('');
      setReason('');
    } catch (err) {
      setError(err?.message || 'Escalation failed.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <FedExLogo label="Escalating… (loading)" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Reassign / Escalate</h3>
          <div className="muted">
            No backend reassign flow yet — use escalation to notify FedEx when DCA can’t manage the
            case (not responding).
          </div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {msg ? (
        <div className="alert alert-success mb-0" role="alert">
          {msg}
        </div>
      ) : null}
      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="card app-card">
        <div className="card-body">
          <h5 className="mb-3">Escalate Case</h5>
          <form onSubmit={onEscalate} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label">Case ID</label>
              <input
                className="form-control"
                placeholder="e.g. FX-3002"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Reason (why DCA can’t handle)</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Customer not responding / not cooperating / needs escalation…"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-danger" type="submit">
                Escalate
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setCaseId('');
                  setReason('');
                  setError('');
                  setMsg('');
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

