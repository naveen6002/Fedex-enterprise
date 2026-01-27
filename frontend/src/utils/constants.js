export const APP_NAME = 'FedEx / DCA Dashboard';

export const STORAGE_KEYS = {
  authToken: 'auth.token',
  memberType: 'auth.memberType',
  username: 'auth.username'
};

export const MEMBER_TYPES = {
  FEDEX: 'FEDEX',
  DCA: 'DCA'
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

