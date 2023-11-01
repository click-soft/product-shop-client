import React, { useEffect, useState } from 'react';
import PaymentSuccessProg from '../../components/PaymentSuccessProg/PaymentSuccessProg';
import styles from './PaymentProcessingPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import useCheckout from '../../hooks/use-checkout';
import { deleteCartItems } from '../../store/cart-slice';

const PaymentProcessingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<{ code?: string; message?: string }>();
  const [searchParams] = useSearchParams();
  const { mutateCheckout } = useCheckout({
    isSession: true,
  });

  useEffect(() => {
    mutateCheckout(searchParams)
      .then((data) => {
        if (data.success) {
          dispatch(deleteCartItems(data.ids));
          navigate(`/payment/success/${searchParams.get('orderId')}`);
        } else {
          setError({ code: data.errorCode, message: data.errorMessage });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (error) {
      throw new Error(JSON.stringify(error));
    }
  }, [error]);
  return (
    <div className={styles.main}>
      <PaymentSuccessProg />
    </div>
  );
};

export default PaymentProcessingPage;
