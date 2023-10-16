import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../Error/ErrorFallback/ErrorFallBack';
import TokenExpiredHookPage from '../../Error/TokenExpiredHookPage';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
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

export default BaseLayout;
