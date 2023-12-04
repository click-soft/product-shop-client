import styles from './MenuLink.module.scss';
import useResizeWindow from '../../hooks/use-resize-window';
import useModalStore from '../../store/modal.store';
import useWebBunryus from '@/hooks/use-web-bunryus';
export interface MenuLinkProps {
  isDropdown: boolean;
}

export const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const { webBunryus } = useWebBunryus();
  const { clear } = useModalStore();
  const { isMobile } = useResizeWindow();
  const linkClickHandler = (key: string) => {
    scrollToTargetAdjusted(key);

    clear();
  };

  function scrollToTargetAdjusted(id: string) {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 55 + (isMobile ? 0 : 50);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  if ((!props.isDropdown && isMobile) || window.location.pathname !== '/') {
    return <></>;
  }

  const linkComponents = webBunryus?.map((w) => {
    return (
      <li className={styles.li} key={w.code}>
        <button onClick={() => linkClickHandler(w.code)}>{w.name}</button>
      </li>
    );
  });
  // const linkComponents = Object.keys(menuObject).map((key) => {
  //   const value = menuObject[key];

  //   return (
  //     <li className={styles.li} key={key}>
  //       <button onClick={() => linkClickHandler(key)}>{value}</button>
  //     </li>
  //   );
  // });

  return (
    <nav>
      <ul className={styles.ul}>{linkComponents}</ul>
    </nav>
  );
};
