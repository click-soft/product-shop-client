import { Outlet } from 'react-router-dom';
import RejectionErrorBoundary from '../../pages/ErrorBoundary/RejectionErrorBoundary/RejectionErrorBoundary';
import useToast from '../../hooks/use-toast';
import RootErrorBoundary from '@/pages/ErrorBoundary/RootErrorBoundary/RootErrorBoundary';

const DefaultLayout = () => {
  const { toastConatiner } = useToast();

  return (
    <RootErrorBoundary>
      <RejectionErrorBoundary>
        {toastConatiner}
        <Outlet />
      </RejectionErrorBoundary>
    </RootErrorBoundary>
  );
};

export default DefaultLayout;
