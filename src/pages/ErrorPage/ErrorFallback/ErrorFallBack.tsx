import { FallbackProps } from 'react-error-boundary';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';
import BaseErrorPage from '../BaseErrorPage/BaseErrorPage';
import NotFoundErrorPage from '../NotFoundErrorPage/NotFoundErrorPage';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const errorMessage = error?.message;

  switch (error.status) {
    case 403:
    case 404:
      return <NotFoundErrorPage />;
  }
  switch (error?.message?.toUpperCase()) {
    case 401:
    case 'UNAUTHORIZED':
      return <UnauthorizedPage />;
  }

  return (
    <BaseErrorPage title={errorMessage} visibleButtons={{ toMain: true }}>
      <button
        style={{
          width: '100%',
          padding: '20px',
          border: 'none',
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          color: 'hotpink',
        }}
        onClick={() => resetErrorBoundary()}
      >
        재 연결 시도
      </button>
    </BaseErrorPage>
  );
};

export default ErrorFallback;
