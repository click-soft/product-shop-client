import { gql } from "@apollo/client";

export const GET_PAYMENT_ITEM_CODE = gql`
  query ($id: Int!){
    getPaymentItemById(id: $id){
      code
    }
  }
` 