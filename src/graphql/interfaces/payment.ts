export interface PaymentType {
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
  paymentItems: PaymentItemType[];
  virtual?: VirtualAccountType | null;
}

export interface PaymentItemType {
  id: number
  paymentId: number
  code: string
  name: string
  fit: boolean
  quantity: number
  amount: number
}

export interface VirtualAccountType {
  bankCode: string;
  customerName: string;
  dueDate: Date;
  accountNumber: string;
}