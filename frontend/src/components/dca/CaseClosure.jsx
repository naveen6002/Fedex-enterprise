import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PiggyBankLoader from '../common/PiggyBankLoader.jsx';
import { api } from '../../services/api.js';

const BANKS = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'Canara'];
const PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'];

export default function CaseClosure() {
  const [mode, setMode] = useState(''); // 'bank' | 'work'
  const [loading, setLoading] = useState(false);

  const [caseId, setCaseId] = useState('FX-2001');

  const [bankName, setBankName] = useState(BANKS[0]);
  const [paidAmount, setPaidAmount] = useState('');

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [daysTaken, setDaysTaken] = useState('');
  const [notes, setNotes] = useState('');

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function submitBank(e) {
    e.preventDefault();
    setMsg('');
    setError('');
    setLoading(true);
    try {
      await api.submitBankProof(caseId, { bankName, paidAmount: Number(paidAmount) });
      setMsg('Bank proof submitted successfully.');
    } catch (err) {
      setError(err?.message || 'Failed to submit bank proof.');
    } finally {
      setLoading(false);
    }
  }

  async function submitWork(e) {
    e.preventDefault();
    setMsg('');
    setError('');
    setLoading(true);
    try {
      await api.submitWorkProof(caseId, {
        paymentMethod,
        daysTaken: Number(daysTaken),
        notes
      });
      setMsg('Work done proof submitted successfully.');
    } catch (err) {
      setError(err?.message || 'Failed to submit work proof.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <PiggyBankLoader label="Submitting… (loading)" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Case Closure</h3>
          <div className="muted">
            Submit <b>Bank proof</b> and <b>Work done proof</b> for closed cases.
          </div>
        </div>
        <Link className="btn btn-outline-secondary" to="/dca/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {msg ? (
        <div className="alert alert-success mb-0" role="alert">
          {msg}
        </div>
      ) : null}
      {error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : null}

      <div className="card app-card">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <button
              className={`btn ${mode === 'bank' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setMode('bank')}
              type="button"
            >
              Bank Proof
            </button>
            <button
              className={`btn ${mode === 'work' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setMode('work')}
              type="button"
            >
              Work Done Proof
            </button>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Case ID</label>
              <input
                className="form-control"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              />
            </div>
          </div>

          {!mode ? (
            <div className="muted">Select Bank proof or Work done proof to continue.</div>
          ) : null}

          {mode === 'bank' ? (
            <form onSubmit={submitBank} className="d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Bank name</label>
                  <select
                    className="form-select"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    {BANKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Paid amount</label>
                  <input
                    className="form-control"
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-success" type="submit">
                Submit Bank Proof
              </button>
            </form>
          ) : null}

          {mode === 'work' ? (
            <form onSubmit={submitWork} className="d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Payment method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Days taken to complete work</label>
                  <input
                    className="form-control"
                    type="number"
                    value={daysTaken}
                    onChange={(e) => setDaysTaken(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Extra notes (optional)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="UPI reference, customer confirmation, visit summary, etc."
                  />
                </div>
              </div>

              <button className="btn btn-success" type="submit">
                Submit Work Done Proof
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

