"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  { title: "The Shirts", span: "md:col-span-7", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85ceb?q=80&w=1200&auto=format&fit=crop" },
  { title: "The Two-Piece", span: "md:col-span-5", img: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=1200&auto=format&fit=crop" },
  { title: "Native", span: "md:col-span-5", img: "https://images.unsplash.com/photo-1619515563456-11eb0e140d34?q=80&w=1200&auto=format&fit=crop" },
  { title: "Accessories", span: "md:col-span-7", img: "https://images.unsplash.com/photo-1606166325695-4422e6b72a48?q=80&w=1200&auto=format&fit=crop" },
];

export default function TheArchives() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLAnchorElement>(".archive-card");
      
      // The scroll-triggered reveal
      gsap.fromTo(cards, 
        { y: 50, opacity: 0, clipPath: "inset(10% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%", // Triggers when the top of the grid hits 80% down the viewport
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="shop" className="w-full bg-[var(--color-background)] pt-32 pb-16">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-12 flex justify-between items-end">
        <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-wider">The Archives</h2>
        <p className="hidden md:block font-sans text-xs uppercase tracking-[0.2em] opacity-60">
          Curated Essentials
        </p>
      </div>

      {/* The Grid (Hairline Borders) */}
      <div 
        ref={gridRef}
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-[var(--color-foreground)]/10 border-y border-[var(--color-foreground)]/10"
      >
        {categories.map((cat, i) => (
          <a 
            key={i} 
            href="#" 
            className={`archive-card relative group block h-[60vh] md:h-[70vh] bg-[var(--color-background)] overflow-hidden ${cat.span}`}
          >
            <img 
              src={cat.img} 
              alt={cat.title} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
            
            {/* Dark Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/20"></div>

            {/* Labels */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-2">
              <h3 className="text-[var(--color-background)] font-sans text-sm md:text-base uppercase tracking-widest mix-blend-difference">
                {cat.title}
              </h3>
            </div>

            {/* Hover Reveal Text (The subtle interaction) */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 overflow-hidden">
              <p className="text-[var(--color-background)] font-serif italic text-lg transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                Explore the cut.
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}