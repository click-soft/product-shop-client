import classNames from 'classnames';
import React from 'react';
import styles from './AdminOrderItem.module.scss';
import Product from '../../../graphql/interfaces/product';
import { ymdToShortString } from '../../../utils/parse';
import { format } from 'date-fns';

interface AdminOrderItemProps {
  product: Product;
}
const AdminOrderItem: React.FC<AdminOrderItemProps> = ({ product }) => {
  const createDateString = format(
    new Date(product.createDt),
    'yyyy-MM-dd HH:mm',
  );

  return (
    <li className={styles.list_item}>
      <div className={styles.header}>
        <div className={styles.header_group}>
          <DataBox label="접수일시" text={createDateString} isHeader={true} />
          <DataBox label="담당자" text={product.cs?.em.name!} isHeader={true} />
        </div>
      </div>
      <DataBox label="거래처코드" text={product.csCode} />
      <DataBox label="거래처" text={product.cs?.myung!} />
      <DataBox label="상품코드" text={product.clCode} />
      <DataBox label="상품명칭" text={product.productListSub?.smMyung} />
      <DataBox label="수량" text={product.count} />
      <DataBox
        label="단가"
        text={product.productListSub?.danga!.toLocaleString()}
      />
      <DataBox
        label="금액"
        text={(product.productListSub?.danga! * product.count).toLocaleString()}
      />
      <DataBox label="발주일" text={ymdToShortString(product.sellYmd)} />
      <DataBox label="발주여부" text={product.etc1} /> 
    </li>
  );
};

interface DataBoxProps {
  label: string;
  text: any;
  isHeader?: boolean;
}

function DataBox(props: DataBoxProps) {
  return (
    <div
      className={classNames(
        styles.data_box,
        props.isHeader ? styles.grid_header : styles.row,
      )}
    >
      <div className={styles.label}>{props.label}</div>
      <div className={styles.text}> {props.text}</div>
    </div>
  );
}

export default AdminOrderItem;
