import { HeroSection } from "@/components/hero-section";
import { ToastContainer } from "react-toastify"
import { fetchWithAuth } from "@/lib/api";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToastContainer />
    </div>
  );
}