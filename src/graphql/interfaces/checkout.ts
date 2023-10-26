export interface CheckoutInput {
  paymentType: string;
  orderId: string;
  orderName: string;
  paymentKey: string;
  amount: number;
  quantity: number;
  items: CheckoutCartItemInput[];
}

export interface CheckoutCartItemInput {
  code: string;
  name: string;
  fit: boolean;
  quantity: number;
  amount: number;
}

export interface CheckoutResult {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
  method?: string;
  approvedAt?: Date;
  requestedAt?: Date;
}
