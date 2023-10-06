import { gql } from '@apollo/client';
import CartProduct from '../../interfaces/CartItem';
import client from '../apollo-client';

export const addToCart = async (cartItem: CartProduct): Promise<boolean> => {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation AddToCart($item: CartItemDto!) {
          addToCart(item: $item) {
            message
          }
        }
      `,
      variables: {
        item: { ...cartItem },
      },
    });

    return response.data.addToCart.message === 'success';
  } catch (err) {

    return false;
  }
};