import React, { ReactNode, useEffect, useState } from 'react';
import styles from './AdminOrderPage.module.scss';
import DateRangePicker from '../../ui/DateRangePicker/DateRangePicker';
import { Button, Select } from '@mui/joy';
import Option from '@mui/joy/Option';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ADMIN_PRODUCTS } from '../../graphql/queries/product';
import { format, parse } from 'date-fns';
import CircleLoading from '../../components/Loading/CircleLoading';
import Product from '../../graphql/interfaces/product';
import AdminOrderItem from '../../components/Admin/AdminOrderItem/AdminOrderItem';
import { GET_MANAGERS } from '../../graphql/queries/em';
import Em from '../../graphql/interfaces/em';

const AdminOrderPage = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [manager, setManager] = useState('');
  const { data: managerData } = useQuery(GET_MANAGERS);
  const [getAdminProducts, { data, error, loading }] =
    useLazyQuery(GET_ADMIN_PRODUCTS);
  function dateChangeHandler(startDate: Date, endDate: Date): void {
    setDateRange({ startDate, endDate });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const startYmd = format(dateRange.startDate, 'yyyyMMdd');
    const endYmd = format(dateRange.endDate, 'yyyyMMdd');
    const variables = {
      startYmd,
      endYmd,
      emCode: manager ? manager : undefined,
    };

    getAdminProducts({ variables: variables });
  }

  if (error) {
    throw new Error(error.message);
  }

  const products: Product[] = data?.getAdminProducts;
  const managers: Em[] = managerData?.getManagers;
  const components = products?.map((p) => {
    return <AdminOrderItem key={p.auto} product={p} />;
  });

  return (
    <>
      {loading && <CircleLoading />}
      <div className={styles.container}>
        <form className={styles.search_wrapper} onSubmit={submitHandler}>
          <div className={styles.select_wrapper}>
            담당자
            <Select
              className={styles.select}
              defaultValue=""
              color="primary"
              onChange={(e, value) => setManager(value!)}
            >
              <Option value="">전체</Option>
              {managers?.map((m) => (
                <Option key={m.code} value={m.code}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </div>
          <DateRangePicker label="기간" onDateChange={dateChangeHandler} />
          <Button className={styles.submit_button} type="submit">조회</Button>
        </form>

        <ul className={styles.list}>{components}</ul>
      </div>
    </>
  );
};

export default AdminOrderPage;
