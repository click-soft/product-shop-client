import { gql } from '@apollo/client';

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($id: Int!, $quantity: Int!) {
    updateCartItemQuantity(id: $id, quantity: $quantity) {
      raw
    }
  }
`;

export const DELETE_CART_ITEMS = gql`
  mutation ($ids: [Int!]!) {
    deleteCartItems(ids: $ids) {
      raw
    }
  }
`;
