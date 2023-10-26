import React, { useRef } from 'react';
import styles from './TextBox.module.scss';
import { IconType } from 'react-icons';
import classNames from 'classnames';

type Type = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface TextBoxProps extends Type {
  icon?: IconType;
  iconSize?: {
    width?: string;
    height?: string;
  };
  className?: string;
}
const TextBox: React.FC<TextBoxProps> = (props) => {
  const { icon: Icon, iconSize, className, ...inputProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={classNames(styles.wrapper, className)}>
      {Icon && (
        <div
          className={styles.icon_wrapper}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Icon
            className={styles.icon}
            style={{
              width: iconSize?.width,
              height: iconSize?.height,
            }}
          />
        </div>
      )}
      <input ref={inputRef} {...inputProps} />
    </div>
  );
};

export default TextBox;
