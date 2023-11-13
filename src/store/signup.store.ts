import { create } from 'zustand';

type State = {
  id: string;
  pwd: string;
  email: string;
  isEmailFocused: boolean;
  confirmPwd: string;
  idError: string;
  pwdError: string;
  isIdExists: boolean;
};

type Actions = {
  setId: (id: string) => void;
  setPwd: (pwd: string) => void;
  setEmail: (email: string) => void;
  setIsEmailFocused: () => void;
  setConfirmPwd: (pwd: string) => void;
  setIdError: (error: string) => void;
  setPwdError: (error: string) => void;
  setIsIdExists: (exists: boolean) => void;
  clear: () => void;
};

const initialState: State = {
  id: '',
  pwd: '',
  email: '',
  isEmailFocused: false,
  confirmPwd: '',
  idError: '',
  pwdError: '',
  isIdExists: false,
};

const useSignupStore = create<State & Actions>((set) => ({
  ...initialState,
  setId: (id) => set(() => ({ id })),
  setPwd: (pwd) => set(() => ({ pwd })),
  setEmail: (email) => set(() => ({ email })),
  setIsEmailFocused: () => set(() => ({ isEmailFocused: true })),
  setConfirmPwd: (pwd) => set(() => ({ confirmPwd: pwd })),
  setIdError: (error) => set(() => ({ idError: error })),
  setPwdError: (error) => set(() => ({ pwdError: error })),
  setIsIdExists: (exists) => set(() => ({ isIdExists: exists })),
  clear: () => set(initialState),
}));

export default useSignupStore;
