"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Initial States (Hidden & Shifted)
      // Vertical mask starting hidden at the bottom
      gsap.set(maskRef.current, { clipPath: "inset(100% 0% 0% 0%)" }); 
      gsap.set(imageRef.current, { scale: 1.05 });
      gsap.set([headlineRef.current, subtextRef.current, signatureRef.current], { y: 20, opacity: 0 });
      gsap.set(buttonsRef.current, { opacity: 0 }); // Buttons only fade, no Y movement

      // 2. The Cinematic Reveal Sequence
      // Image Mask Reveal
      gsap.to(maskRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power2.out",
      });

      // Ultra-slow Image Breathing (12 seconds)
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 12,
        ease: "power1.out",
      });

      // Headline (Fade + Up)
      gsap.to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
      });

      // Subtext (Fade + Up)
      gsap.to(subtextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
      });

      // Buttons (Soft Fade-in Only)
      gsap.to(buttonsRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power1.inOut", 
      });

      // Signature
      gsap.to(signatureRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 1.0,
        ease: "power2.out",
      });

      // 3. Very Subtle Scroll Parallax (5-8% movement)
      gsap.to(imageRef.current, {
        yPercent: 8, 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#141210]"
    >
      {/* Background Image Wrapper with Vertical Mask Reveal */}
      <div ref={maskRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/armario1.jpg"
          alt="Armario - Built for the Everyday Classic"
          /* Using h-[110%] and top-[-5%] gives the parallax room to move down without revealing the background.
             Added contrast-90 and sepia-[.15] to slightly flatten the blacks and warm the image, mimicking 35mm film stock.
          */
          className="absolute top-[-5%] left-0 w-full h-[110%] object-cover object-top contrast-90 sepia-[.15]" 
        />
        
        {/* The Exact Strict Dark/Warm Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(20,18,16,0.15), rgba(20,18,16,0.45))" }}
        ></div>
      </div>

      {/* Foreground Editorial Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mt-12">
        
        {/* Generous spacing, lighter font weight, pure #F2EEE8 */}
        <h1 
          ref={headlineRef}
          className="text-[#F2EEE8] font-serif font-normal text-4xl md:text-6xl lg:text-[5rem] tracking-wide leading-[1.1] mb-10"
        >
          Built for the <br className="hidden md:block" /> Everyday Classic.
        </h1>
        
        <p 
          ref={subtextRef}
          className="text-[#F2EEE8]/80 font-sans font-light text-sm md:text-base tracking-[0.2em] uppercase mb-14 leading-relaxed"
        >
          Modern menswear shaped by timeless taste.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 items-center">
          <button className="px-12 py-4 bg-[#F2EEE8] text-[#141210] font-sans font-light text-xs uppercase tracking-widest transition-opacity duration-700 hover:opacity-80">
            Shop Collection
          </button>
          
          <button className="px-12 py-4 border border-[#F2EEE8]/40 text-[#F2EEE8] font-sans font-light text-xs uppercase tracking-widest backdrop-blur-sm transition-colors duration-700 hover:bg-[#F2EEE8]/10 hover:border-[#F2EEE8]/60">
            Visit the Store
          </button>
        </div>
      </div>

      {/* Absolute positioned signature line for breathing room */}
      <div className="absolute bottom-12 md:bottom-16 w-full flex justify-center z-10 pointer-events-none">
        <p 
          ref={signatureRef}
          className="text-[#F2EEE8]/60 font-serif italic text-sm md:text-base tracking-wide"
        >
          my broooo — keep it classic.
        </p>
      </div>
    </section>
  );
}