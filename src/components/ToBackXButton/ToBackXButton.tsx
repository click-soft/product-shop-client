import styles from './ToBackXButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const ToBackXButton = () => {
  const navigate = useNavigate();

  function toBackHandler(): void {
    navigate(-1);
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={toBackHandler} className={styles.button}>
        <AiOutlineClose className={styles.exit} />
      </button>
    </div>
  );
};

export default ToBackXButton;
