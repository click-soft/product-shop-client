import styles from './MenuLink.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';
import { menuObject } from '../../shared/text-mapping';
import useResizeWindow from '../../hooks/use-resize-window';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface MenuLinkProps {
  isDropdown: boolean;
}
const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const linkClickHandler = (key: string) => {
    scrollToTargetAdjusted(key);

    dispatch(modalActions.closeDownAll());
  };

  const { isMobile } = useResizeWindow();
  if ((!props.isDropdown && isMobile) || window.location.pathname !== '/') {
    return <></>;
  }

  const linkComponents = Object.keys(menuObject).map((key) => {
    const value = menuObject[key];

    return (
      <li className={styles.li} key={key}>
        <button onClick={() => linkClickHandler(key)}>{value}</button>
      </li>
    );
  });

  return (
    <nav>
      <ul className={styles.ul}>{linkComponents}</ul>
    </nav>
  );
};

function scrollToTargetAdjusted(id: string) {
  var element = document.getElementById(id);
  if (!element) return;
  var headerOffset = 55;
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

export default MenuLink;
