import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './DropDown.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import useResizeWindow from '../../hooks/use-resize-window';
import classNames from 'classnames';
import useScrollWindow from '../../hooks/use-scroll-window';
import useResizeObserver from '../../hooks/use-resize-observer';

type Position = {
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
};

interface Props extends ChildrenProps {
  targetElement: HTMLElement | null;
  onOutsideClick: () => void;
}

const DropDown: React.FC<Props> = ({ children, targetElement, onOutsideClick }) => {
  const { size } = useResizeWindow();
  const { scroll } = useScrollWindow();
  const [position, setPosition] = useState<Position>({ left: -1000, top: -1000 });
  const classes = classNames(targetElement && styles.open);
  const ref = useRef<HTMLDivElement>(null);
  const { entry } = useResizeObserver(ref);

  useEffect(() => {
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    let left: number = rect.left;
    let top = rect.top + rect.height;

    const dropdownElementWidth = ref.current?.clientWidth ?? 0;
    const dropdownElementHeight = ref.current?.clientHeight ?? 0;

    const right: number = left + dropdownElementWidth;
    const bottom: number = top + dropdownElementHeight;

    const maxRight = document.documentElement.clientWidth;
    const maxBottom = document.documentElement.clientHeight;

    if (right > maxRight) {
      left = rect.right - dropdownElementWidth;
    }
    if (bottom > maxBottom) {
      top = rect.top - dropdownElementHeight;
    }
    setPosition({ left, top, right });
  }, [targetElement, size, scroll, entry]);

  useEffect(() => {
    const openedTime = new Date().getTime();
    const handleOutsideClick = (event: any) => {
      if (targetElement && event.target?.closest('#userDropDownComponent')) {
        return console.log('inner clicked');
      }

      const timeDifference = new Date().getTime() - openedTime;
      if (timeDifference > 200 && targetElement) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [targetElement]);

  return (
    <div
      id="userDropDownComponent"
      ref={ref}
      className={classNames(styles.wrapper, classes)}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
      }}
    >
      {children}
    </div>
  );
};

export default DropDown;
