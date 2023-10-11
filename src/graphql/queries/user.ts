import { gql } from '@apollo/client';
import client from '../apollo-client';
import { getCookie, setCookie } from '../../utils/cookies';
import UserProfile from '../../interfaces/UserProfile';
import { parseExpToDate } from '../../utils/parse';
import { CS_FIELD } from '../fragments/user.fragment';

export const getUser = async (): Promise<UserProfile | undefined> => {
  const userString = getCookie('user');
  let user: UserProfile;
  if (userString) {
    user = JSON.parse(userString);
  } else {
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
    setCookie('user', JSON.stringify(user), { expires, secure: true });
  }
  return user;
};

export const GET_CS = gql`
  query ($ykiho: String, $saupkiho: String) {
    getCs(ykiho: $ykiho, saupkiho: $saupkiho) {
      ...CsField
    }
  }

  ${CS_FIELD}
`;
