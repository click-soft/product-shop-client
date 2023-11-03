import { create } from 'zustand';

type State = {
  id: string;
  pwd: string;
  confirmPwd: string;
  idError: string;
  pwdError: string;
  isIdExists: boolean;
};

type Actions = {
  setId: (id: string) => void;
  setPwd: (pwd: string) => void;
  setConfirmPwd: (pwd: string) => void;
  setIdError: (error: string) => void;
  setPwdError: (error: string) => void;
  setIsIdExists: (exists: boolean) => void;
  clear: () => void;
};

const initialState: State = {
  id: '',
  pwd: '',
  confirmPwd: '',
  idError: '',
  pwdError: '',
  isIdExists: false,
};

const useSignupStore = create<State & Actions>((set) => ({
  ...initialState,
  setId: (id) => set(() => ({ id })),
  setPwd: (pwd) => set(() => ({ pwd })),
  setConfirmPwd: (pwd) => set(() => ({ confirmPwd: pwd })),
  setIdError: (error) => set(() => ({ idError: error })),
  setPwdError: (error) => set(() => ({ pwdError: error })),
  setIsIdExists: (exists) => set(() => ({ isIdExists: exists })),
  clear: () => set(initialState),
}));

export default useSignupStore;
