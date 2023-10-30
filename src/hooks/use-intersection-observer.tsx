import { useCallback, useEffect, useRef } from 'react';

interface IntersectionObserverArgs {
  hasNextPage: boolean;
  isFetching: boolean;
  onIntersecting?: () => void;
}

const useIntersectionObserver = (args: IntersectionObserverArgs) => {
  const observerRef = useRef(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        args.onIntersecting?.();
      }
    },
    []
  );

  useEffect(() => {
    if (!args.hasNextPage || args.isFetching) {
      return;
    }

    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px',
      threshold: 0.1,
    });
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver, args.hasNextPage, args.isFetching]);

  const observerComponent = <div ref={observerRef} style={{ height: '1px' }}></div>;

  return {
    observerComponent,
  };
};

export default useIntersectionObserver;
