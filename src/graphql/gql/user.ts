import { gql } from '@apollo/client';
import client from '../apollo-client';
import UserProfile from '../../interfaces/user-profile';
import { CS_FIELD } from '../fragments/user.fragment';

export const GET_USER = gql`
  {
    getUser {
      userId
      jisa
      ykiho
      saupkiho
      name
      ceoName
      fitCherbang
      fitYoungsu
      admin
      email
      useBNPL
      exp
    }
  }
`;

export const GET_CS = gql`
  query ($ykiho: String, $saupkiho: String) {
    getCs(ykiho: $ykiho, saupkiho: $saupkiho) {
      ...CsField
    }
  }

  ${CS_FIELD}
`;
