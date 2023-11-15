import { useEffect, useState } from 'react';
import useProfileStore from '../store/user-profile.store';
import getUserQuery from '../graphql/queries/account/get-user.query';

let isLoading = false;

export default function useGetLoginedUser(load: boolean) {
  const { isAuthenticated, user, setUser } = useProfileStore();

  async function fetchGetUser() {
    if (isLoading) return;
    isLoading = true;
    try {
      const user = await getUserQuery();
      setUser(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
    isLoading = false;
  }

  useEffect(() => {
    if (isAuthenticated) return;

    fetchGetUser();
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return user;
  }

  return user;
}
