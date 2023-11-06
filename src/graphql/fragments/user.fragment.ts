import { gql } from '@apollo/client';

export const CS_FIELD = gql`
  fragment CsField on CsType {
    jisa
    code
    myung
    daepyo
    saupnum
    youngsu
    cherbang
  }
`;
