"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Updated to reflect the ALD x COS effortless lifestyle
const archives = [
  { id: "01", title: "The Overshirt", span: "md:col-span-5 md:mt-12", img: "images/arm.jpg" },
  { id: "02", title: "Relaxed Trousers", span: "md:col-span-4", img: "images/a3.jpg" },
  { id: "03", title: "Textured Knits", span: "md:col-span-4 md:col-start-2 md:mt-[-4rem]", img: "images/armario1.jpg" },
  { id: "04", title: "Core Basics", span: "md:col-span-6 md:mt-24", img: "images/armario.jpg" },
];

export default function TheArchives() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".archive-card");
      
      // On desktop, we use the staggered scroll reveal.
      // On mobile, the horizontal scroll native behavior is smoother without GSAP fighting it.
      if (!isMobile) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      } else {
        // Simple fade in for mobile to keep the swipe native and clean
        gsap.to(cards, { opacity: 1, duration: 1, stagger: 0.2 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-background)] py-24 md:py-40">
      
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
        <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-foreground)] tracking-wide mb-2 md:mb-0">
          The Archives
        </h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/50">
          Curated Everyday Staples
        </p>
      </div>

      {/* THE LAYOUT MAGIC
        Mobile: Native horizontal scrolling (snap-x), hiding the scrollbar.
        Desktop: The airy, asymmetric 12-column grid.
      */}
      <div className="w-full flex md:grid md:grid-cols-12 gap-6 md:gap-8 px-6 md:px-12 lg:px-24 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-10 md:pb-0">
        
        {archives.map((item) => (
          <div 
            key={item.id} 
            className={`archive-card relative group flex-shrink-0 w-[85vw] md:w-auto snap-center opacity-0 md:opacity-100 ${item.span}`}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] bg-[var(--color-foreground)]/5 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
              />
            </div>

            {/* Typography & Labels (Outside the image for that editorial museum feel) */}
            <div className="mt-4 flex flex-col items-start">
              <span className="font-sans text-[9px] uppercase tracking-widest text-[var(--color-foreground)]/40 mb-1">
                Archive {item.id}
              </span>
              <div className="flex justify-between items-center w-full">
                <h3 className="font-serif text-lg md:text-xl text-[var(--color-foreground)] tracking-wide">
                  {item.title}
                </h3>
                {/* Desktop-only subtle explore link */}
                <span className="hidden md:block font-sans text-[10px] uppercase tracking-widest text-[var(--color-foreground)] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Explore
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Mobile end-spacer to allow the last card to be centered */}
        <div className="w-[4vw] flex-shrink-0 md:hidden"></div>
      </div>
    </section>
  );
}