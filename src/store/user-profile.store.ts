import { create } from 'zustand';
import UserProfile from '../interfaces/user-profile';

type State = {
  isAuthenticated: boolean;
  user?: UserProfile;
};

type Actions = {
  setUser: (user: UserProfile) => void;
  clear: () => void;
};

const initialState: State = {
  isAuthenticated: false,
  user: undefined,
};

const useProfileStore = create<State & Actions>((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user, isAuthenticated: !!user })),
  clear: () => set(initialState),
}));

export default useProfileStore;
