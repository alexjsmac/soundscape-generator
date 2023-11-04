import { useState, useEffect } from "react";

const MOBILE_MAX_WIDTH = 767;

export const useScreen = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    ...size,
    isMobile: size.width <= MOBILE_MAX_WIDTH,
  };
};
