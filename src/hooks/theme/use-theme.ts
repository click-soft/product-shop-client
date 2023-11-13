import useThemeStore from '../../store/theme.store';

type Styles = {
  [key: string]: string;
};

const useTheme = (styles: Styles) => {
  const { mode } = useThemeStore();

  const themeStyles = mode === 'dark' ? styles.dark : undefined;

  return {
    themeStyles,
  };
};

export default useTheme;
