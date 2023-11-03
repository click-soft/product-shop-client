import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CS } from '../../graphql/queries/user';
import UserProfile, { parseUserProfile } from '../../interfaces/UserProfile';
import { GET_ACCOUNT_EXISTS, SAVE_ACCOUNT } from '../../graphql/queries/account';
import useSignupStore from '../../store/signupStore';
import { toast } from 'react-toastify';

const useSignupService = () => {
  const { id, setIsIdExists } = useSignupStore();
  const [user, setUser] = useState<UserProfile>();
  const [saveAccount] = useMutation(SAVE_ACCOUNT);
  const [getCs, { data }] = useLazyQuery(GET_CS);
  const [getAccount] = useLazyQuery(GET_ACCOUNT_EXISTS);

  function fetchGetCs() {
    let ykiho;
    let saupkiho;

    setIsIdExists(false);

    if (id.length === 8) {
      ykiho = id;
    }
    if (id.length === 10) {
      saupkiho = id;
    }

    return getCs({
      variables: {
        ykiho,
        saupkiho,
      },
    });
  }

  function save(
    userId: string,
    password: string,
    callback: {
      onSuccess: () => void;
      onFail: (error: any) => void;
    }
  ) {
    saveAccount({ variables: { userId, password } })
      .then((response) => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }

        callback.onSuccess();
      })
      .catch((error) => {
        callback.onFail(error);
      });
  }

  useEffect(() => {
    if (data) {
      const user = parseUserProfile(data.getCs);
      setUser(user);
    } else {
      setUser(undefined);
    }
  }, [data]);

  useEffect(() => {
    fetchGetCs();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    getAccount({ variables: { userId: id } })
      .then((response) => {
        setIsIdExists(!!response.data?.getAccount);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsIdExists(false);
      });
  }, [user]);

  return {
    user,
    save,
  };
};

export default useSignupService;
