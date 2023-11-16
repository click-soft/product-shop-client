import AdminSearchForm, { FormValues } from '../AdminSearchForm/AdminSearchForm';
import dayjs from 'dayjs';
import { ADMIN_QUERY_KEY } from '../../../hooks/adminOrder/use-admin-order-infinite-query';
import { useQueryClient } from 'react-query';
import useAdminOrderStore from '../../../store/admin-order.store';

const AdminOrderForm = () => {
  const { setVariables } = useAdminOrderStore();
  const queryClient = useQueryClient();

  function submitHandler(formValues: FormValues): void {
    const startYmd = dayjs(formValues.startDate).format('YYYYMMDD');
    const endYmd = dayjs(formValues.endDate).format('YYYYMMDD');

    setVariables({
      startYmd,
      endYmd,
      emCode: formValues.manager,
      csMyung: formValues.text,
      page: 1,
    });
    queryClient.invalidateQueries(ADMIN_QUERY_KEY);
  }

  return <AdminSearchForm textLabel="거래처 명칭" onSubmit={submitHandler} />;
};

export default AdminOrderForm;
