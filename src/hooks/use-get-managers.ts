import { useQuery } from '@apollo/client';
import Em from '../graphql/interfaces/em';
import { GET_MANAGERS } from '../graphql/gql/em';

const useGetManagers = () => {
  const { data } = useQuery(GET_MANAGERS);

  const managers: Em[] = data?.getManagers;
  const managerObject = managers?.reduce(
    (obj: { [key: string]: string }, em) => {
      obj[em.code] = em.name;
      return obj;
    },
    { '': '전체' }
  );

  return { managers, managerObject };
};

export default useGetManagers;
