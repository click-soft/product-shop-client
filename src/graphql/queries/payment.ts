import { gql } from '@apollo/client';
import {
  GET_PAYMENTS_FIELDS,
  ORDER_COMPLETED_FIELD,
  PAYMENT_VIRTUAL_FIELD as PAYMENT_VIRTUAL_FIELD,
} from '../fragments/payment.fragment';

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
