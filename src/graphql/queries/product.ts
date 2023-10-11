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
