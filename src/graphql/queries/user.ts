import { gql } from '@apollo/client';
import client from '../apollo-client';
import UserProfile from '../../interfaces/UserProfile';
import { CS_FIELD } from '../fragments/user.fragment';

export const getUser = async (): Promise<UserProfile | undefined> => {
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
    
    return response.data.getUser;
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return undefined;
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
