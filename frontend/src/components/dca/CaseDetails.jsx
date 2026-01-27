import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../services/api.js';
import PiggyBankLoader from '../common/PiggyBankLoader.jsx';

export default function CaseDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getCaseDetails(id);
        if (!alive) return;
        setRow(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load case details.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) return <PiggyBankLoader label="Loading case details…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Case Details</h3>
          <div className="muted">Detailed view for customer and SLA status.</div>
        </div>
        <Link className="btn btn-outline-secondary" to="/dca/assigned-cases">
          Back to Assigned Cases
        </Link>
      </div>

      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="card app-card">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="muted small">Customer ID</div>
              <div className="fw-semibold">{row?.customerId || '-'}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="muted small">Customer Name</div>
              <div className="fw-semibold">{row?.customerName || '-'}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="muted small">DCA Staff Name</div>
              <div className="fw-semibold">{row?.dcaStaffName || '-'}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="muted small">SLA Status</div>
              <div className="fw-semibold">{row?.slaStatus || '-'}</div>
            </div>

            <div className="col-12">
              <hr />
              <div className="fw-semibold mb-2">Additional Details</div>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="muted small">City</div>
                  <div>{row?.details?.city || '-'}</div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="muted small">Phone</div>
                  <div>{row?.details?.phone || '-'}</div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="muted small">Email</div>
                  <div>{row?.details?.email || '-'}</div>
                </div>
                <div className="col-12">
                  <div className="muted small">Notes</div>
                  <div>{row?.details?.notes || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

