import Modal from '../../ui/Modal/Modal';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { modalActions } from '../../store/modal-slice';
import styles from './ProductModal.module.scss';
import ProductListSub from '../../interfaces/product-list-sub';
import React, { useEffect, useState } from 'react';
import CheckBox from '../../ui/CheckBox/CheckBox';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import CustomLi from './components/CustomLi/CustomLi';
import { useNavigate } from 'react-router-dom';
import ProductQuantitySelect from '../ProductQuantitySelect/ProductQuantitySelect';
import Drawer from '../../ui/Drawer/Drawer';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import useCart from '../../hooks/use-cart';

const ProductModal = () => {
  const { fetchAddToCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [fitChecked, setFitChecked] = useState<boolean>(false);
  const showProductModal = useAppSelector<boolean>((state) => state.modal.showProductModal);
  const { isFitProduct, defaultFit, defaultQuantity } = useProductState(showProductModal);
  const productData = useAppSelector<ProductListSub>((state) => state.modal.data!);

  useEffect(() => {
    if (!showProductModal) return;

    setFitChecked(defaultFit);
    setQuantity(defaultQuantity);
  }, [showProductModal, defaultFit]);

  useEffect(() => {
    setQuantity(defaultQuantity);
  }, [fitChecked]);

  if (!showProductModal) return <></>;

  const quantityChangeHandler = (value: number) => {
    setQuantity(value);
  };

  const fitCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFitChecked(e.target.checked);
  };

  const addItemToCart = async () => {
    await fetchAddToCart({
      code: productData.smCode,
      quantity,
      fit: fitChecked ?? false,
    });

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
            <CustomLi title="금액" text={productData?.danga?.toLocaleString()} />
            <CustomLi title="수량">
              <ProductQuantitySelect value={quantity} onChange={quantityChangeHandler} isFit={fitChecked ?? false} />
            </CustomLi>
            <CustomLi title="총 금액" text={(quantity * productData?.danga).toLocaleString()} />
            {isFitProduct && <CheckBox text="맞춤주문" checked={fitChecked} onChange={fitCheckHandler} />}
          </ul>
        </div>
        <div className={styles.footer}>
          <button className={styles['add-and-to-cart-button']} type="button" onClick={addAndToCartHandler}>
            장바구니
            <br />
            바로가기
          </button>
          <button className={styles['to-cart-button']} type="submit">
            장바구니
            <br />
            담기
          </button>
          <button className={styles['cancel-button']} type="button" onClick={closeHandler}>
            취소
          </button>
        </div>
      </form>
      <div
        className={styles.service_info}
        onClick={() => {
          setShow(true);
        }}
      >
        서비스 안내
      </div>
      <Drawer anchor="bottom" overflow="auto" zIndex={10000} show={show} onClose={() => setShow(false)}>
        <ServiceInfo />
      </Drawer>
    </Modal>
  );
};

const useProductState = (isShown: boolean) => {
  const user = useGetLoginedUser(isShown);
  const [defaultFit, setDefaultFit] = useState(false);
  const [defaultQuantity, setDefaultQuantity] = useState(2);
  const isFitProduct = useAppSelector<boolean>((state) => ['A', 'B'].includes(state.modal.productCode ?? ''));

  useEffect(() => {
    if (!isShown || !user) return;

    setDefaultFit(isFitProduct && user?.fitCherbang!);
  }, [isShown, isFitProduct, user?.fitCherbang]);

  useEffect(() => {
    if (!isShown) return;

    setDefaultQuantity(defaultFit ? 6 : 2);
  }, [defaultFit]);

  return {
    isFitProduct,
    defaultFit,
    defaultQuantity,
  };
};

export default ProductModal;
