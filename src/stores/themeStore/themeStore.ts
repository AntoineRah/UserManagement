import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from './themeStore.type';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage', 
    }
  )
);
