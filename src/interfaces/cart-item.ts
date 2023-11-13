import ProductListSub from './product-list-sub';

export default interface CartProduct {
  id?: number;
  code: string;
  quantity: number;
  unit?: string;
  price?: number;
  fit: boolean;
  product?: ProductListSub;
}
