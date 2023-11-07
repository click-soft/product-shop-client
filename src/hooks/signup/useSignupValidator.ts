import { useEffect, useState } from 'react';
import useSignupStore from '../../store/signupStore';
import { validEmail } from '../../utils/validation';

const useSignupValidator = () => {
  const { id, pwd, email, confirmPwd, isIdExists, setIdError, setPwdError } = useSignupStore();
  const [pwdChanged, setPwdChanged] = useState<HTMLInputElement[]>([]);

  const isValidEmail = validEmail(email);
  const isEqualPassword = pwd === confirmPwd;
  const isValidSave = !!(id && !isIdExists && isEqualPassword && pwd && isValidEmail);

  function setPwdChangedElem(elem: HTMLInputElement) {
    setPwdChanged((p) => {
      if (p.some((input) => input === elem)) return p;
      return p.concat(elem);
    });
  } 

  useEffect(() => {
    if (pwdChanged.length === 2 && !isEqualPassword) {
      setPwdError('비밀번호가 일치하지 않습니다.');
    } else {
      setPwdError('');
    }
  }, [pwd, confirmPwd]);

  useEffect(() => {
    setIdError(isIdExists ? '존재하는 아이디입니다.' : '');
  }, [isIdExists]);

  return {
    isValidSave,
    isValidEmail,
    setPwdChangedElem,
  };
};

export default useSignupValidator;
