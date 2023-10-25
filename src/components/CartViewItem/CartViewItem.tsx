import React from 'react';
import CartItem from '../../interfaces/CartItem';
import styles from './CartViewItem.module.scss';
import ProductQuantitySelect from '../ProductQuantitySelect/ProductQuantitySelect';
import NumericCombo from '../../ui/NumericCombo/NumericCombo';
interface CartViewItemProps {
  cartItem: CartItem;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onCountChange: (id: number, value: number) => void;
  onCancel: (id: number) => void;
}

const CartViewItems: React.FC<CartViewItemProps> = (props) => {
  const ci = props.cartItem;
  const totalPrice = ci.quantity * ci.product?.danga!;

  function checkChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    props.onCheckChange(event.target.checked);
  }

  return (
    <tr key={ci.id}>
      <td className={styles['first-column']}>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={checkChangeHandler}
        />
      </td>
      <td className={styles['second-column']} colSpan={2}>
        <div className={styles['cart-item']}>
          <div className={styles['cart-item__head']}>
            <div className={styles['detail__head__product']}>
              <div className={styles['product-name']}>
                {ci.product?.smMyung}
              </div>
              <div className={styles['detail__head__product__info']}>
                {ci.fit && (
                  <div className={styles['product-info']}>맞춤주문</div>
                )}
                {ci.product?.danwi && (
                  <div className={`${styles['unit-style']}`}>Box</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles['cart-item__body']}>
            <div className={styles['cart-item__body__left']}>
              <div className={styles['cart-item__body__price']}>
                {ci.product?.danga?.toLocaleString()}원
              </div>
              <NumericCombo
                value={ci.quantity}
                onValueChange={(v) => props.onCountChange(ci.id!, v)}
                isFit={ci.fit}
              />
              {/* <ProductQuantitySelect
                value={ci.quantity}
                onChange={(v) => props.onCountChange(ci.id!, v)}
                isFit={ci.fit}
              /> */}
            </div>

            <button
              className={styles['cancel-button']}
              onClick={props.onCancel.bind(null, ci.id!)}
            >
              취소
            </button>
          </div>
        </div>
      </td>
      <td className={styles['last-column']}>{totalPrice.toLocaleString()}원</td>
    </tr>
  );
};

export default CartViewItems;
