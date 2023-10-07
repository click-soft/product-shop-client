import { gql } from "@apollo/client";

export const GET_PAYMENT_WITH_ITEMS = gql`
  query {
    getPaymentWithItems {
      id
      orderId
      paymentKey
      method
      amount
      quantity
      approvedAt
      sendType
      cancel
      paymentItems {
        id
        name
        fit
        quantity
        amount
      }
    }
  }
`;