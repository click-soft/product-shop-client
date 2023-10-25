import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import ErrorFallback from '../../pages/ErrorPage/ErrorFallback/ErrorFallBack';
import RejectionErrorBoundary from '../../pages/ErrorPage/RejectionErrorBoundary';

const DefaultLayout = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(error) => {
        // const args: any[] = (error as any).args;
        // console.log(args);
      }}
    >
      <RejectionErrorBoundary>
          <Outlet />
      </RejectionErrorBoundary>
    </ErrorBoundary>
  );
};

export default DefaultLayout;
