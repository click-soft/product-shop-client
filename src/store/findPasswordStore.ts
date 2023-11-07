import { create } from 'zustand';

type State = {
  userId: string;
  sendedEmail: string;
};

type Actions = {
  setUserId: (userId: string) => void;
  setSendedEmail: (email: string) => void;
  clear: () => void;
};

const initialState: State = {
  userId: '',
  sendedEmail: '',
};

const useFindPasswordStore = create<State & Actions>((set) => ({
  ...initialState,
  setUserId: (userId) => set(() => ({ userId })),
  setSendedEmail: (email) => set(() => ({ sendedEmail: email })),
  clear: () => set(initialState),
}));

export default useFindPasswordStore;
