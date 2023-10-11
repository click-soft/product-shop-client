export default interface RefundOrderArgs {
  paymentId: number;
  cancelReason: string;
  bank: string;
  accountNumber: string;
  holderName: string;
}