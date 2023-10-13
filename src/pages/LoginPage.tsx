import CircleLoading from '../components/Loading/CircleLoading';
import Login from '../components/Login/Login';
import styles from './styles/LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={styles.body}>
      <Login></Login>
    </div>
  );
}

export default LoginPage;
