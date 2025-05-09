import { HeroSection } from "@/components/hero-section";
import { FeaturedResources } from "@/components/featured-resources";
import { StatisticsSection } from "@/components/statistics-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedResources />
      <StatisticsSection />
    </div>
  );
}