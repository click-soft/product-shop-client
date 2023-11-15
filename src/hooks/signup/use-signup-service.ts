import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CS } from '../../graphql/gql/user';
import UserProfile, { parseUserProfile } from '../../interfaces/user-profile';
import useSignupStore from '../../store/signup.store';
import { toast } from 'react-toastify';
import SaveAccountArgs from '../../graphql/dto/saveAccount.args';
import { GET_ACCOUNT_EXISTS, SAVE_ACCOUNT } from '../../graphql/gql/account';

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

    if (!id) return;
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
    args: SaveAccountArgs,
    callback: {
      onSuccess: () => void;
      onFail: (error: any) => void;
    }
  ) {
    saveAccount({ variables: { ...args } })
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
