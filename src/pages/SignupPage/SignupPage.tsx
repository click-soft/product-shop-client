import { Link } from 'react-router-dom';
import Card from '../../ui/Card/Card';
import styles from './SignupPage.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import useSignupStore from '../../store/signupStore';
import { useEffect } from 'react';
import SignupForm from '../../components/Signup/SignupForm/SignupForm';

const SignupPage = () => {
  const { clear } = useSignupStore();

  useEffect(() => {
    return clear;
  }, []);

  return (
    <>
      <Card className={styles.container}>
        <Link to={'../login'} className={styles.to_back}>
          <AiOutlineClose className={styles.exit} />
        </Link>
        <SignupForm />
      </Card>
    </>
  );
};

export default SignupPage;
