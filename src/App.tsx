import './App.scss';
import { RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Layout/RootLayout';
import { checkAuthLoader, checkLoginLoader } from './utils/auth';
import CartViewPage from './pages/CartView/CartViewPage';
import ErrorPage from './pages/Error/ErrorPage';
import PaymentPage from './pages/Payment/PaymentPage';
import PaymentLayout from './pages/Layout/Payment/PaymentLayout';
import PaymentSuccessPage from './pages/PaymentSuccess/PaymentSuccessPage';
import PaymentFailPage from './pages/PaymentFail/PaymentFailPage';
import OrdersPage from './pages/Orders/OrdersPage';
import PaymentProcessingPage from './pages/PaymentProcessing/PaymentProcessingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader: checkAuthLoader,
      },
      {
        path: 'cart-view',
        element: <CartViewPage />,
        loader: checkAuthLoader,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
        loader: checkAuthLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: checkLoginLoader,
  },
  {
    path: '/payment',
    element: <PaymentLayout />,
    loader: checkAuthLoader,
    children: [
      {
        index: true,
        element: <PaymentPage />,
      },
      {
        path: 'processing',
        element: <PaymentProcessingPage />,
      },
      {
        path: 'success',
        element: <PaymentSuccessPage />,
      },
      {
        path: 'fail',
        element: <PaymentFailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
