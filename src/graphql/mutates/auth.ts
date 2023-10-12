import { gql } from '@apollo/client';
import client from '../apollo-client';
import LocalStorageManager, { LocalStoragekey } from '../../utils/local-storage-manager';
import TokenResult from '../types/token-result';

type Message = {
  message: string;
};

export const logout = async (): Promise<Message> => {
  const response = await client.mutate({
    mutation: gql`
        mutation {
          logout {
            message
          }
        }
      `,
  });

  LocalStorageManager.remove(LocalStoragekey.ACT);
  LocalStorageManager.remove(LocalStoragekey.USR);
  return response.data.logout;
};

export const login = async (
  isBuisness: boolean,
  value: string,
): Promise<Message> => {
  client.resetStore();

  const ykiho = isBuisness ? undefined : value;
  const saupkiho = isBuisness ? value : undefined;
  const response = await client.mutate({
    mutation: gql`
        mutation ($ykiho: String, $saupkiho: String){
          login(ykiho: $ykiho, saupkiho:$saupkiho) {
            accessToken
            usr
          }
        }
      `,
    variables: {
      ykiho, saupkiho
    },
    fetchPolicy: 'no-cache',
  });

  const data = response.data.login;

  LocalStorageManager.set(LocalStoragekey.ACT, data.accessToken);
  LocalStorageManager.set(LocalStoragekey.USR, data.usr);
  return {
    message: 'success',
  };
};

export const refresh = async (): Promise<TokenResult> => {
  const key = LocalStorageManager.get(LocalStoragekey.USR);

  if (!key) return {
    accessToken: '',
    usr: '',
  };

  try {
    const response = await client.mutate({
      mutation: gql`
          mutation ($key: String!){
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
    }

    LocalStorageManager.set(LocalStoragekey.ACT, tokenResult.accessToken);
    LocalStorageManager.set(LocalStoragekey.USR, tokenResult.usr);

    return tokenResult;
  } catch (err: any) {
    LocalStorageManager.remove(LocalStoragekey.ACT);
    LocalStorageManager.remove(LocalStoragekey.USR);
    throw new Error("RefreshToken expired")
  }
}
