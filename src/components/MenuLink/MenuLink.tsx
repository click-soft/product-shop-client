import styles from './MenuLink.module.scss';
import { menuObject } from '../../data/text-mapping';
import useResizeWindow from '../../hooks/use-resize-window';
import useModalStore from '../../store/modal.store';

interface MenuLinkProps {
  isDropdown: boolean;
}
const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const { clear } = useModalStore();
  const { isMobile } = useResizeWindow();
  const linkClickHandler = (key: string) => {
    scrollToTargetAdjusted(key);

    clear();
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
