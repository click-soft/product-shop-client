import { DependencyList, useEffect, useState } from 'react';
import UserProfile from '../interfaces/UserProfile';
import { getUser } from '../graphql/queries/user';

export default function useGetLoginedUser(load: boolean) {
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    if (load) {
      getUser()
        .then((user) => {
          setUser(user);
        })
        .catch((err) => setUser(undefined));
    }
  }, [load]);

  return user;
}
