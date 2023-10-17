function getEnvironment(): 'test' | 'production' | 'development' {
  const currentDomain = window.location.hostname;

  if (currentDomain.startsWith('test')) {
    return 'test';
  } else {
    return 'production';
  }
}

export const environment = getEnvironment();
export const TOSSPAYMENTS_CLIENT_KEY = environment === "production" ? process.env.REACT_APP_TOSSPAYMENTS_TEST_CLIENT_KEY : process.env.REACT_APP_TOSSPAYMENTS_CLIENT_KEY;