import React, { useEffect, useMemo, useRef } from 'react';
import styles from './PaymentPage.module.scss';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import Card from '../../ui/Card';
import { nanoid } from '@reduxjs/toolkit';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import CheckoutState from '../../interfaces/CheckoutState';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import LocalStorageManager, {
  LocalStoragekey,
} from '../../utils/local-storage-manager';
import moment from 'moment';
const selector = '#payment-widget';
const clientKey = 'test_ck_kYG57Eba3GZ2ggEg5R68pWDOxmA1';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

const PaymentPage = () => {
  const checkoutState = useSelector<RootState, CheckoutState>(
    (state) => state.payment.checkout!,
  );

  const navigate = useNavigate();
  const { totalPrice, orderName } = checkoutState;
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const user = useGetLoginedUser(true);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useEffect(() => {
    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: totalPrice! },
      );

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  async function checkoutHandler() {
    LocalStorageManager.set(LocalStoragekey.CHECKOUT_DATA, checkoutState);
    const paymentWidget = paymentWidgetRef.current;
    const randInt = Math.floor(Math.random() * 10000);
    const currentDt = moment(new Date()).format('YYMMDDHHmmssSSS');
    const orderId = `${currentDt}${randInt}`;
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      const result = await paymentWidget?.requestPayment({
        orderId,
        orderName: orderName!,
        customerName: user?.name,
        customerEmail: '',
        successUrl: `${window.location.href}/success`,
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
            {totalPrice?.toLocaleString()}원
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
