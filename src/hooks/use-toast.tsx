import { useState } from 'react';
import Toast, { ToastType } from '../components/Toast/Toast';
import ReactDOM from 'react-dom';

const useToast = () => {
  const [toastType, setToastType] = useState<ToastType>('info');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const toastRoot = document.getElementById('toast-root') as HTMLElement;
  const toastComponet = ReactDOM.createPortal(
    <Toast type={toastType} message={message} onClosed={closedHandler} />,
    toastRoot,
  );

  function showToast(type: ToastType, message: string) {
    setToastType(type);
    setMessage(message);
  }

  function closedHandler(): void {
    setMessage(undefined);
  }

  return { toastComponet, showToast };
};

export default useToast;
