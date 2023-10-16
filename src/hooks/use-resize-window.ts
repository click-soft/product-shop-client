import { useEffect, useState } from "react";

interface UseResizeWindowArgs {
  callback: ({ width, height }: { width: number, height: number }) => void;
  // 필요한 경우 다른 매개변수를 추가할 수 있음
  // 예: debounceDelay?: number;
  //      customCallback?: (event: Event) => void;
}

const useResizeWindow = (args?: UseResizeWindowArgs) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)
  useEffect(() => {
    function handleResize() {
      const wh = { width: window.innerWidth, height: window.innerHeight }

      setIsMobile(wh.width < 768)
      args?.callback(wh)
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    isMobile,
  }
}

export default useResizeWindow;