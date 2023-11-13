export default class TossQueryParser {
  paymentType: string;
  orderId: string;
  paymentKey: string;
  amount: number;
  constructor(params: URLSearchParams) {
    this.paymentType = params.get('paymentType')!;
    this.orderId = params.get('orderId')!;
    this.paymentKey = params.get('paymentKey')!;
    this.amount = parseInt(params.get('amount')!);
  }

  public get valid(): { isValid?: boolean; errorMessage?: string } {
    let errors: string[] = [];
    if (!this.paymentType) {
      errors.push('paymentType 누락');
    }
    if (!this.orderId) {
      errors.push('orderId 누락');
    }
    if (!this.paymentKey) {
      errors.push('paymentKey 누락');
    }
    if (!this.paymentKey) {
      errors.push('amount 누락');
    }

    if (errors.length > 0) {
      return { errorMessage: errors.join('\n') };
    }

    return { isValid: true };
  }
}
