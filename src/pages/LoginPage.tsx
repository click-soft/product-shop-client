import Login from '../components/Login/Login';
import styles from './styles/LoginPage.module.scss';

function LoginPage() {
  console.log('env', process.env);
  return (
    <div className={styles.body}>    
      <Login></Login>
    </div>
  );
}

export default LoginPage;
