import { gql } from '@apollo/client';

export const GET_RPDUCTS_BUNRYU_LIST = gql`
  query ($jisa: String!) {
    getProductsBunryuList(filter: { jisa: $jisa }) {
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
