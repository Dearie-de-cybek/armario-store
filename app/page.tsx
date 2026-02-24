import HeroEditorial from "@/app/components/Sections/HeroEditorial";
import TheArchives from "./components/Sections/TheArchives";
import TheRotation from "./components/Sections/TheRotation";
import BrandPromise from "./components/Sections/BrandPromise";
import LekkiRoom from "./components/Sections/LekkiRoom";
import TheLookbook from "./components/Sections/TheLookbook";
import FooterCTA from "./components/Sections/FooterCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. The Editorial Campaign Hero */}
      <HeroEditorial />
      
     <TheArchives />
      <TheRotation />
      <BrandPromise />
      <LekkiRoom />
      <TheLookbook />
      <FooterCTA />
    </div>
  );
}