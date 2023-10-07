import { PaymentItemType } from "./PaymentItemType";

export interface PaymentType {
  id: number;
  ykiho: string;
  orderId: string;
  paymentKey: string;
  method: string;
  amount: number;
  quantity: number;
  approvedAt: Date;
  cancel : boolean;
  sendType: '배송준비' | '배송중' | '배송완료';
  paymentItems: PaymentItemType[];
}