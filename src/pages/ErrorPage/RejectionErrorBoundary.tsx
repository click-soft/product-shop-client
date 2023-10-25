import React, { useEffect, useState } from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ErrorArgs } from '../../store/error-slice';
import { useErrorBoundary } from 'react-error-boundary';

const RejectionErrorBoundary: React.FC<ChildrenProps> = ({ children }) => {
  const { showBoundary } = useErrorBoundary();
  const errorArgs = useSelector<RootState, ErrorArgs | undefined>(
    (state) => state.error.error,
  );

  function captureReject(e: PromiseRejectionEvent) {
    e.preventDefault();
    
    const error = e.reason;
    const errorMessage = error?.message?.toUpperCase();

    switch (errorMessage) {
      case 'UNAUTHENTICATED':
      case 'UNAUTHORIZED':
        showBoundary({ status: 401, message: 'Unauthorized' });
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('unhandledrejection', captureReject);
    return () => {
      window.removeEventListener('unhandledrejection', captureReject);
    };
  }, []);

  useEffect(() => {
    if (!errorArgs) return;
    showBoundary(errorArgs);
  }, [errorArgs]);

  return <>{children}</>;
};

export default RejectionErrorBoundary;
