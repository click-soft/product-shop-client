import Cs from './cs';
import Product from './product';

export interface Payment {
  id: number;
  ykiho: string;
  orderId: string;
  paymentKey: string;
  method: string;
  amount: number;
  quantity: number;
  requestedAt?: Date | null;
  approvedAt?: Date | null;
  sendType: '결제대기' | '주문확인' | '상품준비중' | '배송중' | '배송완료';
  cancel: boolean;
  paymentItems: PaymentItem[];
  virtual?: VirtualAccount | null;
  test?: number;
  cs?: Cs;
}

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

export interface VirtualAccount {
  bankCode: string;
  customerName: string;
  dueDate: Date;
  accountNumber: string;
}
