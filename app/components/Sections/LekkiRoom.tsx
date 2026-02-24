"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LekkiRoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Image Parallax Effect
      gsap.to(imageRef.current, {
        yPercent: 15, // Slow downward push as you scroll down
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // Ties the animation strictly to the scrollbar
        }
      });

      // Content Fade In
      const elements = contentRef.current?.children;
      if (elements) {
        gsap.fromTo(elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="visit-store" className="w-full bg-[var(--color-foreground)] text-[var(--color-background)] flex flex-col md:flex-row min-h-[80vh] overflow-hidden">
      
      {/* Left: Store Image with Parallax */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden bg-black">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop" // Replace with moody Lekki store photo
          alt="The Lekki Room - Armario Physical Store"
          className="absolute top-[-10%] left-0 w-full h-[120%] object-cover opacity-80"
        />
      </div>

      {/* Right: Editorial Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 lg:p-24">
        <div ref={contentRef} className="max-w-md">
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-6">
            The Lekki <br/> Room.
          </h2>
          
          <p className="font-sans text-sm tracking-widest leading-relaxed opacity-80 mb-12">
            Experience the fabric. Feel the weight. Find your exact fit in person. Our doors are open for those who appreciate the cut.
          </p>

          <div className="mb-12 font-sans text-xs uppercase tracking-[0.2em] space-y-4 opacity-70">
            <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
            <p>Lekki Phase 1, Lagos</p>
          </div>

          <div className="flex flex-col gap-4">
            <button className="px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] font-sans text-xs uppercase tracking-widest transition-transform duration-500 hover:scale-[1.02] w-full md:w-auto text-center">
              Get Directions
            </button>
            <button className="px-8 py-4 border border-[var(--color-background)]/30 text-[var(--color-background)] font-sans text-xs uppercase tracking-widest transition-colors duration-500 hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)] w-full md:w-auto text-center">
              WhatsApp to book a fitting, my broooo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}