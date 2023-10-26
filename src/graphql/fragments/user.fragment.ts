import { gql } from '@apollo/client';

export const CS_FIELD = gql`
  fragment CsField on CsType {
    gubun
    code
    myung
    daepyo
    saupnum
    youngsu
    cherbang
  }
`;
