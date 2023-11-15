import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation ($auto: Int!, $orderCheck: String, $seller: String) {
    updateProduct(auto: $auto, orderCheck: $orderCheck, seller: $seller) {
      auto
      orderCheck
      seller
    }
  }
`;

export const GET_RPDUCTS_BUNRYU_LIST = gql`
  query ($jisa: String!, $bunryu: String) {
    getProductsBunryuList(jisa: $jisa, bunryu: $bunryu) {
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
  query ($startYmd: String!, $endYmd: String!, $emCode: String, $csMyung: String, $page: Int!) {
    getAdminProducts(startYmd: $startYmd, endYmd: $endYmd, emCode: $emCode, csMyung: $csMyung, page: $page) {
      page
      isLast
      products {
        auto
        clCode
        csCode
        count
        sellYmd
        createDt
        etc1
        orderCheck
        sell
        seller
        check2
        bigo
        web
        cs {
          gubun
          code
          myung
          em {
            code
            name
          }
        }
        productListSub {
          smMyung
          danga
        }
      }
    }
  }
`;
