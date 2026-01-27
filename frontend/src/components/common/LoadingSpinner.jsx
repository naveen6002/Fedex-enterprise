import React from 'react';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="loader-wrap">
      <div className="spinner-border text-primary" role="status" aria-label={label} />
      <div className="muted">{label}</div>
    </div>
  );
}

