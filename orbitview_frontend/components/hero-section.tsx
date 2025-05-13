"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES, APP_NAME, BACKEND, shortLiner } from "@/lib/constants";
import {
  ArrowRight,
  Search,
  Rocket,
  Target,
  Trophy,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import EarthOrbitView from "./EarthOrbitView";
// import { fetchWithAuth } from "@/lib/api";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/lib/store/auth-store";
import { FeaturesSection } from "./features-section";
import { TestimonialsSection } from "./testimonials-section";

export function HeroSection() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const { isAuthenticated, user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
  if (!isAuthenticated) {
    return (
      <>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Introducing OrbitView
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              {shortLiner}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              variants={fadeIn}
            >
              {/*<div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search opportunities..."
                  className="pl-10 py-6 text-lg rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>*/}
              <Button
                size="lg"
                className="w-full sm:w-auto whitespace-nowrap rounded-full px-8"
                onClick={() => (window.location.href = "/discover")}
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
      <FeaturesSection/>
      {/*<TestimonialsSection/> only until we get 3 TOP tier testimonials*/}
      </>
    );
  } else {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    const features = [
      {
        icon: Rocket,
        title: "Discover Opportunities",
        description:
          "Find events, programs, and competitions tailored to your interests",
        gradient: "from-purple-500 via-pink-500 to-red-500",
      },
      {
        icon: Target,
        title: "Track Progress",
        description: "Monitor your participation and achievements in one place",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
      },
      {
        icon: Trophy,
        title: "Grow Your Career",
        description:
          "Build your portfolio and accelerate your professional growth",
        gradient: "from-amber-500 via-orange-500 to-red-500",
      },
    ];

    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-500/5 to-blue-500/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-3/4 -right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial="hidden"
            animate={"visible"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-semibold">
                Welcome to {APP_NAME}!{" "}
                <Sparkles className="inline-block h-5 w-5 ml-1" />
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            >
              Hi {user?.first_name}! It's great to have you here
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              We're excited to have you here!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href={ROUTES.DISCOVERY}>
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Explore Opportunities
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={ROUTES.PRODUCT}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 border-2 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300"
                >
                  Learn more
                  <Star className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={"visible"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500`}
                />
                <div className="relative p-6 bg-card/80 backdrop-blur-sm rounded-lg border hover:border-transparent transition-colors duration-300">
                  <feature.icon
                    className={`h-12 w-12 mb-4 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={"visible"}
            className="mt-16 text-center"
          >
            {/*<p className="text-muted-foreground">
              Need help getting started?{" "}
              <Link
                href={ROUTES.HELP}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-medium"
              >
                Check out our guide
              </Link>
            </p>*/}
          </motion.div>
        </div>
      </div>
    );
  }
}
