import { useLazyQuery, useMutation } from '@apollo/client';
import client from '../../graphql/apollo-client';
import { LOGIN } from '../../graphql/mutates/auth';
import LoginArgs from '../../graphql/dto/login-args';
import { useEffect, useState } from 'react';
import { LocalStoragekey } from '../../utils/enums';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TokenResult from '../../graphql/types/token-result';
import { GET_ACCOUNT_EXISTS } from '../../graphql/queries/account';

const useLogin = () => {
  const navigate = useNavigate();
  const [loginMutate] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<TokenResult>();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [params] = useSearchParams();
  const paramUserId = params.get('userId');
  const [getAccount] = useLazyQuery(GET_ACCOUNT_EXISTS);

  useEffect(() => {
    if (!paramUserId) return;

    getAccount({ variables: { userId: paramUserId } }).then((response) => {
      const id = response.data?.getAccount?.id;
      if (id) {
        setUserId(paramUserId);
      } else {
        navigate(`/signup?userId=${paramUserId}`);
      }
    });
  }, [paramUserId]);

  function handleUserIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  // const paramToken = params.get('token');

  // useEffect(() => {
  //   if (!paramUserId || !paramToken) return;

  //   baseApi
  //     .post('account-temp/login', {
  //       userId: paramUserId,
  //       token: paramToken,
  //     })
  //     .then((response) => {
  //       loginSuccess(response.data);
  //     })
  //     .catch((error) => {
  //       loginFail(error.message);
  //     });
  // }, [paramUserId, paramToken]);

  function validLogin({ userId, password }: LoginArgs) {
    if (userId === '') {
      toast.error('아이디를 입력하세요.');
      return false;
    }
    if (password === '') {
      toast.error('비밀번호를 입력하세요.');
      return false;
    }
    return true;
  }

  function loginSuccess(data: TokenResult) {
    client.resetStore();
    localStorage.setItem(LocalStoragekey.ACT, data.accessToken);
    localStorage.setItem(LocalStoragekey.USR, data.usr);
    setLoginData(data);
    setLoading(false);
  }

  function loginFail(errorMessage: string) {
    toast.error(errorMessage);
    setLoading(false);
  }

  function login(args: LoginArgs) {
    if (!validLogin(args)) return;

    setLoading(true);
    loginMutate({
      variables: {
        userId: args.userId,
        password: args.password,
      },
    })
      .then((response) => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }

        const data: TokenResult = response.data?.login;
        loginSuccess(data);
      })
      .catch((err) => {
        loginFail(err.message);
      });
  }

  useEffect(() => {
    if (!loginData) return;

    if (loginData.admin) {
      navigate('/admin/orders');
    } else {
      navigate('/');
    }
  }, [loginData]);
  return { userId, password, loading, login, handleUserIdChange, handlePasswordChange };
};

export default useLogin;
