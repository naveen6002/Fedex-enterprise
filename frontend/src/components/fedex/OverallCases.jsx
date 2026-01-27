import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { api } from '../../services/api.js';

export default function OverallCases() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getOverallCases();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load overall cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LoadingSpinner label="Loading overall cases…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Overall Cases</h3>
          <div className="muted">All customers and current case posture.</div>
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
                  <th>Customer Name</th>
                  <th>Priority Score</th>
                  <th>Outstanding Amount</th>
                  <th>SLA Status</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.customerId}>
                    <td>{r.customerId}</td>
                    <td className="fw-semibold">{r.customerName}</td>
                    <td>{r.priorityScore}</td>
                    <td>₹ {Number(r.outstandingAmount || 0).toLocaleString()}</td>
                    <td>
                      <span
                        className={
                          r.slaStatus === 'Breached'
                            ? 'badge text-bg-danger'
                            : r.slaStatus === 'At Risk'
                              ? 'badge text-bg-warning'
                              : 'badge text-bg-success'
                        }
                      >
                        {r.slaStatus}
                      </span>
                    </td>
                    <td>{r.city}</td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center muted py-4">
                      No cases found.
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

