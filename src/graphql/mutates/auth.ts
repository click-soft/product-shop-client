import { ApolloQueryResult, FetchResult, gql } from '@apollo/client';
import client from '../apollo-client';
import { clearCookie } from '../../utils/cookies';

type Message = {
  message: string;
};

export const logout = async (): Promise<Message> => {
  try {
    clearCookie('user');
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
  } catch (err) {
    return { message: 'fail' };
  }
};

export const login = async (
  isBuisness: boolean,
  value: string,
): Promise<Message> => {
  client.resetStore();
  try {
    const ykiho = isBuisness ? '' : `ykiho: "${value}"`;
    const saupkiho = isBuisness ? `saupkiho: "${value}"` : '';
    const response = await client.mutate({
      mutation: gql`
        mutation {
          login(loginDto: { ${ykiho} ${saupkiho}}) {
            message
          }
        }
      `,
    });

    return {
      message: response.data.login.message,
    };
  } catch (err) {
    return { message: 'fail' };
  }
};
