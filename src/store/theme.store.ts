import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark';

type State = {
  mode: Mode;
};

type Actions = {
  setMode: (mode: Mode) => void;
};

const initialState: State = {
  mode: 'light',
};

const useThemeStore = create(
  persist<State & Actions>(
    (set) => ({
      ...initialState,
      setMode: (mode) =>
        set(() => {
          return { mode };
        }),
    }),
    {
      name: 'theme-store',
    }
  )
);

export default useThemeStore;
