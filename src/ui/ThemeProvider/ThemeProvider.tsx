import React, { useEffect } from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import useThemeStore from '../../store/themeStore';

const ThemeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { mode } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('color-theme', mode);
    document.documentElement.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;
