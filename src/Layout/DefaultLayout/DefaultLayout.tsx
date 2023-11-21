import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import ErrorFallback from '../../pages/ErrorPage/ErrorFallback/ErrorFallBack';
import RejectionErrorBoundary from '../../pages/ErrorPage/RejectionErrorBoundary';
import useToast from '../../hooks/use-toast';
import * as Sentry from '@sentry/react';

const DefaultLayout = () => {
  const { toastConatiner } = useToast();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Sentry.ErrorBoundary>
        <RejectionErrorBoundary>
          {toastConatiner}
          <Outlet />
        </RejectionErrorBoundary>
      </Sentry.ErrorBoundary>
    </ErrorBoundary>
  );
};

export default DefaultLayout;
