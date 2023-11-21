import styles from './SignupPage.module.scss';
import useSignupStore from '../../store/signup.store';
import { useEffect } from 'react';
import SignupForm from '../../components/Signup/SignupForm/SignupForm';
import ToBackXButton from '../../components/ToBackXButton/ToBackXButton';

const SignupPage = () => {
  const { clear } = useSignupStore();

  useEffect(() => {
    return clear;
  }, []);

  return (
    <>
      <div className={styles.container}>
        <ToBackXButton />
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
