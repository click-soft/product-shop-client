import AdminSearchForm, { FormValues } from '../AdminSearchForm/AdminSearchForm';
import { isNuemric } from '../../../utils/strings';
import useAdminWebOrdersStore from '../../../store/admin-web-orders.store';
import useGetLoginedUser from '../../../hooks/use-get-logined-user';
import dayjs from 'dayjs';
import { GET_AMDIN_PAYMENTS_KEY } from '../../../hooks/adminWebOrders/use-admin-web-orders-infinite-query';
import { useQueryClient } from '@tanstack/react-query';

const AdminWebOrdersForm = () => {
  const queryClient = useQueryClient();
  const { setVariables } = useAdminWebOrdersStore();
  const user = useGetLoginedUser();

  function submitHandler(value: FormValues): void {
    const emCode = value.manager;
    let customerName: string | undefined;
    let orderId: string | undefined;

    if (isNuemric(value.text)) {
      orderId = value.text;
    } else {
      customerName = value.text;
    }

    setVariables({
      jisa: user?.jisa ?? '',
      startDate: dayjs(value.startDate).startOf('day').toDate(),
      endDate: dayjs(value.endDate).endOf('day').toDate(),
      emCode,
      customerName,
      orderId,
    });
    queryClient.invalidateQueries({ queryKey: [GET_AMDIN_PAYMENTS_KEY] });
  }

  return <AdminSearchForm textLabel="거래처명 or 주문번호" onSubmit={submitHandler} />;
};

export default AdminWebOrdersForm;
