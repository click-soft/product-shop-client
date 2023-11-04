interface MenuObject {
  [key: string]: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
}

export const menuObject: MenuObject = {
  A: '처방전',
  B: '영수증',
  C: '의무기록지',
  D: '바코드용지',
  E: '기타용품',
  F: '거래명세서',
};

export const deliveryData: {
  [key: string]: string;
} = {
  CJ: 'kr.cjlogistics',
  롯데: 'kr.lotte',
  로젠: 'kr.logen',
};
