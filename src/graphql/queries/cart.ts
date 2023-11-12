import { gql } from '@apollo/client';
import client from '../apollo-client';
import Cart from '../../interfaces/Cart';

export const CART_ITEMS_COUNT = gql`
  {
    cartItemsCount
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
        }
      }
    }
  }
`;
