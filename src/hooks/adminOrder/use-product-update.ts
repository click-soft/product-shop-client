import { useMutation } from '@apollo/client';
import { AdminOrderArgs } from '../../components/Admin/AdminOrderItem/AdminOrderItem';
import Product from '../../graphql/interfaces/product';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { adminOrderAction } from '../../store/admin-order-slice';
import { toast } from 'react-toastify';
import { UPDATE_PRODUCT } from '../../graphql/gql/product';

const useProductUpdate = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.adminOrder.products);
  const [updateProduct, { data, loading, error }] = useMutation(UPDATE_PRODUCT);

  function fetchUpdateProduct(args: AdminOrderArgs, product: Product) {
    return updateProduct({
      variables: {
        auto: product.auto,
        orderCheck: args.type === '배송방법' ? args.value : undefined,
        seller: args.type === '배송자' ? args.value : undefined,
      },
    });
  }

  useEffect(() => {
    dispatch(adminOrderAction.setUpdateLoading(loading));
  }, [loading]);

  useEffect(() => {
    if (!data) return;

    const product: Product = data.updateProduct;

    if (!product) return;

    let newProducts = [...products];
    let findProductIndex = products.findIndex((p) => p.auto === product.auto);

    if (findProductIndex !== -1) {
      const updatedProduct = {
        ...newProducts[findProductIndex],
        ...(product.orderCheck !== undefined ? { orderCheck: product.orderCheck } : {}),
        ...(product.seller !== undefined ? { seller: product.seller } : {}),
      };

      newProducts[findProductIndex] = updatedProduct;
    }
    dispatch(adminOrderAction.setProducts(newProducts));
    toast.success('변경되었습니다.');
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return { fetchUpdateProduct };
};

export default useProductUpdate;
