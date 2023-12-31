"use client";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

const ScrollButton = ({
  onClick,
  children,
  disabled,
  disconnect,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  disconnect?: boolean;
}) => {
  let buttonRef = useRef(null);

  const handleIntersection = useCallback(
    (entries: any) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 1.0, // Trigger when the button is fully visible
    });

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    if (disconnect) {
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, disconnect]);

  return (
    <button ref={buttonRef} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ScrollButton;
