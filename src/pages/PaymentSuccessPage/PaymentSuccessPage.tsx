import styles from './PaymentSuccessPage.module.scss';
import PaymentSuccessComplete from '../../components/PaymentSuccessComplete/PaymentSuccessComplete';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDER_COMPLETED } from '../../graphql/gql/payment';

const PaymentSuccessPage = () => {
  const params = useParams();
  const { data, error, loading } = useQuery(GET_ORDER_COMPLETED, {
    variables: { orderId: params.orderId },
  });

  if (loading) {
    return <div>조회 중</div>;
  } else if (error) {
    return <div>에러발생</div>;
  }

  return (
    <div className={styles.main}>
      <PaymentSuccessComplete orderData={data.getOrderCompleted} />
    </div>
  );
};

export default PaymentSuccessPage;
