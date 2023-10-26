import { redirect } from 'react-router-dom';
import { getUser } from '../graphql/queries/user';
import { LocalStoragekey } from './enums';
import store from '../store';
import { errorActions } from '../store/error-slice';

const checkAuth = async (): Promise<boolean> => {
  const usr = localStorage.getItem(LocalStoragekey.USR);

  return !!usr;
};

export async function checkAuthLoader() {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    return true;
  } else {
    return redirect('/login');
  }
}

export async function checkLoginLoader() {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    return redirect('/');
  } else {
    return true;
  }
}

export async function checkAdminLoader() {
  const user = await getUser();
  const isAdmin = user?.admin;

  if (isAdmin) {
    return true;
  } else {
    return store.dispatch(errorActions.setError({ status: 403, message: 'Unauthorized' }));
  }
}
