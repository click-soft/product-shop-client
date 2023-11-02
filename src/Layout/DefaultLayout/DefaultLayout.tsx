import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import ErrorFallback from '../../pages/ErrorPage/ErrorFallback/ErrorFallBack';
import RejectionErrorBoundary from '../../pages/ErrorPage/RejectionErrorBoundary';
import useToast from '../../hooks/use-toast';

const DefaultLayout = () => {
  const { toastConatiner } = useToast();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RejectionErrorBoundary>
        {toastConatiner}
        <Outlet />
      </RejectionErrorBoundary>
    </ErrorBoundary>
  );
};

export default DefaultLayout;
