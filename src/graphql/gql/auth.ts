import { gql } from '@apollo/client';
import client from '../apollo-client';
import { LocalStoragekey } from '../../utils/enums';
import TokenResult from '../types/token-result';

export const LOGOUT = gql`
  mutation {
    logout {
      message
    }
  }
`;

export const LOGIN = gql`
  mutation ($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      accessToken
      usr
      admin
    }
  }
`;

export const refresh = async (): Promise<TokenResult> => {
  const key = localStorage.getItem(LocalStoragekey.USR);

  if (!key) {
    return {
      accessToken: '',
      usr: '',
    };
  }
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation ($key: String!) {
          refresh(key: $key) {
            accessToken
            usr
          }
        }
      `,
      variables: { key },
    });

    const data = response.data?.refresh;
    const tokenResult: TokenResult = {
      accessToken: data.accessToken,
      usr: data.usr,
    };

    localStorage.setItem(LocalStoragekey.ACT, tokenResult.accessToken);
    localStorage.setItem(LocalStoragekey.USR, tokenResult.usr);

    return tokenResult;
  } catch (err: any) {
    localStorage.removeItem(LocalStoragekey.ACT);
    localStorage.removeItem(LocalStoragekey.USR);
    throw new Error('RefreshToken expired');
  }
};
