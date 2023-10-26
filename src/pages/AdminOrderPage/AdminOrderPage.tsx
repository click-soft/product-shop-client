import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminOrderPage.module.scss';
import { useMutation } from '@apollo/client';
import { GET_ADMIN_PRODUCTS } from '../../graphql/queries/product';
import CircleLoading from '../../components/Loading/CircleLoading';
import Product from '../../graphql/interfaces/product';
import AdminOrderItem, { AdminOrderArgs } from '../../components/Admin/AdminOrderItem/AdminOrderItem';
import { UPDATE_PRODUCT } from '../../graphql/mutates/product';
import useToast from '../../hooks/use-toast';
import useGetManagers from '../../hooks/use-get-managers';
import AdminSearchForm, { FormValues } from '../../components/Admin/AdminSearchForm/AdminSearchForm';
import { useInfiniteQuery } from 'react-query';
import GetAdminProductsArgs from '../../graphql/dto/get-admin-products.args';
import client from '../../graphql/apollo-client';
import ProductsWithPage from '../../graphql/interfaces/products-with-page';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import dayjs from 'dayjs';

const fetchGetAdminProducts = async (page: number, variables: GetAdminProductsArgs): Promise<ProductsWithPage> => {
  if (!variables?.startYmd) {
    return { isLast: true, page: 0, products: [] };
  }

  const result = await client.query({
    query: GET_ADMIN_PRODUCTS,
    variables: {
      startYmd: variables.startYmd,
      endYmd: variables.endYmd,
      page,
    },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getAdminProducts;
};

const GET_ADMIN_QUERY_KEY = 'getAdminProducts';

const AdminOrderPage = () => {
  const [variables, setVariables] = useState<GetAdminProductsArgs>();
  const { toast, toastConatiner } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const { managers } = useGetManagers();
  const [updateProduct, { data: updatedData, loading: updatedLoading, error: updatedError }] =
    useMutation(UPDATE_PRODUCT);

  const { isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    [GET_ADMIN_QUERY_KEY, variables],
    ({ pageParam = 1 }) => fetchGetAdminProducts(pageParam, variables!),
    {
      getNextPageParam: (nextPage, pages) => {
        if (nextPage?.isLast ?? true) {
          return null;
        }
        return nextPage.page + 1;
      },
      onSuccess: (data) => {
        const products = data.pages?.flatMap((pg) => pg.products);
        setProducts(products ?? []);
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      },
    }
  );

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
    onIntersecting: () => {
      fetchNextPage();
    },
  });

  function orderChangeHandler(args: AdminOrderArgs, product: Product) {
    updateProduct({
      variables: {
        auto: product.auto,
        orderCheck: args.type === '배송방법' ? args.value : undefined,
        seller: args.type === '배송자' ? args.value : undefined,
      },
    });
  }

  useEffect(() => {
    if (!updatedData) return;

    const product: Product = updatedData.updateProduct;

    if (!product) return;

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const findProduct = newProducts?.find((p) => p.auto === product.auto);

      if (!findProduct) return prevProducts;

      if (product.orderCheck !== undefined) findProduct.orderCheck = product.orderCheck;
      if (product.seller !== undefined) findProduct.seller = product.seller;

      return newProducts;
    });
    toast.success('변경되었습니다.');
  }, [updatedData]);

  useEffect(() => {
    if (updatedError) {
      toast.error(updatedError.message);
    }
  }, [updatedError]);

  const components = products?.map((p) => {
    return (
      <AdminOrderItem
        key={p.auto}
        product={p}
        managers={managers}
        onValueChange={(args) => orderChangeHandler(args, p)}
      />
    );
  });

  function submitHandler({ startDate, endDate, manager, text: customerName }: FormValues): void {
    const startYmd = dayjs(startDate).format('YYYYMMDD');
    const endYmd = dayjs(endDate).format('YYYYMMDD');

    setVariables({
      startYmd,
      endYmd,
      emCode: manager,
      csMyung: customerName,
      page: 1,
    });
  }

  return (
    <>
      {toastConatiner}
      {(isLoading || updatedLoading) && <CircleLoading />}
      <div className={styles.container}>
        <AdminSearchForm onSubmit={submitHandler} textLabel="거래처 명칭" />

        <ul className={styles.list}>{components}</ul>
      </div>
      {observerComponent}
    </>
  );
};

export default AdminOrderPage;
