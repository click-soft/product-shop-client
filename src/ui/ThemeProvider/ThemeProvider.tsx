import React, { useEffect } from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import useThemeStore from '../../store/themeStore';
import { environment } from '../../config';

const ThemeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { mode, setMode } = useThemeStore();

  useEffect(() => {
    setMode(environment === 'test' ? 'dark' : 'light');
  }, []);
  
  useEffect(() => {
    document.documentElement.setAttribute('color-theme', mode);
    document.documentElement.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;
