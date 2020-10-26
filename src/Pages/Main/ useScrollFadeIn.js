import { useRef, useEffect, useState, useCallback } from "react";

export const useScrollFadeIn = (translateY = 0, delay = 0, duration = 1) => {
  const dom = useRef();
  const [currentOpacity, setCurrentOpacity] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        setCurrentOpacity(1);
        setCurrentTranslate({ x: 0, y: 0 });
      } else {
        setCurrentOpacity(0);
        setCurrentTranslate({ x: 6, y: translateY + 10 });
      }
    },
    [translateY]
  );

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    opacity: currentOpacity,
    transform: `translate3d(0, ${currentTranslate.y}%, 0)`,
    commentTransform: `translate3d(${currentTranslate.x}%, 0%, 0)`,
    delay: delay,
    duration: duration,
  };
};
