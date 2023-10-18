import React, { ReactNode, useEffect, useState } from 'react';
import styles from './AdminOrderPage.module.scss';
import DateRangePicker from '../../ui/DateRangePicker/DateRangePicker';
import { Select } from '@mui/joy';
import Option from '@mui/joy/Option';
import classNames from 'classnames';
import { useLazyQuery } from '@apollo/client';
import { GET_ADMIN_PRODUCTS } from '../../graphql/queries/product';
import { format, parse } from 'date-fns';
import CircleLoading from '../../components/Loading/CircleLoading';
import Product from '../../graphql/interfaces/product';
import { ymdToShortString } from '../../utils/parse';

const AdminOrderPage = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [getAdminProducts, { data, error, loading }] =
    useLazyQuery(GET_ADMIN_PRODUCTS);
  function dateChangeHandler(startDate: Date, endDate: Date): void {
    setDateRange({ startDate, endDate });
  }

  useEffect(() => {
    const startYmd = format(dateRange.startDate, 'yyyyMMdd');
    const endYmd = format(dateRange.endDate, 'yyyyMMdd');
    const variables = { startYmd, endYmd };

    getAdminProducts({ variables: variables });
  }, [dateRange]);

  if (error) {
    throw new Error(error.message);
  }

  const products: Product[] = data?.getAdminProducts;
  console.log(products);

  const components = products?.map((p) => {
    console.log('p.createDt', p.createDt);
    const createDateString = format(new Date(p.createDt), 'yyyy-MM-dd HH:mm');

    return (
      <li key={p.auto} className={styles.list_item}>
        <div className={styles.header}>
          <DataBox label="접수일시" text={createDateString} />
          <DataBox label="담당자" text={p.cs?.em.name!} />
        </div>
        <div className={styles.item_group}>
          <div className={styles.text_group}>
            <DataBox label="거래처코드" text={p.csCode} isFlexColumn={true} />
            <DataBox label="거래처" text={p.cs?.myung!} isFlexColumn={true} />
          </div>
          <div className={styles.text_group}>
            <DataBox label="상품코드" text={p.clCode} isFlexColumn={true} />
            <DataBox
              label="상품명칭"
              text={p.productListSub?.smMyung}
              isFlexColumn={true}
            />
          </div>
          <div className={styles.text_group}>
            <DataBox label="수량" text={p.count} isFlexColumn={true} />
            X
            <DataBox
              label="단가"
              text={p.productListSub?.danga!.toLocaleString()}
              isFlexColumn={true}
            />
            =
            <DataBox
              label="금액"
              text={(p.productListSub?.danga! * p.count).toLocaleString()}
              isFlexColumn={true}
            />
          </div>
          {(p.sellYmd || p.etc1) && (
            <div className={styles.text_group}>
              <DataBox
                label="발주일"
                text={ymdToShortString(p.sellYmd)}
                isFlexColumn={true}
              />
              <DataBox label="발주여부" text={p.etc1} isFlexColumn={true} />
            </div>
          )}
        </div>
      </li>
    );
  });

  return (
    <>
      {loading && <CircleLoading />}
      <div className={styles.container}>
        <div className={styles.search_wrapper}>
          <div className={styles.select_wrapper}>
            담당자
            <Select className={styles.select} defaultValue="전체" color='primary'>
              <Option value="전체">전체</Option>
              <Option value="양현식">양현식</Option>
              <Option value="최대림">최대림</Option>
              <Option value="이준">이준</Option>
              <Option value="배영주">배영주</Option>
            </Select>
          </div>
          <DateRangePicker label="기간" onDateChange={dateChangeHandler} />
        </div>

        <ul className={styles.list}>{components}</ul>
      </div>
    </>
  );
};

interface DataBoxProps {
  label: string;
  text: any;
  isFlexColumn?: boolean;
}

function DataBox(props: DataBoxProps) {
  return (
    <div
      className={classNames(
        styles.data_box,
        props.isFlexColumn ? styles.column : styles.row,
      )}
    >
      <div className={styles.label}>{props.label}</div>
      <div className={styles.text}> {props.text}</div>
    </div>
  );
}

export default AdminOrderPage;
