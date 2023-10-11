import { redirect } from 'react-router-dom';
import { getUser } from '../graphql/queries/user';

const checkAuth = async (): Promise<boolean> => {
  const user = await getUser();

  return !!user;
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
