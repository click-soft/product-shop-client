import React, { useEffect } from 'react';
import ChildrenProps from '../../../interfaces/children-props';
import { useAppSelector } from '../../../store';
import { ErrorArgs } from '../../../store/error-slice';
import { useErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
import UnhandledError from '@/errors/unhandled-error';

const RejectionErrorBoundary: React.FC<ChildrenProps> = ({ children }) => {
  const { showBoundary } = useErrorBoundary();
  const errorArgs = useAppSelector<ErrorArgs | undefined>((state) => state.error.error);

  useEffect(() => {
    function captureReject(e: PromiseRejectionEvent) {
      e.preventDefault();

      const error = e.reason;
      Sentry.captureException(new UnhandledError(error));
      const errorMessage = error?.message?.toUpperCase();

      switch (errorMessage) {
        case 'UNAUTHENTICATED':
        case 'UNAUTHORIZED':
          return showBoundary({ status: 401, message: 'Unauthorized' });
        default:
          return showBoundary({ status: 500, message: error.message, error });
      }
    }

    window.addEventListener('unhandledrejection', captureReject);
    return () => {
      window.removeEventListener('unhandledrejection', captureReject);
    };
  }, [showBoundary]);

  useEffect(() => {
    if (!errorArgs) return;
    showBoundary(errorArgs);
  }, [errorArgs, showBoundary]);

  return <>{children}</>;
};

export default RejectionErrorBoundary;
