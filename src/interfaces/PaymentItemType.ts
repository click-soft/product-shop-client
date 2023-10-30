import Product from '../graphql/interfaces/product';

export interface PaymentItem {
  id: number;
  paymentId: number;
  code: string;
  name: string;
  fit: boolean;
  quantity: number;
  amount: number;
  product?: Product;
}
