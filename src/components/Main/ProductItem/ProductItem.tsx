import ProductListSub from '../../../interfaces/product-list-sub';
import useModalStore from '../../../store/modal.store';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  productCode: string;
  productList: ProductListSub;
}
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { showProduct } = useModalStore();
  const pls = props.productList;
  const itemClickHandler = () => {
    showProduct({ code: props.productCode, data: pls });
  };

  return (
    <li className={styles.item} onClick={itemClickHandler}>
      <section>
        <div className={styles.item__name}>{pls.smMyung}</div>
      </section>
      <section>
        <div className={styles.item__unit}>{pls.danwi}</div>
      </section>
      <section>
        <div className={styles.cost}>{pls.danga.toLocaleString()}원</div>
      </section>
    </li>
  );
};

export default ProductItem;
