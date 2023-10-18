import { useEffect, useState } from "react";

const useResizeWindow = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    function handleResize() {
      const wh = { width: window.innerWidth, height: window.innerHeight }

      setSize({ ...wh })
      setIsMobile(wh.width < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    isMobile,
    size,
  }
}

export default useResizeWindow;