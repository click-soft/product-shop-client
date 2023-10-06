import { gql } from "@apollo/client";

export const GET_PAYMENT_WITH_ITEMS = gql`
  query {
    getPaymentWithItems {
      id
      orderId
      paymentKey
      amount
      quantity
      approvedAt
      sendType
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