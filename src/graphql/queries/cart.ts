import { gql } from '@apollo/client';
import client from '../apollo-client';
import Cart from '../../interfaces/Cart';

export const cartItemsCount = async (): Promise<number> => {
  try {
    const response = await client.query({
      query: gql`
        {
          cartItemsCount
        }
      `,
      fetchPolicy: 'no-cache',
    });

    return response.data.cartItemsCount;
  } catch (err) {
    return 0;
  }
};

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
