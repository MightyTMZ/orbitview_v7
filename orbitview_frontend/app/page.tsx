import { HeroSection } from "@/components/hero-section";
import { ToastContainer } from "react-toastify"
// import { StatisticsSection } from "@/components/statistics-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToastContainer />
    </div>
  );
}