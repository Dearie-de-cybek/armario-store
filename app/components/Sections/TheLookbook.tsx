"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lookbookImages = [
  "images/look.jpg",
  "images/look1.jpg",
  "images/look2.jpg",
  "images/look3.jpg",
  "images/a1.jpg",
];

export default function TheLookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Calculate how far to move horizontally
      const scrollWidth = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Pins the section in place
          scrub: 1, // Smooth scrubbing effect
          end: () => `+=${scrollWidth}`, // Determines how long the pin lasts based on content width
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="lookbook"
      className="relative w-full h-screen bg-[var(--color-background)] overflow-hidden flex items-center"
    >
      {/* Floating Section Title */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 mix-blend-difference text-[var(--color-background)]">
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest">
          Movement & Structure
        </h2>
        <p className="font-sans text-xs uppercase tracking-[0.2em] opacity-80 mt-2">
          Campaign 01
        </p>
      </div>

      {/* The Horizontally Scrolling Filmstrip */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-8 md:gap-16 px-6 md:px-24 h-[60vh] md:h-[70vh] items-center will-change-transform"
      >
        {lookbookImages.map((img, index) => (
          <div 
            key={index} 
            className="relative flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw] h-full overflow-hidden group"
          >
            <img 
              src={img} 
              alt={`Lookbook image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
            {/* Minimal Shop The Look CTA on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
              <span className="text-[var(--color-background)] font-sans text-xs uppercase tracking-[0.2em] border-b border-[var(--color-background)] pb-1">
                Shop The Look
              </span>
            </div>
          </div>
        ))}
        {/* End Spacer */}
        <div className="flex-shrink-0 w-[10vw]"></div>
      </div>
    </section>
  );
}