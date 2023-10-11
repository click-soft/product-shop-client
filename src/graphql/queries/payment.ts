import { gql } from "@apollo/client";
import { ORDER_COMPLETED_FIELD, PAYMENT_VIRTUAL_FIELD as PAYMENT_VIRTUAL_FIELD } from "../fragments/payment.fragment";

export const GET_PAYMENT_WITH_ITEMS = gql`
  query {
    getPaymentWithItems {
      id
      orderId
      paymentKey
      method
      amount
      quantity
      requestedAt
      approvedAt
      sendType
      cancel
      virtual{
        ...PaymentVirtualField
      }
      paymentItems {
        id
        name
        fit
        quantity
        amount
      }
    }
  }

  ${PAYMENT_VIRTUAL_FIELD}
`;

export const GET_ORDER_COMPLETED = gql`
  query ($orderId: String!){
    getOrderCompleted(orderId: $orderId) {
      ...OrderCompletedField
    }
  }

  ${ORDER_COMPLETED_FIELD}
`;