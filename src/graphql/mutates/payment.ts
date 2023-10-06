import { gql } from "@apollo/client";
import client from "../apollo-client";

interface CheckoutInput {
  paymentType: string
  orderId: string
  orderName: string
  paymentKey: string
  amount: number
  quantity: number
  items: CheckoutCartItemInput[]
}

interface CheckoutCartItemInput {
  code: string
  name: string
  fit: boolean
  quantity: number
  amount: number
}

interface CheckoutResult {
  success: string
  errorCode?: string
  errorMessage?: string
}

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
  }
}
`;

export const CANCEL_ORDER = gql`
  mutation ($paymentKey:String! $cancelReason:String! ){
    cancelOrder(paymentKey: $paymentKey cancelReason: $cancelReason)
  }
`;

export const checkout = async (input: CheckoutInput): Promise<CheckoutResult> => {
  const response = await client.mutate({
    mutation: CHECKOUT,
    variables: input,
  });

  return response.data.checkout;
}