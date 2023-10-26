import ProductListSub from './ProductListSub';

export default interface CartProduct {
  id?: number;
  code: string;
  quantity: number;
  unit?: string;
  price?: number;
  fit: boolean;
  product?: ProductListSub;
}
