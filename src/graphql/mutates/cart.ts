import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
mutation AddToCart($code: String! $quantity: Int! $fit: Boolean!) {
  addToCart(code:$code quantity:$quantity fit:$fit) {
    message
  }
}
`