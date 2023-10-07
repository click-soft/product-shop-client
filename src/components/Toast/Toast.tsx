import React, { useEffect, useState } from 'react';
import styles from './Toast.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { BiCheckCircle, BiError, BiSolidMessageAltError } from 'react-icons/bi';
import { MdReportGmailerrorred } from 'react-icons/md';

interface ToastProps {
  message: string | undefined;
  type: ToastType;
  onClosed: () => void;
}

const icons = {
  ok: BiCheckCircle,
  warning: BiError,
  info: BiSolidMessageAltError,
  error: MdReportGmailerrorred,
};

const iconStyles = {
  ok: styles.ok,
  warning: styles.warning,
  info: styles.info,
  error: styles.error,
};

const Toast: React.FC<ToastProps> = (props) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (message !== undefined) {
      setMessage(undefined);
    }

    const timeout = setTimeout(() => {
      setMessage(props.message);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.message]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (message) {
      timeout = setTimeout(() => {
        setMessage('');
      }, 5000);
    } else if (message === '') {
      timeout = setTimeout(() => {
        setMessage(undefined);
        props.onClosed();
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  if (message === undefined) {
    return <></>;
  }

  function closeHandler() {
    setMessage('');
  }

  const IconComponent = icons[props.type];
  const iconStyle = iconStyles[props.type];

  return (
    <div
      className={`${styles.toast} ${iconStyle} ${
        message === '' ? styles.hide : styles.show
      }`}
    >
      <div className={styles.message_wrapper}>
        <IconComponent className={styles.icon} />
        <div className={styles.message}>{message}</div>
      </div>
      <AiOutlineClose
        className={`${styles.icon} ${styles.close}`}
        onClick={closeHandler}
      />
    </div>
  );
};

export type ToastType = 'ok' | 'info' | 'error' | 'warning';
export default Toast;
