
export default interface GetAdminPaymentsArgs {
  jisa: string;
  startDate: Date;
  endDate: Date;
  emCode?: string;
  customerName?: string;
  orderId?: string;
  page?: number;
}