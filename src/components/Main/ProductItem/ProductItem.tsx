import ProductListWebBunryu from '@/graphql/interfaces/product-list-web-bunryu';
import useGetLoginedUser from '../../../hooks/use-get-logined-user';
import ProductListSub from '../../../interfaces/product-list-sub';
import useModalStore from '../../../store/modal.store';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  productCode: string;
  productList: ProductListSub;
  webBunryu?: ProductListWebBunryu;
}
const ProductItem: React.FC<ProductItemProps> = ({ productCode, productList, webBunryu }) => {
  const { showProduct } = useModalStore();
  const user = useGetLoginedUser();
  const pls = productList;
  const itemClickHandler = () => {
    showProduct({ code: productCode, data: pls, webBunryu });
  };

  const url = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = `${url}/images/productlist_image/${user?.jisa}/${pls.smCode}`;

  return (
    <li className={styles.item} onClick={itemClickHandler}>
      <img className={styles.item__image} src={imageUrl} alt="상품 이미지" />
      <div>
        <div className={styles.item__name}>{pls.smMyung}</div>
        <div className={styles.item__unit}>{pls.danwi}</div>
        <div className={styles.cost}>{pls.danga.toLocaleString()}원</div>
      </div>
    </li>
  );
};

export default ProductItem;
