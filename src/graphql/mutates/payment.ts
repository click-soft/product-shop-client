import { gql } from '@apollo/client';
import client from '../apollo-client';
import { CheckoutInput, CheckoutResult } from '../interfaces/checkout';

export const CHECKOUT = gql`
  mutation Checkout(
    $paymentType: String!
    $orderId: String!
    $orderName: String!
    $paymentKey: String!
    $amount: Int!
    $quantity: Int!
    $items: [CheckoutCartItemInput!]!
  ) {
    checkout(
      dto: {
        paymentType: $paymentType
        orderId: $orderId
        orderName: $orderName
        paymentKey: $paymentKey
        amount: $amount
        quantity: $quantity
        items: $items
      }
    ) {
      success
      errorCode
      errorMessage
      method
      requestedAt
      approvedAt
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation ($paymentId: Int!, $paymentKey: String!, $cancelReason: String!) {
    cancelOrder(paymentId: $paymentId, paymentKey: $paymentKey, cancelReason: $cancelReason) {
      success
      errorCode
      errorMessage
    }
  }
`;

export const REFUND_ORDER = gql`
  mutation ($paymentId: Int!, $cancelReason: String!, $bank: String!, $accountNumber: String!, $holderName: String!) {
    refundOrder(
      paymentId: $paymentId
      cancelReason: $cancelReason
      bank: $bank
      accountNumber: $accountNumber
      holderName: $holderName
    ) {
      success
      errorCode
      errorMessage
    }
  }
`;