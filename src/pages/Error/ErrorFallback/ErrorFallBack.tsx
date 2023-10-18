import { FallbackProps } from 'react-error-boundary';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {

  switch (error?.message){
    case  "Failed to fetch":    
    case "Unauthorized":
    return <UnauthorizedPage />;
  }

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={()=> resetErrorBoundary("aa", "bb")}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
