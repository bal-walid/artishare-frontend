"use client";
import React, { useEffect, useRef } from "react";
import { useIntersection } from "@/app/_hooks/useIntersection";

interface SubSectionProps {
  children: React.ReactNode;
  animationType?:
    | "top-to-bottom"
    | "left-to-right"
    | "none"
    | "stay"
    | "right-to-left";
  observeOnce?: boolean;
  className?: string;
}

const SubSection = ({
  children,
  animationType = "top-to-bottom",
  observeOnce = false,
  className,
}: SubSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible, observer } = useIntersection({
    element: ref,
    rootMargin: "10px",
  });

  const getAnimationStyles = () => {
    switch (animationType) {
      case "top-to-bottom":
        return {
          transform: isVisible ? "translateY(0)" : "translateY(-100px)",
          opacity: isVisible ? 1 : 0,
        };
      case "left-to-right":
        return {
          transform: isVisible ? "translateX(0)" : "translateX(-100px)",
          opacity: isVisible ? 1 : 0,
        };
      case "stay":
        return {
          transform: "none",
          opacity: isVisible ? 1 : 0,
        };
      case "right-to-left":
        return {
          transform: isVisible ? "translateX(0)" : "translateX(100px)",
          opacity: isVisible ? 1 : 0,
        };
      case "none":
      default:
        return {};
    }
  };
  useEffect(() => {
    if (observeOnce && isVisible) {
      observer?.unobserve(ref.current!);
    }
  }, [isVisible, observeOnce, observer]);
  return (
    <div
      ref={ref}
      style={{
        ...getAnimationStyles(),
        transition:
          animationType !== "none"
            ? "transform 1s ease-out, opacity 1s ease-out"
            : "none",
        overflow: "hidden",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default SubSection;
