import styles from './FindPasswordPage.module.scss';
import FindPasswordForm from '../../components/FindPassword/FindPasswordForm/FindPasswordForm';
import FindPasswordSended from '../../components/FindPassword/FindPasswordSended/FindPasswordSended';
import useFindPasswordStore from '../../store/findPasswordStore';
import ToBackXButton from '../../components/ToBackXButton/ToBackXButton';

const FindPasswordPage = () => {
  const { sendedEmail } = useFindPasswordStore();
  return (
    <>
      <ToBackXButton />
      <h2 className={styles.title}>비밀번호 찾기</h2>
      {!sendedEmail && <FindPasswordForm />}
      {sendedEmail && <FindPasswordSended />}
    </>
  );
};

export default FindPasswordPage;
