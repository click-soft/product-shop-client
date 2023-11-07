import styles from './LinkToLogin.module.scss';
import { Link } from 'react-router-dom';

const LinkToLogin = () => {
  return (
    <Link to={'/login'} className={styles.to_login}>
      로그인화면으로
    </Link>
  );
};

export default LinkToLogin;
