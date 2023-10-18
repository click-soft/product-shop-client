import Modal from '../../ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import styles from './ProductModal.module.scss';
import ProductListSub from '../../interfaces/ProductListSub';
import CartProduct from '../../interfaces/CartItem';
import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../../utils/strings';
import { addToCart, fetchGetItemsCount } from '../../store/cart-slice';
import CheckBox from '../../ui/CheckBox/CheckBox';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import CustomLi from './components/CustomLi/CustomLi';
import NumericUpDown from './components/NumericUpDown/NumericUpDown';
import ErrorText from '../../ui/ErrorText/ErrorText';
import { useNavigate } from 'react-router-dom';

const ProductModal = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [fitChecked, setFitChecked] = useState<boolean | undefined>(false);
  const [fitError, setFitError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const showProductModal = useSelector<RootState, boolean>(
    (state) => state.modal.showProductModal,
  );
  const user = useGetLoginedUser(showProductModal);
  const productCode = useSelector<RootState, string>(
    (state) => state.modal.productCode!,
  );
  const productData = useSelector<RootState, ProductListSub>(
    (state) => state.modal.data!,
  );
  const totalCost = formatCurrency(quantity * productData?.danga);
  const cost = formatCurrency(productData?.danga);
  const isFitProduct = ['A', 'B'].includes(productCode);

  useEffect(() => {
    if (!showProductModal) return;

    if (isFitProduct && fitChecked && quantity < 6) {
      setFitError('맞춤주문은 6개 이상 주문 필수입니다.');
    } else {
      setFitError('');
    }
  }, [showProductModal, quantity, fitChecked]);

  useEffect(() => {
    if (showProductModal) {
      setFitChecked(isFitProduct ? user?.fitCherbang : false);
    }
  }, [showProductModal, user?.fitCherbang]);

  useEffect(() => {
    if (!showProductModal) return;

    setFitChecked(isFitProduct);
    setQuantity(isFitProduct ? 6 : 1);
  }, [showProductModal]);

  if (!showProductModal) {
    return <></>;
  }

  const quantityChangeHandler = (value: number) => {
    setQuantity(value);
  };

  const fitCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFitChecked(e.target.checked);
  };

  const addItemToCart = async () => {
    await dispatch(
      addToCart({
        code: productData.smCode,
        quantity,
        fit: fitChecked ?? false,
      }),
    );

    closeHandler();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addItemToCart();
  };

  const closeHandler = () => {
    dispatch(modalActions.closeProduct());
  };

  function addAndToCartHandler(): void {
    addItemToCart().then((_) => {
      navigate('/cart-view');
    });
  }

  return (
    <Modal onBackdropClick={closeHandler}>
      <form className={`${styles.container}`} onSubmit={submitHandler}>
        <h3 className={`header-text ${styles.header}`}>주문하기</h3>
        <div className={styles.body}>
          <ul>
            <CustomLi title="주문명칭" text={productData.smMyung} />
            <CustomLi title="단위" text={productData.danwi} />
            <CustomLi title="금액" text={cost} />
            <NumericUpDown
              quantity={quantity}
              onQuantityChange={quantityChangeHandler}
            />
            <ErrorText error={fitError} />
            <CustomLi title="총 금액" text={totalCost} />
            {isFitProduct && (
              <CheckBox
                text="맞춤주문"
                checked={fitChecked}
                onChange={fitCheckHandler}
              />
            )}
          </ul>
        </div>
        <div className={styles.footer}>
          <button
            className={styles['add-and-to-cart-button']}
            type="button"
            onClick={addAndToCartHandler}
          >
            장바구니
            <br />
            바로가기
          </button>
          <button
            className={styles['to-cart-button']}
            type="submit"
            disabled={!!fitError}
          >
            장바구니
            <br />
            담기
          </button>
          <button
            className={styles['cancel-button']}
            type="button"
            onClick={closeHandler}
          >
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
