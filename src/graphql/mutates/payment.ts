import { gql } from "@apollo/client";
import client from "../apollo-client";
import { CheckoutInput, CheckoutResult } from "../interfaces/checkout";

export const CHECKOUT = gql`
  mutation Checkout(
    $paymentType: String!
    $orderId: String!
    $orderName: String!
    $paymentKey: String!
    $amount: Int!
    $quantity: Int!
    $items: [CheckoutCartItemInput!]!
  ){
  checkout(dto: {
    paymentType:$paymentType
    orderId:$orderId
    orderName:$orderName
    paymentKey:$paymentKey
    amount:$amount
    quantity:$quantity
    items:$items
    }){
    success
    errorCode
    errorMessage
    method
    approvedAt
  }
}
`;

export const CANCEL_ORDER = gql`
  mutation ($paymentId: Int!, $paymentKey:String! $cancelReason:String! ){
    cancelOrder(paymentId:$paymentId paymentKey: $paymentKey cancelReason: $cancelReason){
      success
      errorCode
      errorMessage
    }
  }
`;

export const checkout = async (input: CheckoutInput): Promise<CheckoutResult> => {
  const response = await client.mutate({
    mutation: CHECKOUT,
    variables: input,
  });

  return response.data.checkout;
}

// export const cancelOrder = async (
//   { paymentId, paymentKey, cancelReason }: {
//     paymentId: number,
//     paymentKey: string,
//     cancelReason: string
//   }): Promise<CheckoutResult> => {
//   const response = await client.mutate({
//     mutation: CANCEL_ORDER,
//     variables: { paymentId, paymentKey, cancelReason },
//   });

//   if (response.errors) {
//     const err = response.errors[0];
//     return {
//       success: false,
//       errorCode: "error",
//       errorMessage: err.message,
//     }
//   } else {
//     return response.data.cancelOrder;
//   }
// }