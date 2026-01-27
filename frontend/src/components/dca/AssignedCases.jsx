import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';
import PiggyBankLoader from '../common/PiggyBankLoader.jsx';

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function dateFmt(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return '—';
  }
}

export default function AssignedCases() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getAssignedCases();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load assigned cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <PiggyBankLoader label="Loading assigned cases…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Assigned Cases</h3>
          <div className="muted">All cases assigned to this DCA member.</div>
        </div>
        <Link className="btn btn-outline-secondary" to="/dca/dashboard">
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
                  <th>Case ID</th>
                  <th>Customer Name</th>
                  <th>Due Amount</th>
                  <th>Priority Score</th>
                  <th>SLA Deadline</th>
                  <th>Call Made (days)</th>
                  <th>Home Visit</th>
                  <th>Last Email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.caseId}>
                    <td className="fw-semibold">{r.caseId}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 fw-semibold"
                        onClick={() => nav(`/dca/case-details/${r.caseId}`)}
                      >
                        {r.customerName}
                      </button>
                    </td>
                    <td>{moneyFmt(r.dueAmount)}</td>
                    <td>{r.priorityScore}</td>
                    <td>{dateFmt(r.slaDeadline)}</td>
                    <td>{(r.callMadeDays || []).join(', ') || '—'}</td>
                    <td>{r.homeVisitDone ? 'Done' : 'No'}</td>
                    <td>{dateFmt(r.lastEmailSent)}</td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center muted py-4">
                      No assigned cases found.
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

