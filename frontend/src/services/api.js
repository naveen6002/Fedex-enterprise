import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants.js';
import * as mocks from '../mocks/index.js';
import { sleep } from './mockDelay.js';

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.DEV === true;

const http = axios.create({
  baseURL: API_BASE_URL
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.authToken);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function mockWrap(fn) {
  await sleep(700);
  return fn();
}

export const api = {
  // Auth
  async login(payload) {
    if (USE_MOCK) return mockWrap(() => mocks.login(payload));
    const { data } = await http.post('/api/auth/login', payload);
    return data;
  },

  // FedEx
  async getOverallCases() {
    if (USE_MOCK) return mockWrap(() => mocks.getOverallCases());
    const { data } = await http.get('/api/fedex/cases/overall');
    return data;
  },
  async getUnassignedCases() {
    if (USE_MOCK) return mockWrap(() => mocks.getUnassignedCases());
    const { data } = await http.get('/api/fedex/cases/unassigned');
    return data;
  },
  async assignCase(payload) {
    if (USE_MOCK) return mockWrap(() => mocks.assignCase(payload));
    const { data } = await http.post('/api/fedex/cases/assign', payload);
    return data;
  },
  async getAIRecommendations(caseId) {
    if (USE_MOCK) return mockWrap(() => mocks.getAIRecommendations(caseId));
    const { data } = await http.get(`/api/fedex/ai-recommendations/${caseId}`);
    return data;
  },
  async getMonitorCases() {
    if (USE_MOCK) return mockWrap(() => mocks.getMonitorCases());
    const { data } = await http.get('/api/fedex/cases/monitor');
    return data;
  },
  async escalateCase(payload) {
    if (USE_MOCK) return mockWrap(() => mocks.escalateCase(payload));
    const { data } = await http.post('/api/fedex/cases/escalate', payload);
    return data;
  },
  async getDCAPerformance() {
    if (USE_MOCK) return mockWrap(() => mocks.getDCAPerformance());
    const { data } = await http.get('/api/fedex/dca/performance');
    return data;
  },
  async getSLAAnalysis() {
    if (USE_MOCK) return mockWrap(() => mocks.getSLAAnalysis());
    const { data } = await http.get('/api/fedex/sla/analysis');
    return data;
  },
  async getRiskPriority() {
    if (USE_MOCK) return mockWrap(() => mocks.getRiskPriority());
    const { data } = await http.get('/api/fedex/risk-priority');
    return data;
  },
  async getRecoveryTrend() {
    if (USE_MOCK) return mockWrap(() => mocks.getRecoveryTrend());
    const { data } = await http.get('/api/fedex/recovery-trend');
    return data;
  },
  async getAgeingBreakdown() {
    if (USE_MOCK) return mockWrap(() => mocks.getAgeingBreakdown());
    const { data } = await http.get('/api/fedex/ageing-breakdown');
    return data;
  },

  // DCA
  async getAssignedCases() {
    if (USE_MOCK) return mockWrap(() => mocks.getAssignedCases());
    const { data } = await http.get('/api/dca/cases/assigned');
    return data;
  },
  async getCaseDetails(caseId) {
    if (USE_MOCK) return mockWrap(() => mocks.getCaseDetails(caseId));
    const { data } = await http.get(`/api/dca/cases/${caseId}`);
    return data;
  },
  async getPerformance() {
    if (USE_MOCK) return mockWrap(() => mocks.getPerformance());
    const { data } = await http.get('/api/dca/performance');
    return data;
  },
  async submitBankProof(caseId, payload) {
    if (USE_MOCK) return mockWrap(() => mocks.submitBankProof(caseId, payload));
    const { data } = await http.post(`/api/dca/cases/${caseId}/bank-proof`, payload);
    return data;
  },
  async submitWorkProof(caseId, payload) {
    if (USE_MOCK) return mockWrap(() => mocks.submitWorkProof(caseId, payload));
    const { data } = await http.post(`/api/dca/cases/${caseId}/work-proof`, payload);
    return data;
  }
};

