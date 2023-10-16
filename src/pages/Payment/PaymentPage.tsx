import React, { useEffect, useMemo, useRef } from 'react';
import styles from './PaymentPage.module.scss';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import Card from '../../ui/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import moment from 'moment';
import useCheckout from '../../hooks/use-checkout';
import { LocalStoragekey } from '../../utils/enums';
const selector = '#payment-widget';

const PaymentPage = () => {
  const { checkoutState, setCheckoutDataSession, removeCheckoutDataSession } =
    useCheckout({
      isSession: false,
    });
  const navigate = useNavigate();
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const user = useGetLoginedUser(true);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  if (!checkoutState) {
    navigate('/cart-view');
  }

  useEffect(() => {
    removeCheckoutDataSession();
    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const customerKey = localStorage.getItem(LocalStoragekey.USR) as string;
      const paymentWidget = await loadPaymentWidget(
        process.env.REACT_APP_TOSSPAYMENTS_CLIENT_KEY!,
        customerKey,
      ); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: checkoutState?.totalPrice! },
      );

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자BOX
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  async function checkoutHandler() {
    const paymentWidget = paymentWidgetRef.current;
    const randInt = Math.floor(Math.random() * 10000);
    const currentDt = moment(new Date()).format('YYMMDDHHmmssSSS');
    const orderId = `${currentDt}${randInt}`;

    setCheckoutDataSession({ checkoutState });

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      const result = await paymentWidget?.requestPayment({
        orderId,
        orderName: checkoutState?.orderName!,
        customerName: user?.name,
        customerEmail: '',
        successUrl: `${window.location.href}/processing`,
        failUrl: `${window.location.href}/fail`,
      });
      if (result?.paymentKey) {
        navigate(`success`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <Card className={styles.payment}>
        <div id="payment-widget" />
        <div id="agreement" />
      </Card>
      <Card className={styles['checkout-container']}>
        <div className={styles['checkout-amount-wrapper']}>
          결제금액 :{' '}
          <span className={styles['checkout-amount']}>
            {checkoutState?.totalPrice?.toLocaleString()}원
          </span>
        </div>
        <button className={styles['checkout-button']} onClick={checkoutHandler}>
          결제하기
        </button>
      </Card>
    </main>
  );
};

export default PaymentPage;
