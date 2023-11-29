import ChildrenProps from '@/interfaces/children-props';
import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const LocalApiErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  console.log(error);

  return (
    <div>
      <h1>{error.message}</h1>
      <button onClick={() => resetErrorBoundary()}>zzzzzz</button>
    </div>
  );
};

const LocalApiErrorBoundary: React.FC<ChildrenProps> = (props) => {
  return <ErrorBoundary FallbackComponent={LocalApiErrorFallback}>{props.children}</ErrorBoundary>;
};

export default LocalApiErrorBoundary;
