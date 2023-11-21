import styles from './SettingsProfilePage.module.scss';
import SettingsTitle from '../../components/Settings/SettingsTitle/SettingsTitle';
import SettingsBody from '../../components/Settings/SettingsBody/SettingsBody';

const SettingsProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SettingsTitle />
        <SettingsBody />
      </div>
    </div>
  );
};

export default SettingsProfilePage;
