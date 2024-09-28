import { RefObject, useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (
  elemRef: RefObject<HTMLElement>,
  options: IntersectionObserverInit,
) => {
  const observerRef = useRef<IntersectionObserver>(); 
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elemRef.current;
    if (!node) return;

    observerRef.current = new IntersectionObserver(setEntries, options);
    observerRef.current.observe(node); 

    return () => observerRef.current?.disconnect();
  }, [elemRef, options]);

  return {
    entries, 
    observerRef,
  };
};

export default useIntersectionObserver;
