import React, { useEffect, useState } from 'react';
import styles from './CartViewTable.module.scss';
import CartViewBody from '../CartViewBody/CartViewBody';
import useCartViewStore from '../../../store/cartViewStore';

const CartViewTable = () => {
  const { cart, checkedIds, setCheckAll } = useCartViewStore();
  const [allCheck, setAllCheck] = useState<boolean>(true);

  function allCheckChangeHandler(checked: boolean) {
    setCheckAll(checked);
  }

  useEffect(() => {
    const isAllChecked = checkedIds?.length === cart?.cartItems.length;
    setAllCheck(isAllChecked);
  }, [checkedIds]);

  return (
    <div className={styles.container}>
      <table>
        <caption className={styles.caption}>장바구니 목록</caption>
        <colgroup>
          <col width={50} />
          <col span={2} width="*" />
          <col width={100} />
        </colgroup>

        <thead className={styles.head}>
          <tr>
            <th className={`${styles.first_column} ${styles.first_column_header}`}>
              <label>
                <input type="checkbox" checked={allCheck} onChange={(e) => allCheckChangeHandler(e.target.checked)} />
                <span>전체</span>
              </label>
            </th>
            <th>상품정보</th>
            <th></th>
            <th>상품금액</th>
          </tr>
        </thead>

        <CartViewBody />
      </table>
    </div>
  );
};

export default CartViewTable;
