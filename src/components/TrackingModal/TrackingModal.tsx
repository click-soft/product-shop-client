import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './TrackingModal.module.scss';
import { Box, CircularProgress, Fade, Modal } from '@mui/material';
import ChildrenProps from '../../interfaces/ChildrenProps';
import useDeliveryTracking, { TrackingType } from '../../hooks/use-delivery-tracking';
import { TrackingResult } from '../../interfaces/tracking';
import dayjs from 'dayjs';
import TrackingItem from '../TrackingItem/TrackingItem';
import classNames from 'classnames';
import { AxiosError } from 'axios';

interface TrackingModalProps extends ChildrenProps {
  open: boolean;
  onClose: () => void;
  tracking?: TrackingType;
}
const TrackingModal: React.FC<TrackingModalProps> = (props) => {
  const { fetchTracking } = useDeliveryTracking();
  const [trackingResult, setTrackingResult] = useState<TrackingResult>();
  const { isFetching, error } = useQuery(
    ['fetchTracking', props.tracking, props.open],
    ({ queryKey }) => {
      if (!props.open) return;
      const [_, tracking] = queryKey;
      return fetchTracking(tracking as TrackingType);
    },
    {
      onSuccess: (data) => {
        data?.progresses?.sort((a, b) => {
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        });
        setTrackingResult(data);
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 60000,
    }
  );

  if (!props.open) {
    return <></>;
  }

  function getErrorMessage() {
    if (error instanceof AxiosError) {
      return error.response?.data?.message;
    }
    if (trackingResult?.message) {
      return trackingResult?.message;
    }
    return;
  }

  function getComponent() {
    if (isFetching) {
      return <CircularProgress />;
    } else {
      const errorMessage = getErrorMessage();
      if (errorMessage) {
        return <ErrorSection errorMessage={errorMessage} />;
      } else {
        return <DeliveryMain trackingNumber={props.tracking?.trackingNumber} trackingResult={trackingResult} />;
      }
    }
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Fade in={props.open} style={{ outline: 'none' }}>
        <Box className={classNames(styles.box, isFetching && styles.fetching)}>{getComponent()}</Box>
      </Fade>
    </Modal>
  );
};

interface DeliveryProps {
  trackingResult?: TrackingResult;
  trackingNumber?: string;
}

const DeliveryMain: React.FC<DeliveryProps> = ({ trackingNumber, trackingResult }) => {
  const trackingItems = trackingResult?.progresses?.map((p, i) => (
    <TrackingItem key={Math.random()} progress={p} highlight={i === 0} />
  ));

  return (
    <div className={styles.wrapper}>
      <HeaderSection trackingNumber={trackingNumber} trackingResult={trackingResult} />
      <section className={styles.info_section}>
        <div className={styles.title}>배송정보</div>
        {trackingItems && <ul className={styles.tracking_ul}>{trackingItems}</ul>}
      </section>
    </div>
  );
};

const HeaderSection: React.FC<DeliveryProps> = ({ trackingNumber, trackingResult }) => {
  const fromDteString = dayjs(trackingResult?.from?.time).format('YYYY-MM-DD HH:mm');
  return (
    <section className={styles.header_section}>
      <h2 className={styles.header_title}>Delivery Tracking</h2>
      <div className={styles.title}>등록일 : {fromDteString}</div>
      <table>
        <tbody>
          <tr>
            <th>운송장번호</th>
            <td>{`${trackingResult?.carrier?.name} / ${trackingNumber}`}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>{trackingResult?.state?.text}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const ErrorSection: React.FC<{ errorMessage?: string }> = ({ errorMessage }) => (
  <div className={styles.error_wrapper}>
    <h2>운송장 번호 조회 실패</h2>
    <div className={styles.errorMessage}>{errorMessage}</div>
    <ul>
      <li>아직 배송 준비단계 중 일 수 있습니다.</li>
      <li>입력한 운송장번호가 유효하지 않을 수 있습니다.</li>
    </ul>
  </div>
);

export default TrackingModal;
