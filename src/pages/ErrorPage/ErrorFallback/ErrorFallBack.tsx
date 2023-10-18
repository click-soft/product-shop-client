import { FallbackProps } from 'react-error-boundary';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';
import BaseErrorPage from '../BaseErrorPage/BaseErrorPage';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  switch (error?.message) {
    case 'Failed to fetch':
      return (
        <BaseErrorPage title="서버와 연결에 실패했습니다.">
          <button style={{
            width : '100%',
            padding : '20px',
            border: 'none',
            backgroundColor : 'transparent',
            fontWeight: 'bold',
            color : "hotpink",
          }} onClick={() => resetErrorBoundary()}>재 연결 시도</button>
        </BaseErrorPage>
      );
    case 'Unauthorized':
      return <UnauthorizedPage />;
  }

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={() => resetErrorBoundary('aa', 'bb')}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
