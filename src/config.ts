function getEnvironment(): 'test' | 'production' | 'development' {
  const currentDomain = window.location.hostname;

  if (currentDomain.startsWith('test') || currentDomain.startsWith('www.test')) {
    return 'test';
  } else {
    return 'production';
  }
}

export const environment = getEnvironment();
export const isTestEnv = environment === 'test';
export const TOSSPAYMENTS_CLIENT_KEY =
  environment === 'production'
    ? import.meta.env.VITE_TOSSPAYMENTS_CLIENT_KEY
    : import.meta.env.VITE_TOSSPAYMENTS_TEST_CLIENT_KEY;
