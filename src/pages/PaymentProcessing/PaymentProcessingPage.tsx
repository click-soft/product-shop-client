import React, { useEffect } from 'react';
import PaymentSuccessProg from '../../components/PaymentSuccessProg/PaymentSuccessProg';
import styles from './PaymentProcessingPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import useCheckout from '../../hooks/use-checkout';
import { deleteCartItems } from '../../store/cart-slice';

const PaymentProcessingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
          throw new Error(data.errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);

        // navigate('/error?code=access-denied');
      });
  }, []);

  return (
    <div className={styles.main}>
      <PaymentSuccessProg />
    </div>
  );
};

export default PaymentProcessingPage;
