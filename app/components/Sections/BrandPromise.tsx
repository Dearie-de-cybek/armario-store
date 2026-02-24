"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandPromise() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const elements = textRef.current?.children;
      
      if (elements) {
        gsap.fromTo(elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[var(--color-background)] py-32 md:py-48 px-6 md:px-12 flex justify-center text-center border-t border-[var(--color-foreground)]/10"
    >
      <div ref={textRef} className="max-w-4xl flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl uppercase tracking-widest leading-tight mb-8">
          Precision <br/> Over Volume.
        </h2>
        
        <p className="font-sans text-sm md:text-base leading-relaxed opacity-80 max-w-2xl mb-16">
          Curated by Anyaduba Charles Emeka, Armario is built on the belief that how a man dresses dictates how he moves through the world. Uncompromising fabrics. Exacting fits. We don't chase trends; we build wardrobes.
        </p>

        {/* Policy Badges */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center font-sans text-[10px] uppercase tracking-[0.2em] font-medium border-y border-[var(--color-foreground)]/20 py-6 w-full">
          <span>Worldwide Shipping</span>
          <span className="hidden md:block w-1 h-1 bg-[var(--color-foreground)] rounded-full"></span>
          <span>No Refunds. Exchange Only.</span>
          <span className="hidden md:block w-1 h-1 bg-[var(--color-foreground)] rounded-full"></span>
          <span>Walk-In Store</span>
        </div>
      </div>
    </section>
  );
}