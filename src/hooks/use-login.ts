import { ApolloError, useMutation } from "@apollo/client";
import client from "../graphql/apollo-client";
import { LOGIN } from "../graphql/mutates/auth";
import LoginArgs from "../graphql/dto/login-args";
import { useEffect, useState } from "react";
import { LocalStoragekey } from "../utils/enums";

interface LoginSubmitArgs extends LoginArgs {
  onSuccess: (admin?: boolean) => void;
  onError: (errorMessage?: string, err?: ApolloError | undefined) => void;
}

const useLogin = () => {
  const [loginArgs, setLoginArgs] = useState<LoginSubmitArgs>();
  const [loginMutate, { data }] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.login) {
      client.resetStore();
      localStorage.setItem(LocalStoragekey.ACT, data.login.accessToken);
      localStorage.setItem(LocalStoragekey.USR, data.login.usr);
      const timeout = setTimeout(() => {
        loginArgs?.onSuccess(data.login.admin);
      }, 300)

      return () => {
        setLoading(false);
        clearTimeout(timeout);
      }
    }
  }, [data]);

  function login(args: LoginSubmitArgs) {
    setLoginArgs(args);

    if (args.userId === '') {
      return args.onError("아이디를 입력하세요.")
    }
    if (args.password === '') {
      return args.onError("비밀번호를 입력하세요.")
    }

    setLoading(true);
    loginMutate({
      variables: {
        userId: args.userId,
        password: args.password
      }
    }).catch(err => {
      setLoading(false);
      args?.onError(err.message);
    })
  }

  return { login, loading }
}

export default useLogin;