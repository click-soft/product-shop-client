import styles from './SettingsTitle.module.scss';

const SettingsTitle = () => {
  return (
    <div>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles.description}>비밀번호 변경 등 계정정보 관리화면</div>
      <div className={styles.sep} />
    </div>
  );
};

export default SettingsTitle;
