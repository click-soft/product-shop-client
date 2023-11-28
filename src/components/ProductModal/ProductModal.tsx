import Modal from '../../ui/Modal/Modal';
import styles from './ProductModal.module.scss';
import React, { useEffect, useState } from 'react';
import CheckBox from '../../ui/CheckBox/CheckBox';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import CustomLi from './CustomLi/CustomLi';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../ui/Drawer/Drawer';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import useCart from '../../hooks/use-cart';
import useModalStore from '../../store/modal.store';
import IntUpAndDown from '../../ui/IntUpAndDown/IntUpAndDown';

const ProductModal = () => {
  const { fetchAddToCart } = useCart();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [fitChecked, setFitChecked] = useState<boolean>(false);
  const { productPayload, showProductModal, closeProduct } = useModalStore();
  const productData = productPayload?.data;
  const step = productData?.productList?.step ?? 1;
  const { isFitProduct, defaultFit, defaultQuantity } = useProductState(showProductModal, step);
  const [quantity, setQuantity] = useState(step);

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
      code: productData?.smCode ?? '',
      quantity,
      fit: fitChecked ?? false,
    });

    closeProduct();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addItemToCart();
  };

  function addAndToCartHandler(): void {
    addItemToCart().then(() => {
      navigate('/cart-view');
    });
  }

  console.log(productData?.smMyung, productData?.productList?.step);

  return (
    <Modal onBackdropClick={closeProduct}>
      <form className={`${styles.container}`} onSubmit={submitHandler}>
        <h3 className={`header-text ${styles.header}`}>주문하기</h3>
        <div className={styles.body}>
          <ul>
            <CustomLi title="주문명칭" text={productData?.smMyung} />
            <CustomLi title="단위" text={productData?.danwi} />
            <CustomLi title="금액" text={productData?.danga?.toLocaleString()} />
            <CustomLi title="수량">
              <IntUpAndDown value={quantity} step={step} min={step} onChange={quantityChangeHandler} />
            </CustomLi>
            <CustomLi title="총 금액" text={(quantity * (productData?.danga ?? 0)).toLocaleString()} />
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
          <button className={styles['cancel-button']} type="button" onClick={closeProduct}>
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

const useProductState = (isShown: boolean, step: number) => {
  const user = useGetLoginedUser();
  const [defaultFit, setDefaultFit] = useState(false);
  const [defaultQuantity, setDefaultQuantity] = useState(2);
  const isFitProduct = useModalStore((state) => ['A', 'B'].includes(state.productPayload?.code ?? ''));

  useEffect(() => {
    if (!isShown || !user) return;

    setDefaultFit(isFitProduct && user?.fitCherbang);
  }, [isShown, isFitProduct, user?.fitCherbang]);

  useEffect(() => {
    if (!isShown) return;

    setDefaultQuantity(defaultFit ? 6 : step);
  }, [defaultFit]);

  return {
    isFitProduct,
    defaultFit,
    defaultQuantity,
  };
};

export default ProductModal;
