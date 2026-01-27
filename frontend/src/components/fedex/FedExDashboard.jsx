import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { api } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

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

export default function FedExDashboard() {
  const [loading, setLoading] = useState(true);
  const [casesMenuOpen, setCasesMenuOpen] = useState(false);
  const [ageing, setAgeing] = useState(null);
  const [dcaPerf, setDcaPerf] = useState(null);
  const [sla, setSla] = useState(null);
  const [risk, setRisk] = useState(null);
  const [trend, setTrend] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [a, d, s, r, t] = await Promise.all([
          api.getAgeingBreakdown(),
          api.getDCAPerformance(),
          api.getSLAAnalysis(),
          api.getRiskPriority(),
          api.getRecoveryTrend()
        ]);
        if (!alive) return;
        setAgeing(a);
        setDcaPerf(d);
        setSla(s);
        setRisk(r);
        setTrend(t);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load dashboard.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const pieData = useMemo(() => {
    const buckets = ageing?.buckets || [];
    return buckets.map((b, idx) => ({ id: idx, label: b.label, value: b.value }));
  }, [ageing]);

  if (loading) return <LoadingSpinner label="Loading FedEx dashboard…" />;

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">FedEx Dashboard</h3>
          <div className="muted">Overview of cases, SLA, and recovery signals.</div>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="row g-3">
        {/* Left upper section */}
        <div className="col-12 col-lg-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="fw-semibold mb-3">Navigation</div>

              <div className="d-flex flex-wrap gap-2">
                <Link className="btn btn-outline-primary" to="/fedex/overall-cases">
                  Overall Cases
                </Link>

                <div
                  className="btn-group dropend"
                  onMouseEnter={() => setCasesMenuOpen(true)}
                  onMouseLeave={() => setCasesMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle"
                    aria-expanded={casesMenuOpen ? 'true' : 'false'}
                  >
                    Cases
                  </button>
                  <ul className={`dropdown-menu${casesMenuOpen ? ' show' : ''}`}>
                    <li>
                      <Link className="dropdown-item" to="/fedex/assign-cases">
                        Assign Cases
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/fedex/monitor-cases">
                        Monitor Cases
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/fedex/reassign">
                        Reassign
                      </Link>
                    </li>
                  </ul>
                </div>

                <Link className="btn btn-outline-primary" to="/fedex/reports">
                  Reports
                </Link>
              </div>

              <div className="muted small mt-3">
                Tip: the “Cases” menu opens as a right-side popup (dropend).
              </div>
            </div>
          </div>
        </div>

        {/* Right upper section */}
        <div className="col-12 col-lg-6">
          <div className="card app-card h-100">
            <div className="card-body">
              <div className="fw-semibold mb-2">Ageing Breakdown</div>
              <div className="muted small mb-2">Percentage split by bucket.</div>

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

      {/* Bottom section */}
      <div className="row g-3">
        <div className="col-12 col-lg-3">
          <StatCard title="DCA Performance">
            <div className="d-flex flex-column gap-1">
              <div>
                <span className="muted">Active DCA:</span> <b>{dcaPerf?.activeDca ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Best DCA:</span> <b>{dcaPerf?.bestDca ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Worst DCA:</span> <b>{dcaPerf?.worstDca ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Avg Recovery Rate:</span>{' '}
                <b>{dcaPerf?.averageRecoveryRate != null ? `${Math.round(dcaPerf.averageRecoveryRate * 100)}%` : '-'}</b>
              </div>
            </div>
          </StatCard>
        </div>

        <div className="col-12 col-lg-3">
          <StatCard title="SLA Analysis">
            <div className="d-flex flex-column gap-1">
              <div>
                <span className="muted">On time:</span> <b>{sla?.onTime ?? '-'}</b>
              </div>
              <div>
                <span className="muted">At risk:</span> <b>{sla?.atRisk ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Breached:</span> <b>{sla?.breached ?? '-'}</b>
              </div>
            </div>
          </StatCard>
        </div>

        <div className="col-12 col-lg-3">
          <StatCard title="Risk and Priority">
            <div className="d-flex flex-column gap-1">
              <div>
                <span className="muted">High:</span> <b>{risk?.high ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Medium:</span> <b>{risk?.medium ?? '-'}</b>
              </div>
              <div>
                <span className="muted">Low:</span> <b>{risk?.low ?? '-'}</b>
              </div>
            </div>
          </StatCard>
        </div>

        <div className="col-12 col-lg-3">
          <StatCard title="Recovery Trend">
            <div style={{ height: 190 }}>
              <LineChart
                xAxis={[{ scaleType: 'point', data: trend?.labels || [] }]}
                series={(trend?.series || []).map((s) => ({
                  data: s.data,
                  label: s.label
                }))}
                height={190}
              />
            </div>
          </StatCard>
        </div>
      </div>
    </div>
  );
}

