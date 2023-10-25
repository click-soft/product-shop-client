import { useCallback, useEffect } from "react";

interface IntersectionObserverArgs {
  hasNextPage: boolean;
  onIntersecting?: () => void;
}

const useIntersectionObserver = (ref: React.MutableRefObject<null>, args: IntersectionObserverArgs) => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        args.onIntersecting?.();
      }
    },
    [],
  );

  useEffect(() => {
    if (!args.hasNextPage) {
      return;
    }
    
    const element = ref.current;
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px',
      threshold: 1,
    });
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver, args.hasNextPage]);

}

export default useIntersectionObserver;