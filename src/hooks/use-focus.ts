import { useLayoutEffect, useRef, useState } from 'react';

const useFocus = <T extends HTMLElement>(defaultFocused = false) => {
  const ref = useRef<T>(null);
  const [isFocused, setIsFocused] = useState(defaultFocused);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    if (isFocused) {
      ref.current.focus();
    }

    ref.current.addEventListener('focus', onFocus);
    ref.current.addEventListener('blur', onBlur);

    return () => {
      ref.current?.removeEventListener('focus', onFocus);
      ref.current?.removeEventListener('blur', onBlur);
    };
  }, [isFocused]);

  return { ref, isFocused, setIsFocused };
};

export default useFocus;
