import React from 'react';
import styles from './AccordionSummary.module.scss';
import ChildrenProps from '../../interfaces/children-props';
import { BiChevronDown } from 'react-icons/bi';
import classNames from 'classnames';

interface Props extends ChildrenProps {
  title: string;
  description: string;
  open?: boolean;
  onClick: () => void;
}

const AccordionSummary: React.FC<Props> = (props) => {
  const { title, description } = props;

  return (
    <div className={styles.accordion_summary} onClick={props.onClick}>
      <div className={styles.summary}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={classNames(styles.icon, props.open && styles.open)}>
        <BiChevronDown style={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
};

export default AccordionSummary;
