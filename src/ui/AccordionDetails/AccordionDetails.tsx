import React from 'react';
import styles from './AccordionDetails.module.scss';
import ChildrenProps from '../../interfaces/children-props';
import classNames from 'classnames';

const firstLoad = true;
interface Props extends ChildrenProps {
  open?: boolean;
}

const AccordionDetails: React.FC<Props> = (props) => {
  const openClassName = props.open ? styles.open : styles.close;
  return <div className={classNames(styles.wrapper, openClassName)}>{props.children}</div>;
};

export default AccordionDetails;
