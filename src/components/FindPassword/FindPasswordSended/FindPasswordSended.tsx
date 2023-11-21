import { useEffect } from 'react';
import styles from './FindPasswordSended.module.scss';
import useFindPasswordStore from '../../../store/find-password.store';
import { Link } from 'react-router-dom';

const FindPasswordSended = () => {
  const { clear, sendedEmail } = useFindPasswordStore();

  useEffect(() => {
    return clear;
  }, []);

  if (!sendedEmail) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.email}>{sendedEmail}</div>
      <div className={styles.description}>이메일로 비밀번호 변경 URL이 전송되었습니다.</div>
      <Link className={styles.to_login} to={'/login'}>
        로그인
      </Link>
    </div>
  );
};

export default FindPasswordSended;
