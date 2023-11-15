import React, { CSSProperties } from 'react';
import styles from './Card.module.scss';
import { Accordion } from '@mui/material';

const Card: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  const combinedStyle: CSSProperties = {
    ...props.style,
  };

  return (
    <div
      style={combinedStyle}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={`${props.className} ${styles.card}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
