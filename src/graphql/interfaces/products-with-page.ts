import Product from './product';

export default interface ProductsWithPage {
  page: number;
  isLast: boolean;
  products: Product[];
}
