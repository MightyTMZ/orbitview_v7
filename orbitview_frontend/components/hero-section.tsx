"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import EarthOrbitView from "./EarthOrbitView";
import { useTheme } from "next-themes";

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 opacity-40" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            variants={fadeIn}
          >
            <span className="text-lightHighlight dark:text-darkHighlight">
              Accelerate your career
            </span>{" "}
            like never before
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            variants={fadeIn}
          >
            Launchpad for any big ambition — discover what&apos;s next, faster
            using next-generation intelligence{" "}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            variants={fadeIn}
          >
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10 py-6 text-lg rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto whitespace-nowrap rounded-full px-8"
            >
              Get Started
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={fadeIn}
          >
            {[
              { label: "Explore Events", href: ROUTES.DISCOVERY },
              { label: "Browse Competitions", href: ROUTES.DISCOVERY },
              { label: "Discover Programs", href: ROUTES.DISCOVERY },
            ].map((item) => (
              <Link href={item.href} key={item.href}>
                <Button
                  variant="outline"
                  className="group rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  {item.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative dots/circles (optional) */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-lightHighlight dark:bg-darkHighlight opacity-10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-lightHighlight dark:bg-darkHighlight opacity-10 blur-3xl" />
      {resolvedTheme == "dark" ? <EarthOrbitView /> : <></>}
    </section>
  );
}
