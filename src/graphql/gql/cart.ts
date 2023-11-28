import { gql } from '@apollo/client';
import client from '../apollo-client';
import Cart from '../../interfaces/cart';

export const ADD_TO_CART = gql`
  mutation AddToCart($code: String!, $quantity: Int!, $fit: Boolean!) {
    addToCart(code: $code, quantity: $quantity, fit: $fit) {
      message
    }
  }
`;

export const CART_ITEMS_COUNT = gql`
  {
    cartItemsCount
  }
`;

export const GET_CART_WITH_RRODUCT = gql`
  {
    getCartWithProduct {
      id
      cartItems {
        id
        quantity
        fit
        product {
          smCode
          smMyung
          danga
          danwi
          productList{
            step
          }
        }
      }
    }
  }
`;

export const getCartWithProduct = async (): Promise<Cart | undefined> => {
  const response = await client.query({
    query: gql`
      {
        getCartWithProduct {
          id
          cartItems {
            id
            quantity
            fit
            product {
              smCode
              smMyung
              danga
              danwi
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
  });

  return response.data.getCartWithProduct;
};
