import { useCallback, useEffect, useState } from 'react';

type ScrollType = {
  x: number;
  y: number;
};

const useScrollWindow = (callback?: ({ x, y }: ScrollType) => void) => {
  const [scroll, setScroll] = useState<ScrollType>();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = { x: window.scrollX, y: window.scrollY };
      setScroll(scroll);
      callback?.(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return { scroll };
};

export default useScrollWindow;
