import { useEffect, useRef, useState } from 'react';

interface UseResizeObserverArgs {
  onHeightChange?: (height: number) => void;
  onWidthChange?: (width: Number) => void;
}

const useResizeObserver = (ref: React.RefObject<HTMLElement>, args?: UseResizeObserverArgs) => {
  const [entry, setEntry] = useState<ResizeObserverEntry>();

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setEntry(entry);
        }
      });

      resizeObserver.observe(ref.current);
      return () => {
        if (ref.current) {
          resizeObserver.unobserve(ref.current!);
        }
        resizeObserver.disconnect();
      };
    }
  }, [ref.current]);

  useEffect(() => {
    if (entry) {
      args?.onHeightChange?.(entry?.contentRect.height);
    }
  }, [entry?.contentRect.height]);

  useEffect(() => {
    if (entry) {
      args?.onWidthChange?.(entry?.contentRect.width);
    }
  }, [entry?.contentRect.width]);
};

export default useResizeObserver;
