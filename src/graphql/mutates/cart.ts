import { gql } from '@apollo/client';
import CartProduct from '../../interfaces/CartItem';
import client from '../apollo-client';
// id?: number;
//   code: string;
//   quantity: number;
//   unit?: string;
//   price?: number;
//   fit: boolean;
//   product?: ProductListSub;
export const addToCart = async (cartItem: CartProduct): Promise<boolean> => {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation AddToCart($code: String! $quantity: Int! $fit: Boolean!) {
          addToCart(code:$code quantity:$quantity fit:$fit) {
            message
          }
        }
      `,
      variables: {
        ...cartItem,
      },
    });

    return response.data.addToCart.message === 'success';
  } catch (err) {

    return false;
  }
};