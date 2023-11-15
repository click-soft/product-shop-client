import { useNavigate } from 'react-router-dom';
import { modalActions } from '../store/modal-slice';
import { useMutation } from '@apollo/client';
import { LocalStoragekey } from '../utils/enums';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../graphql/gql/auth';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutate, { data }] = useMutation(LOGOUT);
  const logout = () => logoutMutate();

  useEffect(() => {
    if (data) {
      localStorage.removeItem(LocalStoragekey.ACT);
      localStorage.removeItem(LocalStoragekey.USR);
      dispatch(modalActions.closeDownAll());
      navigate('/login');
    }
  }, [data]);
  return logout;
};

export default useLogout;
