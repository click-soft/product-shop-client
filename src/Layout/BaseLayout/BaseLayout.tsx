import { ReactNode, useRef } from 'react';
import useResizeObserver from '../../hooks/use-resize-observer';
import styles from './BaseLayout.module.scss';
import { Outlet } from 'react-router-dom';

interface BaseLayoutProps {
  leftMenuComponent?: ReactNode;
  headerComponent?: ReactNode;
  footerComponent?: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  leftMenuComponent,
  headerComponent,
  footerComponent,
}) => {
  const headerRef = useRef<HTMLHRElement>(null);

  useResizeObserver(headerRef, {
    onHeightChange: (height) => {
      console.log(height);

      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`,
      );
    },
  });
 
  return (
    <div className={styles.wrapper}>
      {leftMenuComponent && (
        <div className={styles.wrapper_left}>{leftMenuComponent}</div>
      )}
      <div className={styles.wrapper_center}>
        {headerComponent && <header ref={headerRef}>{headerComponent}</header>}
        <main>
          <Outlet />
        </main>
        {footerComponent && <footer>{footerComponent}</footer>}
      </div>
    </div>
  );
};

export default BaseLayout;
