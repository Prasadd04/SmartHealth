/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface DiagnosisRecord {
  id: string;
  type: 'X-Ray' | 'Symptom' | 'Vitals';
  date: string;
  result: string;
  confidence: number;
}

interface SmartHealthState {
  user: User | null;
  token: string | null;
  records: DiagnosisRecord[];
  setUser: (user: User | null, token: string | null) => void;
  addRecord: (record: DiagnosisRecord) => void;
  logout: () => void;
}

export const useStore = create<SmartHealthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      records: [
        { id: '1', type: 'X-Ray', date: '2026-05-01', result: 'Normal', confidence: 0.98 },
        { id: '2', type: 'Symptom', date: '2026-05-02', result: 'Mild Viral Infection', confidence: 0.85 },
      ],
      setUser: (user, token) => set({ user, token }),
      addRecord: (record) => set((state) => ({ records: [record, ...state.records] })),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'smarthealth-storage',
    }
  )
);
