import { useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import NotFoundErrorPage from './NotFoundErrorPage/NotFoundErrorPage';

const ErrorPage = () => {
  const error = useRouteError() as any;

  switch (error.status) {
    case 404:
      return <NotFoundErrorPage />;
  }

  return <main className={styles.main}></main>;
};

export default ErrorPage;
