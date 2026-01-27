import React from 'react';
import { Link } from 'react-router-dom';

export default function Reports() {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Reports</h3>
          <div className="muted">Placeholder screen (backend report APIs can be connected later).</div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      <div className="card app-card">
        <div className="card-body">
          <div className="muted">
            This page is ready for adding report widgets/exports. Tell me what reports you want
            (daily recovery, by city, by DCA, SLA breaches, etc.) and I’ll build them here.
          </div>
        </div>
      </div>
    </div>
  );
}

