"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  { id: 1, name: "Signature Linen Suit", priceNGN: "₦185,000", priceUSD: "$120", img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "The Lekki Overshirt", priceNGN: "₦65,000", priceUSD: "$45", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Tailored Pleated Trouser", priceNGN: "₦80,000", priceUSD: "$55", img: "https://images.unsplash.com/photo-1624378439575-d1ead6bb1651?q=80&w=800&auto=format&fit=crop" },
];

export default function TheRotation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".product-card");
      
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    <section ref={sectionRef} className="w-full bg-[var(--color-background)] py-24 px-6 md:px-12 lg:px-24">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest mb-4">The Rotation</h2>
        <p className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 max-w-md">
          Our most requested silhouettes. No restocks once gone, my broooo.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {products.map((product) => (
          <div key={product.id} className="product-card group cursor-pointer">
            {/* Image Container with Hover Quick Add */}
            <div className="relative w-full aspect-[4/5] bg-[var(--color-foreground)]/5 overflow-hidden mb-6">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Quick Add overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                <button className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] font-sans text-[10px] uppercase tracking-widest py-3 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-colors">
                  Quick Add +
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="flex justify-between items-start">
              <h3 className="font-sans text-sm md:text-base tracking-wide">{product.name}</h3>
              <div className="text-right">
                <p className="font-sans text-sm">{product.priceNGN}</p>
                <p className="font-sans text-[10px] opacity-50 tracking-widest">{product.priceUSD}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button className="border-b border-[var(--color-foreground)] pb-1 font-sans text-xs uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
          View All Ready-To-Wear
        </button>
      </div>
    </section>
  );
}