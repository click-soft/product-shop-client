import dayjs from 'dayjs';

export function getOrderId() {
  const currentDt = dayjs(new Date()).format('YYMMDDHHmmssSSS');
  const randInt = Math.floor(Math.random() * 10000);
  return `${currentDt}${randInt}`;
}
