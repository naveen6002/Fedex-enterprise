import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import LoginPage from './components/auth/LoginPage.jsx';

import FedExDashboard from './components/fedex/FedExDashboard.jsx';
import OverallCases from './components/fedex/OverallCases.jsx';
import AssignCases from './components/fedex/AssignCases.jsx';
import MonitorCases from './components/fedex/MonitorCases.jsx';
import ReassignCases from './components/fedex/ReassignCases.jsx';
import Reports from './components/fedex/Reports.jsx';

import DCADashboard from './components/dca/DCADashboard.jsx';
import AssignedCases from './components/dca/AssignedCases.jsx';
import CaseDetails from './components/dca/CaseDetails.jsx';
import Performance from './components/dca/Performance.jsx';
import CaseClosure from './components/dca/CaseClosure.jsx';

import { MEMBER_TYPES } from './utils/constants.js';
import { useAuth } from './services/auth.jsx';

function RequireAuth({ children, memberType }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthed) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (memberType && auth.memberType !== memberType) {
    const fallback =
      auth.memberType === MEMBER_TYPES.FEDEX ? '/fedex/dashboard' : '/dca/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}

function AppShell({ children }) {
  const auth = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <Link className="navbar-brand" to={auth.isAuthed ? (auth.isFedEx ? '/fedex/dashboard' : '/dca/dashboard') : '/'}>
            FedEx / DCA Dashboard
          </Link>

          <div className="d-flex align-items-center gap-3">
            {auth.isAuthed ? (
              <>
                <span className="text-white-50 small">
                  {auth.username ? `Signed in as ${auth.username}` : 'Signed in'}
                </span>
                <button className="btn btn-sm btn-outline-light" onClick={() => auth.logout()}>
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="container py-4">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* FedEx routes */}
        <Route
          path="/fedex/dashboard"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <FedExDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/fedex/overall-cases"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <OverallCases />
            </RequireAuth>
          }
        />
        <Route
          path="/fedex/assign-cases"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <AssignCases />
            </RequireAuth>
          }
        />
        <Route
          path="/fedex/monitor-cases"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <MonitorCases />
            </RequireAuth>
          }
        />
        <Route
          path="/fedex/reassign"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <ReassignCases />
            </RequireAuth>
          }
        />
        <Route
          path="/fedex/reports"
          element={
            <RequireAuth memberType={MEMBER_TYPES.FEDEX}>
              <Reports />
            </RequireAuth>
          }
        />

        {/* DCA routes */}
        <Route
          path="/dca/dashboard"
          element={
            <RequireAuth memberType={MEMBER_TYPES.DCA}>
              <DCADashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/dca/assigned-cases"
          element={
            <RequireAuth memberType={MEMBER_TYPES.DCA}>
              <AssignedCases />
            </RequireAuth>
          }
        />
        <Route
          path="/dca/case-details/:id"
          element={
            <RequireAuth memberType={MEMBER_TYPES.DCA}>
              <CaseDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/dca/performance"
          element={
            <RequireAuth memberType={MEMBER_TYPES.DCA}>
              <Performance />
            </RequireAuth>
          }
        />
        <Route
          path="/dca/case-closure"
          element={
            <RequireAuth memberType={MEMBER_TYPES.DCA}>
              <CaseClosure />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

