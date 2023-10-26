import React from 'react';
import styles from './IconNavLink.module.scss';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import ChildrenProps from '../../interfaces/ChildrenProps';
import classNames from 'classnames';

interface IconNavLinkProps extends ChildrenProps {
  icon: IconType;
  text?: string;
  to: string;
  onClick?: () => void;
}

const IconNavLink: React.FC<IconNavLinkProps> = (props) => {
  return (
    <NavLink
      to={props.to}
      onClick={props.onClick}
      className={({ isActive }) => {
        return classNames(styles.icon_wrapper, isActive ? styles.active : undefined, props.className);
      }}
    >
      <props.icon className={styles.icon} />
      <span className={styles.text}>{props.text}</span>
    </NavLink>
  );
};

export default IconNavLink;
