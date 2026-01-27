import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FedExLogo from '../common/FedExLogo.jsx';
import { api } from '../../services/api.js';

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function slaBadge(remainingDays) {
  if (remainingDays == null) return 'badge text-bg-secondary';
  if (remainingDays < 0) return 'badge text-bg-danger';
  if (remainingDays <= 3) return 'badge text-bg-warning';
  return 'badge text-bg-success';
}

export default function MonitorCases() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getMonitorCases();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load monitor cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <FedExLogo label="Monitoring cases… (loading)" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Monitor Cases</h3>
          <div className="muted">
            Customer payment progress, SLA status, and actions (phone/email/visit).
          </div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="card app-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Overall Amount</th>
                  <th>Paid Status</th>
                  <th>SLA Status</th>
                  <th>Priority Score</th>
                  <th>Phone / Email / Visit</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.caseId}>
                    <td className="fw-semibold">{r.customerId}</td>
                    <td>{moneyFmt(r.overallAmount)}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="small">
                          Paid: <b>{moneyFmt(r.amountPaid)}</b>
                        </span>
                        <span className="small muted">
                          Left: <b>{moneyFmt(r.amountLeft)}</b>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={slaBadge(r.slaRemainingDays)}>
                        {r.slaRemainingDays < 0
                          ? 'Breached'
                          : r.slaRemainingDays <= 3
                            ? `At Risk (${r.slaRemainingDays} days)`
                            : `On Time (${r.slaRemainingDays} days)`}
                      </span>
                    </td>
                    <td>{r.priorityScore}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge text-bg-primary">
                          Calls: {(r.actions?.callDays || []).join(', ') || '—'}
                        </span>
                        <span className="badge text-bg-info">
                          Email: {r.actions?.emailLastSent ? 'Sent' : '—'}
                        </span>
                        <span className="badge text-bg-secondary">
                          Visit: {r.actions?.visitDone ? 'Done' : 'Not yet'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center muted py-4">
                      No monitor cases found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

