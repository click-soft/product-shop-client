import ChildrenProps from '@/interfaces/children-props';
import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import NotFoundErrorPage from '@/pages/ErrorPage/NotFoundErrorPage/NotFoundErrorPage';
import UnauthorizedPage from '@/pages/ErrorPage/UnauthorizedPage/UnauthorizedPage';
import BaseErrorPage from '@/pages/ErrorPage/BaseErrorPage/BaseErrorPage';

const RootErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
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

const RootErrorBoundary: React.FC<ChildrenProps> = (props) => {
  return <ErrorBoundary FallbackComponent={RootErrorFallback}>{props.children}</ErrorBoundary>;
};

export default RootErrorBoundary;
