import { gql } from '@apollo/client';

export const GET_RPDUCTS_BUNRYU_LIST = gql`
  query ($jisa: String! $bunryu: String) {
    getProductsBunryuList(jisa: $jisa bunryu: $bunryu) {
      bunryu
      products {
        auto
        jisa
        smCode
        smMyung
        danga
        danwi
      }
    }
  }
`;

export const GET_ADMIN_PRODUCTS = gql`
  query ($startYmd: String!, $endYmd: String!){
    getAdminProducts(startYmd: $startYmd, endYmd: $endYmd ){
      clCode
      csCode
      count
      sellYmd
      createDt
      etc1
      cs {
        gubun
        code
        myung
        em{
          name
        }
      }
      productListSub{
        smMyung
        danga
      }
    }
  }
`