import './App.scss';
import { RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader, checkLoginLoader } from './utils/auth';
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
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'orders',
            element: <AdminOrderPage/>,
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
