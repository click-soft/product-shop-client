import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation ($auto: Int!, $orderCheck: String, $seller: String) {
    updateProduct(auto: $auto, orderCheck: $orderCheck, seller: $seller) {
      auto
      orderCheck
      seller
    }
  }
`;
