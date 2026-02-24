"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial States
      gsap.set(maskRef.current, { clipPath: "inset(100% 0% 0% 0%)" }); // Hidden at the bottom
      gsap.set(imageRef.current, { scale: 1.05 }); // Pre-scaled for the ultra-slow zoom out
      
      // Text elements initial state
      const textElements = contentRef.current?.children;
      if (textElements) {
        gsap.set(textElements, { y: 30, opacity: 0 });
      }

      // 2. The Reveal Sequence
      tl.to(maskRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "power3.inOut",
      })
      .to(imageRef.current, {
        scale: 1,
        duration: 12, // The 12-second luxury breathing effect
        ease: "none", // Linear movement feels like a slow camera dolly
      }, "-=1.6") // Start right as the mask starts revealing
      .to(textElements as HTMLCollection, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=11.0"); // Fade text in shortly after the image is revealed

    }, sectionRef);

    // 3. The 1-2px Cursor Hover Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 4; // Max 2px movement left/right
      const yPos = (clientY / window.innerHeight - 0.5) * 4; // Max 2px movement up/down

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5, // Slow, syrupy follow
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center overflow-hidden bg-[var(--color-background)]"
    >
      {/* Background Image with Mask Reveal */}
      <div 
        ref={maskRef} 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2000&auto=format&fit=crop" // Replace with actual Armario campaign shot
          alt="Armario Campaign - Lagos"
          className="object-cover w-full h-full object-center"
        />
        {/* Soft gradient shadow for text readability (Darker on the left where text sits) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/80 via-[#0B0B0C]/30 to-transparent"></div>
      </div>

      {/* Foreground Content (Left-aligned editorial layout) */}
      <div 
        ref={contentRef} 
        className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24 w-full max-w-7xl h-full mt-10"
      >
        <h1 className="text-[var(--color-background)] font-serif text-6xl md:text-8xl lg:text-[7rem] tracking-tight leading-[0.9] mb-6 max-w-3xl">
          Armario — <br/>
          Built for <br/>
          Men Who Know.
        </h1>
        
        <p className="text-[var(--color-background)]/80 font-sans text-xs md:text-sm tracking-[0.2em] uppercase max-w-md mb-12 leading-loose">
          Lagos craftsmanship. Worldwide delivery. <br/>
          Elevated menswear curated for presence.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-start mb-16">
          <button className="px-10 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] font-sans text-xs uppercase tracking-widest transition-transform duration-700 hover:scale-[1.02]">
            Shop New Arrivals
          </button>
          
          <button className="px-10 py-4 border border-[var(--color-background)]/30 text-[var(--color-background)] font-sans text-xs uppercase tracking-widest backdrop-blur-sm transition-all duration-700 hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)] hover:border-transparent">
            WhatsApp Order
          </button>
        </div>

        {/* Small signature line anchored at the bottom */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-24">
          <p className="text-[var(--color-background)]/50 font-sans text-[10px] italic tracking-widest">
            my broooo — step in right.
          </p>
        </div>
      </div>
    </section>
  );
}