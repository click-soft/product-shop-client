import BuyArea from '../../components/BuyArea/BuyArea';
import CircleLoading from '../../components/Loading/CircleLoading';
import CartViewTable from '../../components/CartView/CartViewTable/CartViewTable';
import useCartViewStore from '../../store/cartViewStore';
import { useEffect } from 'react';
import EmptyCartView from '../../components/EmptyCartView/EmptyCartView';

const CartViewPage = () => {
  const { cart, loading, initialized, clear } = useCartViewStore();

  useEffect(() => {
    return clear;
  }, []);

  if (initialized) {
    if (!loading && !cart?.cartItems.length) {
      return <EmptyCartView />;
    }
  }

  return (
    <>
      {loading && <CircleLoading />}
      <CartViewTable />
      <BuyArea />
    </>
  );
};

export default CartViewPage;
