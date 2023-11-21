import { gql } from '@apollo/client';
import { GET_PAYMENTS_FIELDS, ORDER_COMPLETED_FIELD } from '../fragments/payment.fragment';

export const GET_PAYMENT_WITH_ITEMS = gql`
  query ($page: Int!) {
    getPaymentWithItems(page: $page) {
      page
      isLast
      payments {
        ...GetPaymentsFields
      }
    }
  }
  ${GET_PAYMENTS_FIELDS}
`;

export const GET_ADMIN_PAYMENTS = gql`
  query (
    $jisa: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $emCode: String
    $orderId: String
    $customerName: String
    $page: Int!
  ) {
    getAdminPayments(
      jisa: $jisa
      startDate: $startDate
      endDate: $endDate
      emCode: $emCode
      orderId: $orderId
      customerName: $customerName
      page: $page
    ) {
      page
      isLast
      payments {
        ykiho
        ...GetPaymentsFields
        cs {
          myung
        }
      }
    }
  }

  ${GET_PAYMENTS_FIELDS}
`;

export const GET_ORDER_COMPLETED = gql`
  query ($orderId: String!) {
    getOrderCompleted(orderId: $orderId) {
      ...OrderCompletedField
    }
  }

  ${ORDER_COMPLETED_FIELD}
`;

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
