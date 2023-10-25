import classNames from 'classnames';
import React from 'react';
import styles from './AdminOrderItem.module.scss';
import Product from '../../../graphql/interfaces/product';
import { ymdToShortString } from '../../../utils/parse';
import { format } from 'date-fns';
import Em from '../../../graphql/interfaces/em';
import ChildrenProps from '../../../interfaces/ChildrenProps';
import InnerSelect from './Components/DeliverySelect/DeliverySelect';
import deliveryMethods from '../../../constants/deliveryMethods';

interface AdminOrderItemProps {
  product: Product;
  managers: Em[];
  onValueChange: (args: AdminOrderArgs) => void;
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = ({
  product,
  managers,
  onValueChange,
}) => {
  const createDateString = format(
    new Date(product.createDt),
    'yyyy-MM-dd HH:mm',
  );

  const managerObject = managers.reduce(
    (object: { [key: string]: string }, m: Em) => {
      object[m.code] = m.name;
      return object;
    },
    { '': '' },
  );

  return (
    <li className={styles.list_item}>
      <div className={styles.header}>
        <div className={styles.header_group}>
          <DataBox
            label="접수일시"
            text={
              <div>
                {createDateString}
                {product.web && <span className={styles.web_mark}>web</span>}
              </div>
            }
            isHeader={true}
          />
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
      <DataBox label="배송방법">
        <InnerSelect
          object={deliveryMethods}
          value={product.orderCheck}
          onChange={(value) => onValueChange({ type: '배송방법', value })}
        />
      </DataBox>
      <DataBox label="배송자">
        <InnerSelect
          object={managerObject}
          value={product.seller}
          onChange={(value) => onValueChange({ type: '배송자', value })}
        />
      </DataBox>
      <DataBox label="완료여부">
        <div
          className={product.sell === '1' ? styles.complete_text : styles.text}
        >
          {completeText(product.sell)}
        </div>
      </DataBox>
      <DataBox label="비고" text={product.bigo} />
    </li>
  );
};

function completeText(sell: string) {
  return sell === '1' ? '완료' : '접수';
}

interface DataBoxProps extends ChildrenProps {
  label: string;
  text?: any;
  isHeader?: boolean;
  children?: React.ReactNode;
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
      {props.text && <div className={styles.text}>{props.text}</div>}
      {props.children}
    </div>
  );
}

export type AdminOrderArgs = { type: '배송방법' | '배송자'; value: string };
export default AdminOrderItem;
