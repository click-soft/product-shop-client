import styles from './SettingsHeader.module.scss';
import LinkLongLogo from '../../../components/LinkLongLogo/LinkLongLogo';
import MenuButton from './MenuButton/MenuButton';
import MobileBackButton from '../../../ui/MobileBackButton/MobileBackButton';

const SettingsHeader = () => {
  return (
    <div className={styles.container}>
      <div>
        <MobileBackButton />
      </div>

      <div className={styles.center}>
        <LinkLongLogo />
      </div>
      <div>
        <MenuButton />
      </div>
    </div>
  );
};

export default SettingsHeader;
