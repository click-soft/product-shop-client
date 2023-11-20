import './App.scss';
import { RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { checkAdminLoader, checkAuthLoader, checkLoginLoader } from './utils/loaders/auth';
import CartViewPage from './pages/CartViewPage/CartViewPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage/PaymentSuccessPage';
import PaymentFailPage from './pages/PaymentFailPage/PaymentFailPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import PaymentProcessingPage from './pages/PaymentProcessingPage/PaymentProcessingPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DefaultLayout from './Layout/DefaultLayout/DefaultLayout';
import AdminLayout from './Layout/AdminLayout/AdminLayout';
import PaymentLayout from './Layout/PaymentLayout/PaymentLayout';
import RootLayout from './Layout/RootLayout/RootLayout';
import AdminOrderPage from './pages/AdminOrderPage/AdminOrderPage';
import AdminWebOrdersPage from './pages/AdminWebOrdersPage/AdminWebOrdersPage';
import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
import CenterLayout from './Layout/CenterLayout/CenterLayout';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import SettingsLayout from './Layout/SettingsLayout/SettingsLayout';
import SettingsProfilePage from './pages/SettingsProfilePage/SettingsProfilePage';
import './sentry/sentry.config';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
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
        path: '/',
        element: <CenterLayout />,
        children: [
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
            path: '/find-password',
            element: <FindPasswordPage />,
          },
          {
            path: '/change-password',
            element: <ChangePasswordPage />,
          },
        ],
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
      {
        path: 'settings',
        element: <SettingsLayout />,
        loader: checkAuthLoader,
        children: [
          {
            path: 'profile',
            element: <SettingsProfilePage />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'orders',
            element: <AdminOrderPage />,
            errorElement: <ErrorPage />,
            loader: checkAdminLoader,
          },
          {
            path: 'web-orders',
            element: <AdminWebOrdersPage />,
            loader: checkAdminLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  console.log(123);
  return <RouterProvider router={router} />;
}

export default App;
