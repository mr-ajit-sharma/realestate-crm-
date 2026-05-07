import { create } from 'zustand';

type UIState = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  currentView: 'list' | 'grid' | 'kanban';
  setCurrentView: (view: 'list' | 'grid' | 'kanban') => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  isModalOpen: false,
  setModalOpen: (open) => set({ isModalOpen: open }),
  currentView: 'list' as const,
  setCurrentView: (view) => set({ currentView: view }),
}));
