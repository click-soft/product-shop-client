import ProductListSub from "../../interfaces/ProductListSub";
import Cs from "./cs";

export default interface Product {
  auto: number;
  jisa: string;
  clCode: string;
  csCode: string;
  ctTel: string;
  count: number;
  receive: string;
  receiveYmd: string;
  sell: string;
  sellYmd: string;
  orderCheck: string;
  seller: string;
  check: string;
  check2: string;
  rgb: string;
  bigo: string;
  createDt: Date;
  bigo2?: string | null;
  etc1?: string | null;
  etc2?: string | null;
  etc3?: string | null;
  etc4?: string | null;
  etc5?: string | null;
  web: boolean;
  webPaymentItemId: number;
  cs?: Cs;
  productListSub?: ProductListSub;
}