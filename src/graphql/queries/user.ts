import { gql } from '@apollo/client';
import client from '../apollo-client';
import UserProfile from '../../interfaces/UserProfile';
import { parseExpToDate } from '../../utils/parse';
import { CS_FIELD } from '../fragments/user.fragment';
import cookies from '../../utils/cookies';

export const getUser = async (): Promise<UserProfile | undefined> => {
  const userString = cookies.get('user');
  let user: UserProfile;
  if (userString) {
    user = JSON.parse(userString);
  } else {
    try {
      const response = await client.query({
        query: gql`
            {
              getUser {
                jisa
                ykiho
                saupkiho
                name
                ceoName
                fitCherbang
                fitYoungsu
                exp
              }
            }
          `,
        fetchPolicy: 'no-cache',
      });
      user = response.data.getUser;
      const expires = parseExpToDate(response.data.getUser.exp);
      cookies.set('user', JSON.stringify(user), { expires, secure: process.env.NODE_ENV === 'production', sameSite: 'none', httpOnly: true })

      return user;
    } catch (err: any) {
      cookies.remove('user');
      if (err.message === "Unauthorized") {
        return undefined;
      }
      throw new Error(err.message);
    }
  }
};

export const GET_CS = gql`
  query ($ykiho: String, $saupkiho: String) {
    getCs(ykiho: $ykiho, saupkiho: $saupkiho) {
      ...CsField
    }
  }

  ${CS_FIELD}
`;
