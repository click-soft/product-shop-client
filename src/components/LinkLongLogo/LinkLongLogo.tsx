import styles from './LinkLongLogo.module.scss';
import logo from '../../assets/images/main_logo.png';
import darkLogo from '../../assets/images/main_logo_dark.png';
import useThemeStore from '../../store/theme.store';
import { Link } from 'react-router-dom';

const LinkLongLogo = () => {
  const { mode } = useThemeStore();
  const mainLogo = mode === 'dark' ? darkLogo : logo;

  return (
    <Link to={'/'}>
      <img className={styles.logo} src={mainLogo} />
    </Link>
  );
};

export default LinkLongLogo;
