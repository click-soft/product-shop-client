import React from 'react';
import styles from './TrackingItem.module.scss';
import { TbTruckDelivery } from 'react-icons/tb';
import { TrackingProgress } from '../../interfaces/tracking';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GiPresent } from 'react-icons/gi';

interface TrackingItemProps {
  progress: TrackingProgress;
  highlight?: boolean;
}

const TrackingItem: React.FC<TrackingItemProps> = ({ progress, highlight }) => {
  const time = dayjs(progress.time).format('YYYY-MM-DD HH:mm:ss');
  return (
    <li className={classNames(styles.li, highlight && styles.highlight)}>
      {progress.status.id === 'delivered' ? (
        <GiPresent className={styles.icon} />
      ) : (
        <TbTruckDelivery className={styles.icon} />
      )}
      <div className={styles.description_wrapper}>
        <div className={styles.time}>{time}</div>
        <div className={styles.location}>{progress.location.name}</div>
        <div className={styles.description}>{progress.description}</div>
      </div>
    </li>
  );
};

export default TrackingItem;
