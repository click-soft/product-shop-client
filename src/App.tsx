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
import SignupPage from './pages/SignupPage/SignupPage';
import BaseLayout from './pages/Layout/Payment/BaseLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            path: '/',
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
        path: '/signup',
        element: <SignupPage />,
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
            path: 'success/:orderId',
            element: <PaymentSuccessPage />,
          },
          {
            path: 'fail',
            element: <PaymentFailPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
