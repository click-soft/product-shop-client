import { useEffect, useRef } from 'react';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { TOSSPAYMENTS_CLIENT_KEY } from '../config';
import { LocalStoragekey } from '../utils/enums';
import useCheckoutStore, { CheckoutState } from '../store/checkout.store';
import useGetLoginedUser from './use-get-logined-user';
import dayjs from 'dayjs';
import { SuccessFailCallback } from '../types/callback-type';
import { useLocation } from 'react-router-dom';
import { getOrderId } from '../utils/toss-payments.utils';

const selector = '#payment-widget';

const useTossWidget = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const user = useGetLoginedUser(true);
  const checkoutState: CheckoutState = useLocation().state;
  const { setData } = useCheckoutStore();

  if (!checkoutState) {
    throw new Error('잘못된 페이지 접근입니다.');
  }

  const { totalPrice, orderName } = checkoutState;

  async function setPaymentWidgets() {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const customerKey = localStorage.getItem(LocalStoragekey.USR) as string;
    const paymentWidget = await loadPaymentWidget(TOSSPAYMENTS_CLIENT_KEY!, customerKey); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: totalPrice });

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자BOX
    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }

  async function fetchCheckout(callback: SuccessFailCallback) {
    const paymentWidget = paymentWidgetRef.current;
    const orderId = getOrderId();

    try {
      setData({ ...checkoutState });

      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      const result = await paymentWidget?.requestPayment({
        orderId,
        orderName: orderName,
        customerName: user?.name,
        customerEmail: user?.email,
        successUrl: `${window.location.href}/processing`,
        failUrl: `${window.location.href}/fail`,
      });
      if (result?.paymentKey) {
        callback.onSuccess?.();
      }
    } catch (error) {
      callback.onFail?.(error);
    }
  }

  useEffect(() => {
    setPaymentWidgets();
  }, []);

  return {
    totalPrice,
    fetchCheckout,
  };
};

export default useTossWidget;
