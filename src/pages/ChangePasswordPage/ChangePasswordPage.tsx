import ChangePasswordForm from '../../components/ChangePassword/ChangePasswordForm/ChangePasswordForm';
import styles from './ChangePasswordPage.module.scss';

const ChangePasswordPage = () => {
  return (
    <>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <ChangePasswordForm />      
    </>
  );
};

export default ChangePasswordPage;
