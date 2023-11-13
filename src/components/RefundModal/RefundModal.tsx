import React, { useRef } from 'react';
import Modal from '../../ui/Modal/Modal';
import styles from './RefundModal.module.scss';
import bankData from '../../data/bank-data';

interface RefundModalProps {
  onClose: () => void;
  onRefund: (refund: RefundType) => void;
}

const RefundModal: React.FC<RefundModalProps> = (props) => {
  const bankRef = useRef<HTMLSelectElement | null>(null);
  const accountNumberRef = useRef<HTMLInputElement | null>(null);
  const holderNameRef = useRef<HTMLInputElement | null>(null);
  const bankKeys = Object.keys(bankData);

  const bankOptionsComponents = bankKeys.map((key) => (
    <option key={key} value={key}>
      {bankData[key]}
    </option>
  ));
  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    props.onRefund({
      bank: bankRef.current?.value!,
      accountNumber: accountNumberRef.current?.value!,
      holderName: holderNameRef.current?.value!,
    });
  }

  return (
    <Modal className={styles.container} onBackdropClick={props.onClose}>
      <div className={styles.title}>환불할 은행정보를 입력하세요.</div>
      <form onSubmit={submitHandler}>
        <section className={styles.data_section}>
          <label htmlFor="bank_select" className={styles.label}>
            은행
          </label>
          <select ref={bankRef} className={styles.input} id="bank_select">
            {bankOptionsComponents}
          </select>
        </section>
        <section className={styles.data_section}>
          <label htmlFor="accnum_input" className={styles.label}>
            계좌번호
          </label>
          <input
            ref={accountNumberRef}
            className={styles.input}
            id="accnum_input"
            type="text"
            placeholder="`-` 없이 작성"
          />
        </section>
        <section className={styles.data_section}>
          <label htmlFor="holder_input" className={styles.label}>
            예금주
          </label>
          <input ref={holderNameRef} className={styles.input} id="holder_input" type="text" />
        </section>

        <div className={styles.info}>영입일 기준 총 2일이 소요됩니다.</div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.refund_button}>
            환불
          </button>
          <button type="button" className={styles.cancel_button} onClick={props.onClose}>
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export type RefundType = { bank: string; accountNumber: string; holderName: string };
export default RefundModal;
