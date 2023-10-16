import React, { useEffect } from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ErrorState, errorActions } from '../../store/error-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const TokenExpiredHookPage: React.FC<ChildrenProps> = ({ children }) => {
  const error = useSelector<RootState, ErrorState>((state) => state.error);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.code === 'ACCOUNT_EXPIRED') {
      navigate('/error?mode=ACCOUNT_EXPIRED');
      dispatch(errorActions.clearError());
    }
  }, [error.code, error.error]);

  return <>{children}</>;
};

export default TokenExpiredHookPage;
