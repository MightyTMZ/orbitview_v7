import { HeroSection } from "@/components/hero-section";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToastContainer />
    </div>
  );
}