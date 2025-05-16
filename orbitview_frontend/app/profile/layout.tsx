"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  Code2,
  Trophy,
  Award,
  Settings,
  ChevronRight,
} from "lucide-react";

const profileNavItems = [
  {
    title: "Overview",
    href: "/profile",
    icon: User,
  },
  {
    title: "Timeline",
    href: "/profile/timeline",
    icon: Briefcase,
  },
  {
    title: "Projects",
    href: "/profile/projects",
    icon: Code2,
  },
  {
    title: "Skills",
    href: "/profile/skills",
    icon: Trophy,
  },
  {
    title: "Achievements",
    href: "/profile/achievements",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {profileNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                  {isActive && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-card rounded-lg border shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 