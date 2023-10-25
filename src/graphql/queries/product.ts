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
  query (
    $startYmd: String!,
    $endYmd: String!,
    $emCode: String,
    $csMyung: String,
    $page: Int!){
    getAdminProducts(
      startYmd: $startYmd, 
      endYmd: $endYmd,
      emCode: $emCode,
      csMyung: $csMyung,
      page: $page ){
      page
      isLast
      products{
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
  }
`