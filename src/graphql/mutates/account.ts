import { gql } from '@apollo/client';

export const SEND_CHANGE_PASSWORD_EMAIL = gql`
  mutation ($userId: String!) {
    sendChangePasswordEmail(userId: $userId)
  }
`;
