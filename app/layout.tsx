import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/app/components/Layout/SmoothScroll";
import Header from "@/app/components/Layout/Header"; 

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armario | Built for Men Who Know",
  description: "Lagos craftsmanship. Worldwide delivery. Elevated menswear curated for presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <SmoothScroll>
          {/* The sticky editorial header sits at the top of the entire app */}
          <Header />
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}