import ProductList from './product-list';

export default interface ProductListSub {
  auto: number;
  smCode: string;
  smMyung: string;
  danwi: string;
  danga: number;

  productList: ProductList;
}
