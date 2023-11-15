import React from 'react';
import styles from './MenuLink.module.scss';
import { NavLink } from 'react-router-dom';
import IconWrapper from '../../../../ui/IconWrapper/IconWrapper';
import { IconType } from 'react-icons';
import ChildrenProps from '../../../../interfaces/children-props';
import classNames from 'classnames';

interface Props extends ChildrenProps {
  to: string;
  text: string;
  icon: IconType;
  onClick?: () => void;
}

const MenuLink: React.FC<Props> = ({ to, text, className, icon, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(styles.item, className, isActive ? styles.active : undefined)}
      onClick={onClick}
    >
      <IconWrapper className={styles.icon_wrapper} icon={icon} iconSize={20}>
        {text}
      </IconWrapper>
    </NavLink>
  );
};

export default MenuLink;
