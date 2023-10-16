import React, { CSSProperties } from 'react';
import styles from './styles/Card.module.scss';

const Card: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const defaultStyle: CSSProperties = {
    backgroundColor: 'white',
  };
  const combinedStyle: CSSProperties = {
    ...defaultStyle,
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
