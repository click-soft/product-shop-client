import ProductListWebBunryu from '@/graphql/interfaces/product-list-web-bunryu';
import ProductListSub from './product-list-sub';

export default interface ProductsByBunryu {
  bunryu: string;
  products: ProductListSub[];
}

export interface ProductsWithWebBunryu extends ProductsByBunryu {
  webBunryu?: ProductListWebBunryu;
}
