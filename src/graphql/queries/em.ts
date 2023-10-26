import { gql } from '@apollo/client';

export const GET_MANAGERS = gql`
  query {
    getManagers {
      code
      name
    }
  }
`;
