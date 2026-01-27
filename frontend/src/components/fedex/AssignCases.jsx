import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography
} from '@mui/material';
import FedExLogo from '../common/FedExLogo.jsx';
import { api } from '../../services/api.js';

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

export default function AssignCases() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dcas, setDcas] = useState([]);
  const [cases, setCases] = useState([]);

  // local “Assigned DCA” display for this screen
  const [assignedMap, setAssignedMap] = useState(() => ({}));

  const [modalOpen, setModalOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);

  const [selectedDcaId, setSelectedDcaId] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getUnassignedCases();
        if (!alive) return;
        setDcas(Array.isArray(data?.dcas) ? data.dcas : []);
        setCases(Array.isArray(data?.cases) ? data.cases : []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load unassigned cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const radioOptions = useMemo(() => {
    // Force the 4 options exactly as requested
    const preferNames = ['Chennai-South', 'Chennai-East', 'Chennai-West', 'Chennai-North'];
    const byName = new Map(dcas.map((d) => [d.name, d]));
    return preferNames
      .map((name) => byName.get(name))
      .filter(Boolean)
      .map((d) => ({ id: d.id, name: d.name }));
  }, [dcas]);

  function openAssign(caseRow) {
    setActiveCase(caseRow);
    setSelectedDcaId('');
    setAiHint('');
    setModalOpen(true);
  }

  function closeAssign() {
    setModalOpen(false);
    setActiveCase(null);
    setSelectedDcaId('');
    setAiHint('');
    setAiLoading(false);
  }

  async function runAiPriority() {
    if (!activeCase?.caseId) return;
    setAiLoading(true);
    setAiHint('');
    try {
      const res = await api.getAIRecommendations(activeCase.caseId);
      const recNames = Array.isArray(res?.recommendations) ? res.recommendations : [];
      const first = recNames[0];
      const match = dcas.find((d) => d.name === first);
      if (match) {
        setSelectedDcaId(match.id);
        setAiHint(`AI suggests: ${match.name}`);
      } else {
        setAiHint('AI suggestion unavailable.');
      }
    } catch (e) {
      setAiHint(e?.message || 'AI suggestion failed.');
    } finally {
      setAiLoading(false);
    }
  }

  async function confirmAssign() {
    if (!activeCase?.caseId || !selectedDcaId) return;
    setAiHint('');
    setAiLoading(true);
    try {
      const res = await api.assignCase({ caseId: activeCase.caseId, dcaId: selectedDcaId });
      const assignedName =
        res?.assignedDcaName || dcas.find((d) => d.id === selectedDcaId)?.name || '';

      setAssignedMap((m) => ({ ...m, [activeCase.caseId]: assignedName }));
      closeAssign();
    } catch (e) {
      setAiHint(e?.message || 'Assignment failed.');
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) return <FedExLogo label="Loading Assign Cases…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div
            className="px-3 py-2 rounded-3"
            style={{
              background: 'linear-gradient(90deg, #4d148c 0%, #ff6600 100%)',
              color: 'white',
              fontWeight: 800,
              letterSpacing: 1
            }}
          >
            FEDEX
          </div>
          <div>
            <h3 className="mb-1">Assign Cases</h3>
            <div className="muted">Assign unallocated cases to a DCA region.</div>
          </div>
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
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Ageing Bucket</th>
                  <th>Priority Score</th>
                  <th>Assigned DCA</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.caseId}>
                    <td className="fw-semibold">{c.name}</td>
                    <td>{moneyFmt(c.amount)}</td>
                    <td>{c.ageingBucket}</td>
                    <td>{c.priorityScore}</td>
                    <td>
                      <span className={assignedMap[c.caseId] ? 'fw-semibold' : 'muted'}>
                        {assignedMap[c.caseId] || ''}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-primary" onClick={() => openAssign(c)}>
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center muted py-4">
                      No unassigned cases found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onClose={closeAssign} maxWidth="sm" fullWidth>
        <DialogTitle>Assign DCA</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Case: <b>{activeCase?.caseId || '-'}</b> — {activeCase?.name || ''}
            </Typography>

            <div className="d-flex gap-2 align-items-end flex-wrap">
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="select-dca-label">Select DCA</InputLabel>
                <Select
                  labelId="select-dca-label"
                  label="Select DCA"
                  value={selectedDcaId}
                  onChange={(e) => setSelectedDcaId(e.target.value)}
                >
                  {dcas.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="outlined" onClick={runAiPriority} disabled={aiLoading}>
                {aiLoading ? 'Predicting…' : 'AI Priority'}
              </Button>
            </div>

            {aiHint ? <div className="muted small">{aiHint}</div> : null}

            <div>
              <div className="fw-semibold mb-2">Recommended regions (choose one)</div>
              <RadioGroup
                value={selectedDcaId}
                onChange={(e) => setSelectedDcaId(e.target.value)}
              >
                {radioOptions.map((o) => (
                  <FormControlLabel key={o.id} value={o.id} control={<Radio />} label={o.name} />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAssign} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={confirmAssign} disabled={!selectedDcaId || aiLoading}>
            Confirm Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

