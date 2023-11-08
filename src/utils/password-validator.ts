export function validatePassword(password: string): { validate?: boolean; errorMessage?: string } {
  // 비밀번호 길이 검사
  if (password.length < 8) {
    return {
      errorMessage: '비밀번호는 최소 8자 이상이어야 합니다.',
    };
  }

  // 문자 종류 검사
  const englishRegexp = /[a-zA-Z]/;
  const specialRegexp = /[!@#$%^&*]/;
  const numberRegexp = /\d/;
  const regexpes = [englishRegexp, specialRegexp, numberRegexp];
  const count = regexpes.reduce((acc, regexp) => {
    return acc + (regexp.test(password) ? 1 : 0);
  }, 0);

  if (count < 3) {
    return {
      errorMessage: '비밀번호는 대문자, 소문자, 숫자, 특수 문자\n 중 3가지 이상을 포함해야 합니다.',
    };
  }

  // // 단어 또는 숫자 조합 검사
  // const words = password.split(' ');
  // if (words.length === 1 || words.every((word) => word.match(/^[0-9]+$/))) {
  //   return false;
  // }

  return {
    validate: true,
  };
}
