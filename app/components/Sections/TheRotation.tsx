"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rotations = [
  { id: "01", title: "Clean Layers", img: "images/a3.jpg" },
  { id: "02", title: "Denim Balance", img: "images/a1.jpg" },
  { id: "03", title: "Weekend Classic", img: "images/a4.jpg" },
];

export default function TheRotation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".rotation-card");
      
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-background)] py-24 md:py-32 px-6 md:px-12 lg:px-24">
      {/* Section Header */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end border-b border-[var(--color-foreground)]/10 pb-6">
        <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-[var(--color-foreground)]">
          Daily Rotation
        </h2>
        <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-foreground)]/60 mt-4 md:mt-0">
          How we wear it now.
        </p>
      </div>

      {/* Rotation Layout (Magazine Spread) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
        {rotations.map((item, index) => {
          // Creating an asymmetric layout natively in Tailwind
          const spanClass = index === 0 ? "md:col-span-5" : index === 1 ? "md:col-span-3 md:mt-24" : "md:col-span-4";
          
          return (
            <div key={item.id} className={`rotation-card group cursor-pointer ${spanClass} flex flex-col`}>
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-foreground)]/5 mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                />
              </div>

              {/* Minimal Text Block */}
              <div className="flex flex-col">
                <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-foreground)]/50 mb-2">
                  Rotation {item.id}
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg md:text-xl text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
                  {/* Subtle Hover CTA */}
                  <span className="font-sans text-xs tracking-widest text-[var(--color-foreground)] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Shop Look →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}