import { useEffect } from 'react';
import useModalStore from '../store/modal.store';

const useClearModal = () => {
  const { clear } = useModalStore();

  useEffect(() => {
    return clear;
  }, []);
};

export default useClearModal;
