import styles from './MenuLink.module.scss';
import { useAppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';
import { menuObject } from '../../data/text-mapping';
import useResizeWindow from '../../hooks/use-resize-window';

interface MenuLinkProps {
  isDropdown: boolean;
}
const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const { isMobile } = useResizeWindow();
  const dispatch = useAppDispatch();
  const linkClickHandler = (key: string) => {
    scrollToTargetAdjusted(key);

    dispatch(modalActions.closeDownAll());
  };

  function scrollToTargetAdjusted(id: string) {
    var element = document.getElementById(id);
    if (!element) return;
    var headerOffset = 55 + (isMobile ? 0 : 50);
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

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

export default MenuLink;
