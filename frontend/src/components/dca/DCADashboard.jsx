import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { api } from '../../services/api.js';
import PiggyBankLoader from '../common/PiggyBankLoader.jsx';

function StatCard({ title, children }) {
  return (
    <div className="card app-card h-100">
      <div className="card-body">
        <div className="fw-semibold mb-2">{title}</div>
        {children}
      </div>
    </div>
  );
}

export default function DCADashboard() {
  const [loading, setLoading] = useState(true);
  const [perf, setPerf] = useState(null);
  const [ageing, setAgeing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [p, a] = await Promise.all([api.getPerformance(), api.getAgeingBreakdown()]);
        if (!alive) return;
        setPerf(p);
        setAgeing(a);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load DCA dashboard.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <PiggyBankLoader label="Loading DCA dashboard…" />;

  const pieData = (ageing?.buckets || []).map((b, idx) => ({
    id: idx,
    label: b.label,
    value: b.value
  }));

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">DCA Dashboard</h3>
          <div className="muted">Assigned work, ageing bucket, SLA analysis and performance.</div>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="row g-3">
        {/* Left upward */}
        <div className="col-12 col-lg-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="fw-semibold mb-3">Actions</div>
              <div className="d-flex flex-wrap gap-2">
                <Link className="btn btn-outline-primary" to="/dca/assigned-cases">
                  Assigned Cases
                </Link>
                <Link className="btn btn-outline-primary" to="/dca/case-closure">
                  Case Closure
                </Link>
                <Link className="btn btn-outline-primary" to="/dca/performance">
                  Performance
                </Link>
              </div>
              <div className="muted small mt-3">
                Tip: Assigned Cases / Case Closure pages show the piggy-bank buffering animation.
              </div>
            </div>
          </div>
        </div>

        {/* Right upward */}
        <div className="col-12 col-lg-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="fw-semibold mb-2">Ageing Bucket</div>
              <div className="muted small mb-2">Percentage split (mock data for now).</div>
              <div style={{ height: 240 }}>
                <PieChart
                  series={[
                    {
                      data: pieData,
                      innerRadius: 55,
                      outerRadius: 90,
                      paddingAngle: 2,
                      cornerRadius: 3
                    }
                  ]}
                  height={240}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <StatCard title="SLA Analysis (placeholder)">
            <div className="muted">
              SLA analysis widgets will be connected once your backend provides DCA SLA endpoints.
            </div>
          </StatCard>
        </div>
        <div className="col-12 col-lg-6">
          <StatCard title="Overall DCA Performance">
            <div className="d-flex flex-column gap-1">
              <div>
                <span className="muted">Cases handling:</span>{' '}
                <b>{perf?.totalCasesHandling ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Cases closed:</span> <b>{perf?.totalCasesClosed ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Recovery total:</span>{' '}
                <b>
                  {perf?.recoveryTotal != null
                    ? `₹ ${Number(perf.recoveryTotal).toLocaleString()}`
                    : '-'}
                </b>
              </div>
              <div>
                <span className="muted">SLA breaches:</span> <b>{perf?.slaBreaches ?? '-'}</b>
              </div>
            </div>
          </StatCard>
        </div>
      </div>
    </div>
  );
}

