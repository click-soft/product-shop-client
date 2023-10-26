import { gql } from '@apollo/client';

export const GET_ACCOUNT_EXISTS = gql`
  query ($userId: String!) {
    getAccount(userId: $userId) {
      id
    }
  }
`;

export const SAVE_ACCOUNT = gql`
  mutation ($userId: String!, $password: String!) {
    saveAccount(userId: $userId, password: $password) {
      id
    }
  }
`;
