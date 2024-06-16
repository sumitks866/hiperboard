import { useEffect, useRef, useState } from "react";

export default function useScrollPosition<T extends HTMLElement>(
  ref: React.RefObject<T>
): { atTop: boolean; atBottom: boolean; scrollTop: number } {
  const [scrollPosition, setScrollPosition] = useState({
    atTop: true,
    atBottom: false,
    scrollTop: 0,
  });

  // [].reduce((),)

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;

      if (element) {
        const isAtTop = element.scrollTop === 0;
        const isAtBottom =
          element.scrollHeight - element.scrollTop - element.clientHeight <= 1;

        setScrollPosition({
          atTop: isAtTop,
          atBottom: isAtBottom,
          scrollTop: element.scrollTop,
        });
      }
    };

    const element = ref.current;

    if (element) {
      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref]);

  return scrollPosition;
}
