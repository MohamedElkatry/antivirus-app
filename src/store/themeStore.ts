import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  language: 'en' | 'ar';
  autoUpdate: boolean;
  toggleTheme: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleAutoUpdate: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true,
  language: 'en',
  autoUpdate: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLanguage: (lang) => set({ language: lang }),
  toggleAutoUpdate: () => set((state) => ({ autoUpdate: !state.autoUpdate })),
}));