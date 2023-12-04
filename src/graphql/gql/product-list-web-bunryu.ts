import { gql } from '@apollo/client';

export const GET_WEB_BUNRYUS = gql`
  query {
    getWebBunryus {
      code
      name
      fit
    }
  }
`;
