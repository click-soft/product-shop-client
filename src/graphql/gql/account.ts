import { gql } from '@apollo/client';

export const SEND_CHANGE_PASSWORD_EMAIL = gql`
  mutation ($userId: String!) {
    sendChangePasswordEmail(userId: $userId)
  }
`;

export const GET_ACCOUNT_EXISTS = gql`
  query ($userId: String!) {
    getAccount(userId: $userId) {
      id
    }
  }
`;

export const GET_ACCOUNT_EMAIL = gql`
  query ($userId: String!) {
    getAccount(userId: $userId) {
      id
      email
    }
  }
`;

export const SAVE_ACCOUNT = gql`
  mutation ($userId: String!, $password: String!, $email: String!) {
    saveAccount(userId: $userId, password: $password, email: $email) {
      id
    }
  }
`;

export const VALID_CHANGE_PASSWORD = gql`
  query ($userId: String!, $token: String!) {
    validChangePassword(userId: $userId, token: $token)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($userId: String!, $password: String!) {
    changePassword(userId: $userId, password: $password) {
      affected
    }
  }
`;

export const CHANGE_EMAIL = gql`
  mutation ($newEmail: String!) {
    changeEmail(newEmail: $newEmail) {
      affected
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  query ($userId: String!, $password: String!) {
    verifyAccount(userId: $userId, password: $password) {
      id
      userId
    }
  }
`;
