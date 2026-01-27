import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import PiggyBankLoader from '../common/PiggyBankLoader.jsx';

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

export default function Performance() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.getPerformance();
        if (!alive) return;
        setData(res);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load performance.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <PiggyBankLoader label="Loading performance…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Performance</h3>
          <div className="muted">Summary of case handling and recovery.</div>
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

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="muted small">Total no. of cases handling</div>
              <div className="fs-3 fw-bold">{data?.totalCasesHandling ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="muted small">Total no. of cases closed</div>
              <div className="fs-3 fw-bold">{data?.totalCasesClosed ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="muted small">Recovery total</div>
              <div className="fs-3 fw-bold">{moneyFmt(data?.recoveryTotal)}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="muted small">SLA breaches happened</div>
              <div className="fs-3 fw-bold">{data?.slaBreaches ?? '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

