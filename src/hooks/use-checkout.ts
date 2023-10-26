import SessionStorageManager, { SessionStoragekey } from '../utils/session-storage-manager';
import CheckoutState from '../interfaces/CheckoutState';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { checkout } from '../graphql/mutates/payment';
import { CheckoutResult } from '../graphql/interfaces/checkout';

const useCheckout = ({ isSession }: { isSession: boolean }) => {
  const checkoutState = useSelector<RootState, CheckoutState>((state) => state.payment.checkout!);
  const checkoutData = isSession ? getCheckoutDataSession() : undefined;

  function setCheckoutDataSession(data: CheckoutData) {
    SessionStorageManager.set(SessionStoragekey.CHECKOUT_DATA, data);
  }

  function getCheckoutDataSession(): CheckoutData | undefined {
    return SessionStorageManager.get<CheckoutData>(SessionStoragekey.CHECKOUT_DATA);
  }

  function removeCheckoutDataSession() {
    SessionStorageManager.remove(SessionStoragekey.CHECKOUT_DATA);
  }

  async function mutateCheckout(params: URLSearchParams): Promise<CheckoutResultWithIds> {
    const query = new TossQueryParser(params);
    if (!query.isValid) {
      return {
        success: false,
        ids: [],
        errorMessage: '매개변수 누락',
      };
    }
    const checkoutState = checkoutData?.checkoutState;
    const cartItems = checkoutState?.cartItems;
    const ids: number[] = cartItems?.map((item) => item.id!)!;
    const items = cartItems?.map((item) => {
      return {
        code: item.product?.smCode!,
        name: item.product?.smMyung!,
        fit: item.fit,
        quantity: item.quantity,
        amount: item.product?.danga!,
      };
    });

    const data = await checkout({
      paymentType: query.paymentType,
      orderId: query.orderId,
      orderName: checkoutState?.orderName!,
      paymentKey: query.paymentKey,
      amount: query.amount,
      quantity: checkoutState?.totalQuantity!,
      items: items!,
    });

    if (data.success) {
      setCheckoutDataSession({
        checkoutState,
        method: data.method,
        requestedAt: data.requestedAt,
        approvedAt: data.approvedAt,
        orderId: query.orderId,
      });
    }

    return { ...data, ids: ids };
  }

  return {
    removeCheckoutDataSession,
    setCheckoutDataSession,
    mutateCheckout,
    checkoutData,
    checkoutState,
  };
};

interface CheckoutResultWithIds extends CheckoutResult {
  ids: number[];
}

class TossQueryParser {
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

  public get isValid(): boolean {
    return !!this.paymentType && !!this.orderId && !!this.paymentKey && !!this.amount;
  }
}

export interface CheckoutData {
  checkoutState?: CheckoutState;
  orderId?: string;
  method?: string;
  requestedAt?: Date;
  approvedAt?: Date;
}

export default useCheckout;
