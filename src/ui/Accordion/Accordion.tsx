import React, { useState } from 'react';
import styles from './Accordion.module.scss';
import ChildrenProps from '../../interfaces/children-props';
import AccordionSummary from '../AccordionSummary/AccordionSummary';
import AccordionDetails from '../AccordionDetails/AccordionDetails';
import classNames from 'classnames';

export interface AccordionProps extends ChildrenProps {
  title: string;
  description: string;
  rounded?: 'all' | 'only-top' | 'only-bottom';
  separator?: boolean;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [open, setOpen] = useState<boolean>();
  const { title, description } = props;
  const classes = getClassNames(props.rounded, props.separator);
  function handleSummary() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div className={classNames(styles.accordion, classes)}>
      <AccordionSummary open={open} title={title} description={description} onClick={handleSummary} />
      <AccordionDetails open={open}>{props.children}</AccordionDetails>
    </div>
  );
};

const getClassNames = (rounded?: string, separator?: boolean) => {
  const classNames = [];
  if (rounded === 'only-top') {
    classNames.push(styles.rounded_top);
  }
  if (rounded === 'only-bottom') {
    classNames.push(styles.rounded_bottom);
  }

  if (separator) {
    classNames.push(styles.separator);
  }
  return classNames;
};

export default Accordion;
