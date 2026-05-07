import { create } from 'zustand';
import { Deal } from '@/types';

type DealStore = {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  updateDealStatus: (id: string, status: Deal['status']) => void;
  updateDealProgress: (id: string, progress: number) => void;
};

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  setDeals: (deals) => set({ deals }),
  updateDealStatus: (id, status) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, status } : deal
      ),
    })),
  updateDealProgress: (id, progress) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, progress } : deal
      ),
    })),
}));
