"use client";
import { useEffect, useRef, useState } from "react";

export default function useHover(): [React.MutableRefObject<any>, boolean] {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return [ref, isHovering];
}
