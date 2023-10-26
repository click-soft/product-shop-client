import { PaymentType } from './payment';

export default interface PaymentWithPage {
  page: number;
  isLast: boolean;
  payments: PaymentType[];
}
