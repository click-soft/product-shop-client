import client from '@/graphql/apollo-client';
import { GET_WEB_BUNRYUS } from '@/graphql/gql/product-list-web-bunryu';
import ProductListWebBunryu from '@/graphql/interfaces/product-list-web-bunryu';

const getWebBunryus = async (): Promise<ProductListWebBunryu[]> => {
  const response = await client.query({
    query: GET_WEB_BUNRYUS,
  });

  return response.data?.getWebBunryus;
};

export default getWebBunryus;
