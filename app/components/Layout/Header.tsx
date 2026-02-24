"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs for GSAP animation
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // 1. Scroll Listener for Transparent -> Solid Transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. GSAP Mobile Menu Animation (Fade + Slow Upward Stagger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup the timeline but keep it paused
      tl.current = gsap.timeline({ paused: true });

      // Animate overlay fade in
      tl.current.to(menuOverlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        display: "flex",
      });

      // Stagger menu items upward
      if (menuLinksRef.current) {
        const links = menuLinksRef.current.children;
        gsap.set(links, { y: 30, opacity: 0 }); // Initial state
        
        tl.current.to(links, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.3"); // Overlap with the background fade
      }
    });

    return () => ctx.revert();
  }, []);

  // Play/Reverse timeline based on state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      tl.current?.play();
    } else {
      document.body.style.overflow = "";
      tl.current?.reverse();
    }
  }, [isMobileMenuOpen]);

  const navLinks = ["New", "Shop", "Lookbook", "Visit Store"];

  return (
    <>
      {/* --- THE ANNOUNCEMENT STRIP (The High-End Move) --- */}
      <div className="w-full bg-[var(--color-foreground)] text-[var(--color-background)] h-[28px] flex items-center justify-center z-50 relative">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em]">
          Lagos Walk-In Store — Worldwide Delivery — Exchange Only
        </p>
      </div>

      {/* --- MAIN HEADER --- */}
      <header 
        className={`fixed top-[28px] left-0 w-full z-40 transition-all duration-400 ease-in-out border-b
          ${isScrolled 
            ? "bg-[var(--color-background)]/90 backdrop-blur-md border-[var(--color-foreground)]/10 text-[var(--color-foreground)] h-[72px] md:h-[84px]" 
            : "bg-transparent border-transparent text-[var(--color-background)] h-[84px] md:h-[96px]" // Taller when at the top
          }
        `}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-12 lg:px-24">
          
          {/* LEFT: Desktop Nav / Mobile Hamburger */}
          <div className="flex-1 flex items-center justify-start">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="font-sans text-xs uppercase tracking-widest relative group overflow-hidden"
                >
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">{link}</span>
                  <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">{link}</span>
                </a>
              ))}
            </nav>
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu strokeWidth={1} size={24} />
            </button>
          </div>

          {/* CENTER: The Anchor Wordmark */}
          <div className="flex-1 flex justify-center">
            <a href="/" className="font-serif text-2xl md:text-3xl tracking-widest uppercase">
              Armario
            </a>
          </div>

          {/* RIGHT: Utility Icons */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <button className="hidden md:block transition-transform duration-300 hover:scale-[1.03]">
              <Search strokeWidth={1} size={20} />
            </button>
            <button className="hidden md:block transition-transform duration-300 hover:scale-[1.03]">
              <User strokeWidth={1} size={20} />
            </button>
            <button className="transition-transform duration-300 hover:scale-[1.03] relative">
              <ShoppingBag strokeWidth={1} size={20} />
              {/* Optional minimal cart dot */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[var(--color-foreground)] text-[var(--color-background)] z-50 hidden flex-col justify-between p-6 opacity-0"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between h-[72px] border-b border-[var(--color-background)]/10">
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] opacity-50">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 transition-transform duration-300 hover:rotate-90"
          >
            <X strokeWidth={1} size={24} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav ref={menuLinksRef} className="flex flex-col gap-6 mt-16 flex-1">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-4xl uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
          <a href="#whatsapp" className="font-sans text-sm uppercase tracking-widest mt-8 border-b border-[var(--color-background)]/20 pb-2 inline-block w-max">
            WhatsApp Order
          </a>
        </nav>

        {/* Mobile Menu Footer */}
        <div className="pb-8">
          <p className="font-sans text-[10px] uppercase tracking-widest opacity-50">
            Lagos • Worldwide Delivery
          </p>
        </div>
      </div>
    </>
  );
}