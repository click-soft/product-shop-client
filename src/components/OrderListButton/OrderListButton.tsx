import IconButton from '@/ui/IconButton/IconButton';
import { BiBasket } from 'react-icons/bi';
import useResizeWindow from '@/hooks/use-resize-window';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderListButton = () => {
  const { isMobile } = useResizeWindow();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleToOrderList(): void {
    navigate('/orders');
  }

  if (pathname?.toLowerCase() === '/orders') {
    return <></>;
  }
  return <IconButton icon={BiBasket} text={isMobile ? '' : '주문내역'} onClick={handleToOrderList} />;
};

export default OrderListButton;
