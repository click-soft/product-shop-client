import { gql } from '@apollo/client';
import client from '../apollo-client';

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
            message
          }
        }
      `,
    variables: {
      ykiho, saupkiho
    }
  });

  return {
    message: response.data.login.message,
  };
};
