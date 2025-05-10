"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { Menu, X, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import styles from "./navbar.module.css"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // Example authenticated state - would be from auth context in real app
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [{ title: "Discover", href: ROUTES.DISCOVERY }];

  // const textColor = resolvedTheme == "dark" ? "text-white" : "text-gray-900";
  // const bgColor = resolvedTheme == "dark" ? "black" : "white";
  const hoverColor =
    resolvedTheme == "dark" ? "hover:text-white" : "hover:text-gray-900";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        {
          "bg-background/95 backdrop-blur-sm shadow-sm": isScrolled || isOpen,
          "bg-transparent": !isScrolled && !isOpen,
        }
      )}
    >
      <div className="container px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="flex items-center space-x-2 text-2xl font-bold transition-transform hover:scale-105"
          onClick={closeMenu}
        >
          <Orbit className="h-8 w-8" />
          <span>{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-lg transition-colors duration-200 hover:text-lightHighlight dark:hover:text-darkHighlight",
                  {
                    "text-lightHighlight dark:text-darkHighlight font-medium":
                      pathname === item.href,
                  }
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 pl-6 border-l border-gray-300 dark:border-gray-700">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link href={ROUTES.PROFILE}>
                <Button variant="outline">Profile</Button>
              </Link>
            ) : (
              <div className="flex space-x-2">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white text-black dark:bg-zinc-900 dark:text-white md:hidden">
          <div className={`container py-8 px-4 flex flex-col space-y-8 ${resolvedTheme === "dark" ? styles.darkNavMobile : styles.lightNavMobile}`} >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xl py-2 transition-colors duration-200",
                  hoverColor,
                  {
                    "text-primary font-medium": pathname === item.href,
                  }
                )}
                onClick={closeMenu}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
              {isAuthenticated ? (
                <Link href={ROUTES.PROFILE} onClick={closeMenu}>
                  <Button className="w-full" size="lg">
                    Profile
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link href={ROUTES.LOGIN} onClick={closeMenu}>
                    <Button variant="outline" className="w-full" size="lg">
                      Login
                    </Button>
                  </Link>
                  <Link href={ROUTES.REGISTER} onClick={closeMenu}>
                    <Button className="w-full" size="lg">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
