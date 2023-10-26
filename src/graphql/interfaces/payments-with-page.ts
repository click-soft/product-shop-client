import { Payment } from './payment';

export default interface PaymentWithPage {
  page: number;
  isLast: boolean;
  payments: Payment[];
}
