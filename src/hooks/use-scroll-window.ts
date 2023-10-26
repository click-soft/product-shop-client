import { useCallback, useEffect, useState } from 'react';

const useScrollWindow = (callback: ({ x, y }: { x: number; y: number }) => void): void => {
  useEffect(() => {
    const handleScroll = () => {
      callback({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollWindow;
