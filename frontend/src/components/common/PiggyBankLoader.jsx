import React from 'react';

export default function PiggyBankLoader({ label = 'Loading…' }) {
  return (
    <div className="loader-wrap">
      <div className="coin" aria-hidden="true" />
      <div className="piggy" aria-hidden="true" />
      <div className="muted">{label}</div>
    </div>
  );
}

