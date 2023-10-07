import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
const ErrorPage = () => {
  const [query] = useSearchParams();
  const errorCode = query.get('code');

  return (
    <main className={styles.main}>
      {errorCode === 'access-denied' && <div>잘못된 접근입니다.</div>}
      {!errorCode && <div>페이지가 존재하지 않습니다. ㅠㅠ</div>}
    </main>
  );
};

export default ErrorPage;
