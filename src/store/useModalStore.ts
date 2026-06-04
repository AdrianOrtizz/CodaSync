import { create } from "zustand";

interface ModalState {
  showLogin: boolean;
  showSignup: boolean;
  showPlans: boolean;
  setShowLogin: (show: boolean) => void;
  setShowSignup: (show: boolean) => void;
  setShowPlans: (show: boolean) => void;
  openLogin: () => void;
  openSignup: () => void;
  openPlans: () => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showLogin: false,
  showSignup: false,
  showPlans: false,
  setShowLogin: (show) => set({ showLogin: show }),
  setShowSignup: (show) => set({ showSignup: show }),
  setShowPlans: (show) => set({ showPlans: show }),
  openLogin: () => set({ showLogin: true, showSignup: false, showPlans: false }),
  openSignup: () => set({ showLogin: false, showSignup: true, showPlans: false }),
  openPlans: () => set({ showLogin: false, showSignup: false, showPlans: true }),
  closeAll: () => set({ showLogin: false, showSignup: false, showPlans: false }),
}));
