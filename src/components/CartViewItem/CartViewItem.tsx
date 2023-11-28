import React from 'react';
import CartItem from '../../interfaces/cart-item';
import styles from './CartViewItem.module.scss';
import IntUpAndDown from '../../ui/IntUpAndDown/IntUpAndDown';
import useCartViewStore from '../../store/cart-view.store';
import { defaultProductCount } from '@/utils/product.utils';
interface CartViewItemProps {
  cartItem: CartItem;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onCountChange: (id: number, value: number) => void;
  onCancel: (id: number) => void;
}

const CartViewItems: React.FC<CartViewItemProps> = (props) => {
  const { loading } = useCartViewStore();
  const ci = props.cartItem;
  const totalPrice = ci.quantity * (ci.product?.danga ?? 0);

  const step = ci.product?.productList?.step ?? 1;

  function checkChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    props.onCheckChange(event.target.checked);
  }

  return (
    <tr key={ci.id}>
      <td className={styles.first_column}>
        <input type="checkbox" checked={props.checked} onChange={checkChangeHandler} />
      </td>
      <td colSpan={2}>
        <div className={styles.cart_item}>
          <div className={styles.cart_item__head}>
            <div className={styles.detail__head__product}>
              <div className={styles.product_name}>{ci.product?.smMyung}</div>
              <div className={styles.detail__head__product__info}>
                {ci.fit && <div className={styles.product_info}>맞춤주문</div>}
                {ci.product?.danwi && <div className={`${styles.unit_style}`}>Box</div>}
              </div>
            </div>
          </div>
          <div className={styles.cart_item__body}>
            <div className={styles.cart_item__body__left}>
              <div className={styles.cart_item__body__price}>{ci.product?.danga?.toLocaleString()}원</div>
              <IntUpAndDown
                value={ci.quantity}
                step={step}
                min={defaultProductCount({ isFit: ci.fit, step })}
                disabled={loading}
                onChange={(v) => props.onCountChange(ci.id!, v)}
              />
            </div>

            <button className={styles.cancel_button} onClick={props.onCancel.bind(null, ci.id!)}>
              취소
            </button>
          </div>
        </div>
      </td>
      <td className={styles.last_column}>
        <div>{totalPrice.toLocaleString()}원</div>
      </td>
    </tr>
  );
};

export default CartViewItems;
