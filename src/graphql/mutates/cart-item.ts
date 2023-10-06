import { gql } from "@apollo/client";

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($id:Int!, $quantity:Int!){
    updateCartItemQuantity(input : {id:$id quantity:$quantity }){
      raw
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation ($id:Int!) {
    deleteCartItem(id: $id){
      raw
    }
  }
`