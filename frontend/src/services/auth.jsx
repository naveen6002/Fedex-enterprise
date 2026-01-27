import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import { MEMBER_TYPES, STORAGE_KEYS } from '../utils/constants.js';

const AuthContext = createContext(null);

function readSession() {
  return {
    token: localStorage.getItem(STORAGE_KEYS.authToken) || '',
    memberType: localStorage.getItem(STORAGE_KEYS.memberType) || '',
    username: localStorage.getItem(STORAGE_KEYS.username) || ''
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());

  useEffect(() => {
    // keep state in sync if user manually clears storage
    const onStorage = () => setSession(readSession());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => {
    return {
      ...session,
      isAuthed: Boolean(session.token),
      isFedEx: session.memberType === MEMBER_TYPES.FEDEX,
      isDca: session.memberType === MEMBER_TYPES.DCA,
      async login({ username, password, memberType }) {
        const res = await api.login({ username, password, memberType });
        const token = res?.token || 'mock-token';
        localStorage.setItem(STORAGE_KEYS.authToken, token);
        localStorage.setItem(STORAGE_KEYS.username, username || '');
        localStorage.setItem(STORAGE_KEYS.memberType, memberType || '');
        const next = readSession();
        setSession(next);
        return { ...res, token, memberType };
      },
      logout() {
        localStorage.removeItem(STORAGE_KEYS.authToken);
        localStorage.removeItem(STORAGE_KEYS.username);
        localStorage.removeItem(STORAGE_KEYS.memberType);
        setSession(readSession());
      }
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

