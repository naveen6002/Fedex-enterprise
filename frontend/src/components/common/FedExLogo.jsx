import React from 'react';

export default function FedExLogo({ label = 'Assigning cases…' }) {
  return (
    <div className="loader-wrap">
      <div className="fedex-van" aria-hidden="true" />
      <div className="money-chip" aria-hidden="true" />
      <div className="muted">{label}</div>
    </div>
  );
}

