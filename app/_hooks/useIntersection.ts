"use client";
import { useEffect, useState } from "react";

interface IntersectionObserverProps {
  element: React.RefObject<HTMLElement | null>;
  rootMargin: string;
}

export const useIntersection = ({
  element,
  rootMargin,
}: IntersectionObserverProps) => {
  const [isVisible, setState] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  useEffect(() => {
    const current = element?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );
    setObserver(observer);
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [element, rootMargin]);

  return {
    isVisible,
    observer,
  };
};
