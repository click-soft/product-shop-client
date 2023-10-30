import { ReactNode } from 'react';
import Card from '../../../ui/Card/Card';
import styles from './LoginMsgCard.module.scss';

interface CardProps {
  isError?: boolean;
  dataList: CardDataProps[];
}

interface CardDataProps {
  title: string;
  message: string;
}

const LoginMsgCard: React.FC<CardProps> = (props) => {
  const components: ReactNode[] = props.dataList.map((data, i) => {
    return (
      <div key={i} className={styles.container}>
        {i > 0 && <div className={styles.separator} />}
        <div className={`${styles.title} ${props.isError && styles.error}`}>{data.title}</div>
        <div className={styles.message}>{data?.message}</div>
      </div>
    );
  });
  return <Card className={styles.card}>{components}</Card>;
};

export default LoginMsgCard;
