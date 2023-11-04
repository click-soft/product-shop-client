import { useMutation } from '@apollo/client';
import client from '../../graphql/apollo-client';
import { LOGIN } from '../../graphql/mutates/auth';
import LoginArgs from '../../graphql/dto/login-args';
import { useEffect, useState } from 'react';
import { LocalStoragekey } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TokenResult from '../../graphql/types/token-result';

const useLogin = () => {
  const navigate = useNavigate();
  const [loginMutate] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<TokenResult>();

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
        client.resetStore();
        localStorage.setItem(LocalStoragekey.ACT, data.accessToken);
        localStorage.setItem(LocalStoragekey.USR, data.usr);

        setLoginData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
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
  return { login, loading };
};

export default useLogin;
