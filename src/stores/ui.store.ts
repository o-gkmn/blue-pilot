import { create } from 'zustand';

type UIState = {
  isLoading: boolean;
  toastMessage: string | null;
  setLoading: (isLoading: boolean) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
};

export const useUIStore = create<UIState>()((set) => ({
  isLoading: false,
  toastMessage: null,
  setLoading: (isLoading) => set({ isLoading }),
  showToast: (message) => set({ toastMessage: message }),
  hideToast: () => set({ toastMessage: null }),
}));
