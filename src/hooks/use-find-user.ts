import { useCallback, useState } from 'react';
import UserProfile, { parseUserProfile } from '../interfaces/UserProfile';
import { useLazyQuery } from '@apollo/client';
import { GET_CS } from '../graphql/queries/user';

interface errorState {
  type: 'length error' | 'notfound error' | 'unknown error';
  message: string;
}

const useFindUser = () => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<errorState | null>(null);
  const [getCs, { data: csData }] = useLazyQuery(GET_CS);
  const fetchHospData = useCallback(async (isBuisness: boolean, value: string) => {
    setError(null);

    if (isBuisness) {
      if (value.length < 10) {
        setData(null);
        return setError({ type: 'length error', message: '사업자등록번호 자리 수 오류' });
      }
    }
    if (value.length < 8) {
      setData(null);
      return setError({ type: 'length error', message: '요양기관기호 자리 수 오류' });
    }

    const result = await getCs({
      variables: {
        ykiho: isBuisness ? undefined : value,
        saupkiho: isBuisness ? value : undefined,
      },
    });

    if (result.error) {
      return setError({
        type: 'unknown error',
        message: result.error.message,
      });
    }

    if (result.data.getCs) {
      const user = parseUserProfile(result.data.getCs);
      return setData(user);
    } else {
      return setError({
        type: 'notfound error',
        message: '사용자 정보를 찾지 못했습니다.',
      });
    }
  }, []);

  return {
    data,
    error,
    fetchHospData,
  };
};

export default useFindUser;
