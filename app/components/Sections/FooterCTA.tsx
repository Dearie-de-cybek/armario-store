"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Subtle scale up of the massive text as you scroll into the footer
      gsap.fromTo(textRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="w-full bg-[var(--color-foreground)] text-[var(--color-background)] flex flex-col justify-between min-h-[90vh] pt-32 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* Massive CTA */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <h2 ref={textRef} className="font-serif text-[12vw] leading-[0.85] tracking-tighter uppercase mb-12 mix-blend-difference">
          Secure <br/> The Look.
        </h2>
        <p className="font-sans text-sm md:text-base tracking-[0.2em] uppercase opacity-80 mb-12">
          Don't let the best pieces slide. We move fast.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button className="px-12 py-5 bg-[var(--color-background)] text-[var(--color-foreground)] font-sans text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform duration-500">
            Shop Everything
          </button>
          <button className="px-12 py-5 border border-[var(--color-background)]/30 text-[var(--color-background)] font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)] transition-colors duration-500">
            Join The List
          </button>
        </div>
      </div>

      {/* Signature Line */}
      <div className="absolute top-[60%] md:top-[65%] w-full flex justify-center left-0 pointer-events-none">
         <p className="font-serif italic text-xl md:text-2xl text-[var(--color-accent)] opacity-80">
            my broooo
         </p>
      </div>

      {/* Clean Footer Links */}
      <div className="w-full border-t border-[var(--color-background)]/20 pt-8 mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 font-sans text-xs uppercase tracking-widest opacity-70 w-full md:w-auto">
          <div className="flex flex-col gap-4">
            <span className="font-bold opacity-100">Connect</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">WhatsApp</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold opacity-100">Policies</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Shipping</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Exchange Only</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold opacity-100">Location</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Lekki Phase 1</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Lagos, Nigeria</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold opacity-100">Contact</span>
            <a href="#" className="hover:opacity-100 transition-opacity">08029702753</a>
            <a href="#" className="hover:opacity-100 transition-opacity">DM for Enquiries</a>
          </div>
        </div>

        <div className="font-sans text-[10px] uppercase tracking-widest opacity-40 flex flex-col items-start md:items-end gap-2">
          <p>© {new Date().getFullYear()} ARMARIO.NG</p>
          <p>BUILT BY ANYADUBA CHARLES EMEKA</p>
        </div>
      </div>
    </footer>
  );
}