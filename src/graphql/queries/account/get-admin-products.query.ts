import client from '../../apollo-client';
import GetAdminProductsArgs from '../../dto/get-admin-products.args';
import { GET_ADMIN_PRODUCTS } from '../../gql/product';
import ProductsWithPage from '../../interfaces/products-with-page';

const getAdminProductsQuery = async (page: number, variables: GetAdminProductsArgs): Promise<ProductsWithPage> => {
  const result = await client.query({
    query: GET_ADMIN_PRODUCTS,
    variables: {
      ...variables,
      page,
    },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getAdminProducts;
};

export default getAdminProductsQuery;
