"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05, // Lower number = heavier, smoother feel (luxury pacing)
        duration: 1.5, // How long the scroll animation takes
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}