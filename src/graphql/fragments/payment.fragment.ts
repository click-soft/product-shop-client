import { gql } from '@apollo/client';

export const PAYMENT_VIRTUAL_FIELD = gql`
  fragment PaymentVirtualField on PaymentVirtual {
    bankCode
    customerName
    dueDate
    accountNumber
  }
`;
export const ORDER_COMPLETED_FIELD = gql`
  fragment OrderCompletedField on Payment {
    orderId
    method
    amount
    quantity
    requestedAt
    virtual {
      ...PaymentVirtualField
    }
  }

  ${PAYMENT_VIRTUAL_FIELD}
`;

export const GET_PAYMENTS_FIELDS = gql`
  fragment GetPaymentsFields on Payment {
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
    test
    virtual {
      ...PaymentVirtualField
    }
    paymentItems {
      id
      name
      fit
      quantity
      amount
      product {
        orderCheck
        bigo
        etc1
      }
    }
  }
  ${PAYMENT_VIRTUAL_FIELD}
`;
