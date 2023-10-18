import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import ErrorFallback from '../../pages/ErrorPage/ErrorFallback/ErrorFallBack';
import TokenExpiredHookPage from '../../pages/ErrorPage/TokenExpiredHookPage';

const DefaultLayout = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(error) => {
        // const args: any[] = (error as any).args;
        // console.log(args);
      }}
    >
      <TokenExpiredHookPage>
          <Outlet />
      </TokenExpiredHookPage>
    </ErrorBoundary>
  );
};

export default DefaultLayout;
