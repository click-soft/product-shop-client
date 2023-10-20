import React from 'react';
import styles from './ServiceInfo.module.scss';

const ServiceInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>서비스 유형</div>
        <div className={styles.detail}>
          유형재화
          <ul>
            <li>전산용지</li>
            <li>서명패드</li>
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>배송기간</div>
        <div className={styles.detail}>
          <ul>
            <li>배송업체 : 롯데택배, 로젠택배 외</li>
            <li>배송지역 : 대한민국 전지역</li>
            <li>배송비용 : 상품비용에 포함/도서산간 추가발생비용 없음</li>
            <li>
              배송기간 : 주말, 공휴일 제외 2일~5일
              <br />
              <span className={styles.sub_text}>
                주문상품의 경우 주말, 공휴일 제외 2주~3주
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>교환 및 반품안내</div>
        <div className={styles.detail}>
          <ul>
            <li>
              신청방법 : 상품을 수령하신 날로부터 7일 이내
              <br />
              <span className={styles.sub_text}>
                tel.063-251-0510으로 문의 후 접수
              </span>
            </li>
            <li>
              배송비용 : 단순변심의 경우 소비자 부담, 반품의 경우 당사 착불 배송
            </li>
            <li>반품주소 : 광주광역시 북구 새터마을길 32(주)산소와생명</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
