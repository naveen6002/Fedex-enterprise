import { MEMBER_TYPES } from '../utils/constants.js';

function money(n) {
  return Math.round(n * 100) / 100;
}

const dcAList = [
  { id: 'dca-chen-s', name: 'Chennai-South' },
  { id: 'dca-chen-e', name: 'Chennai-East' },
  { id: 'dca-chen-w', name: 'Chennai-West' },
  { id: 'dca-chen-n', name: 'Chennai-North' }
];

let unassigned = [
  {
    caseId: 'FX-1001',
    name: 'Acme Industries',
    amount: money(125000.5),
    ageingBucket: '31-60',
    priorityScore: 88
  },
  {
    caseId: 'FX-1002',
    name: 'Blue Sky Traders',
    amount: money(54000),
    ageingBucket: '0-30',
    priorityScore: 62
  },
  {
    caseId: 'FX-1003',
    name: 'Crescent Retail',
    amount: money(199999.99),
    ageingBucket: '90+',
    priorityScore: 94
  }
];

let assigned = [
  {
    caseId: 'FX-2001',
    customerName: 'Delta Foods',
    dueAmount: money(78000),
    priorityScore: 79,
    slaDeadline: new Date(Date.now() + 6 * 86400000).toISOString(),
    callMadeDays: ['Mon', 'Thu'],
    homeVisitDone: false,
    lastEmailSent: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    caseId: 'FX-2002',
    customerName: 'Evergreen Exports',
    dueAmount: money(142500),
    priorityScore: 91,
    slaDeadline: new Date(Date.now() + 2 * 86400000).toISOString(),
    callMadeDays: ['Tue', 'Wed', 'Fri'],
    homeVisitDone: true,
    lastEmailSent: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

export function login({ username, password, memberType }) {
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }
  if (![MEMBER_TYPES.FEDEX, MEMBER_TYPES.DCA].includes(memberType)) {
    throw new Error('Member type is required.');
  }
  return {
    token: `mock-token-${memberType}-${Date.now()}`,
    user: { username, memberType }
  };
}

export function getAgeingBreakdown() {
  return {
    buckets: [
      { label: '0-30 Days', value: 42 },
      { label: '31-60 Days', value: 28 },
      { label: '61-90 Days', value: 18 },
      { label: '90+ Days', value: 12 }
    ]
  };
}

export function getRecoveryTrend() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const recovered = [12, 18, 15, 22, 30, 26, 33];
  const outstanding = [90, 82, 79, 70, 60, 58, 52];
  return {
    labels: days,
    series: [
      { label: 'Recovered', data: recovered },
      { label: 'Outstanding', data: outstanding }
    ]
  };
}

export function getDCAPerformance() {
  return {
    activeDca: 12,
    bestDca: 'Chennai-South',
    worstDca: 'Chennai-East',
    averageRecoveryRate: 0.63
  };
}

export function getSLAAnalysis() {
  return {
    onTime: 114,
    atRisk: 23,
    breached: 7
  };
}

export function getRiskPriority() {
  return {
    high: 18,
    medium: 45,
    low: 92
  };
}

export function getOverallCases() {
  return [
    {
      customerId: 'C-001',
      customerName: 'Acme Industries',
      priorityScore: 88,
      outstandingAmount: money(125000.5),
      slaStatus: 'At Risk',
      city: 'Chennai'
    },
    {
      customerId: 'C-002',
      customerName: 'Blue Sky Traders',
      priorityScore: 62,
      outstandingAmount: money(54000),
      slaStatus: 'On Time',
      city: 'Coimbatore'
    },
    {
      customerId: 'C-003',
      customerName: 'Crescent Retail',
      priorityScore: 94,
      outstandingAmount: money(199999.99),
      slaStatus: 'Breached',
      city: 'Madurai'
    }
  ];
}

export function getUnassignedCases() {
  return {
    dcas: dcAList,
    cases: unassigned
  };
}

export function getAIRecommendations(caseId) {
  return {
    caseId,
    recommendations: dcAList.map((d) => d.name)
  };
}

export function assignCase({ caseId, dcaId }) {
  const dca = dcAList.find((d) => d.id === dcaId);
  if (!dca) throw new Error('Invalid DCA.');

  const idx = unassigned.findIndex((c) => c.caseId === caseId);
  if (idx === -1) throw new Error('Case not found.');

  const picked = unassigned[idx];
  unassigned = unassigned.filter((c) => c.caseId !== caseId);
  assigned = [
    ...assigned,
    {
      caseId: picked.caseId,
      customerName: picked.name,
      dueAmount: picked.amount,
      priorityScore: picked.priorityScore,
      slaDeadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      callMadeDays: [],
      homeVisitDone: false,
      lastEmailSent: null,
      assignedDca: dca.name
    }
  ];

  return { ok: true, caseId, dcaId, assignedDcaName: dca.name };
}

export function getMonitorCases() {
  return [
    {
      caseId: 'FX-3001',
      customerId: 'C-001',
      overallAmount: money(125000.5),
      amountPaid: money(45000),
      amountLeft: money(80000.5),
      slaRemainingDays: 6,
      priorityScore: 88,
      actions: {
        callDays: ['Mon', 'Wed'],
        emailLastSent: new Date(Date.now() - 2 * 86400000).toISOString(),
        visitDone: false
      }
    },
    {
      caseId: 'FX-3002',
      customerId: 'C-003',
      overallAmount: money(199999.99),
      amountPaid: money(0),
      amountLeft: money(199999.99),
      slaRemainingDays: -1,
      priorityScore: 94,
      actions: {
        callDays: ['Tue', 'Thu', 'Fri'],
        emailLastSent: new Date(Date.now() - 1 * 86400000).toISOString(),
        visitDone: true
      }
    }
  ];
}

export function escalateCase({ caseId, reason }) {
  if (!caseId || !reason) throw new Error('caseId and reason required.');
  return { ok: true, caseId, escalatedAt: new Date().toISOString() };
}

export function getAssignedCases() {
  return assigned;
}

export function getCaseDetails(caseId) {
  const c = assigned.find((x) => x.caseId === caseId) || null;
  if (!c) throw new Error('Case not found.');
  return {
    caseId: c.caseId,
    customerId: `C-${c.caseId.replace('FX-', '')}`,
    customerName: c.customerName,
    dcaStaffName: 'DCA Staff - Arjun',
    slaStatus: new Date(c.slaDeadline).getTime() > Date.now() ? 'Active' : 'Breached',
    details: {
      city: 'Chennai',
      phone: '+91-90000-00000',
      email: 'accounts@customer.example',
      notes: 'Customer requested installment option.'
    }
  };
}

export function getPerformance() {
  return {
    totalCasesHandling: assigned.length,
    totalCasesClosed: 7,
    recoveryTotal: money(450000.25),
    slaBreaches: 2
  };
}

export function submitBankProof(caseId, payload) {
  if (!payload?.bankName || payload?.paidAmount == null) {
    throw new Error('bankName and paidAmount are required.');
  }
  return { ok: true, caseId, received: payload, submittedAt: new Date().toISOString() };
}

export function submitWorkProof(caseId, payload) {
  if (!payload?.paymentMethod || payload?.daysTaken == null) {
    throw new Error('paymentMethod and daysTaken are required.');
  }
  return { ok: true, caseId, received: payload, submittedAt: new Date().toISOString() };
}

