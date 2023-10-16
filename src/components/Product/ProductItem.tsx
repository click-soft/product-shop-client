import ProductListSub from '../../interfaces/ProductListSub';
import styles from './ProductItem.module.scss';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

interface ProductItemProps {
  productCode: string;
  productList: ProductListSub;
}
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const pls = props.productList;
  const dispatch = useDispatch();
  const formatedDanga = Intl.NumberFormat('ko-KR').format(pls.danga);

  const itemClickHandler = () => {
    dispatch(
      modalActions.showProduct({ productCode: props.productCode, data: pls }),
    );
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
        <div className={styles.cost}>{formatedDanga}원</div>
      </section>
    </li>
  );
};

export default ProductItem;
