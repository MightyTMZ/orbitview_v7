"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import {
  Briefcase,
  Code2,
  Trophy,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ProfileData {
  profile: {
    id: number;
    user: number;
    bio: string;
    location: string;
    website: string;
    created_at: string;
    updated_at: string;
  };
  timeline_entries: Array<{
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string | null;
    type: string;
  }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    proficiency: number;
    verified: boolean;
  }>;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
    issuer: string;
  }>;
  stats: {
    timeline_entries: number;
    projects: number;
    skills: number;
    achievements: number;
    profile_completion: number;
  };
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await fetchWithAuth<ProfileData>("/profiles/me/");
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  const profileSections = [
    {
      title: "Timeline",
      icon: Briefcase,
      count: profileData?.stats.timeline_entries || 0,
      href: "/profile/timeline",
      description: "Add your work experience and education history",
    },
    {
      title: "Projects",
      icon: Code2,
      count: profileData?.stats.projects || 0,
      href: "/profile/projects",
      description: "Showcase your projects and contributions",
    },
    {
      title: "Skills",
      icon: Trophy,
      count: profileData?.stats.skills || 0,
      href: "/profile/skills",
      description: "List your skills and get them verified",
    },
    {
      title: "Achievements",
      icon: Award,
      count: profileData?.stats.achievements || 0,
      href: "/profile/achievements",
      description: "Add your certifications and awards",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.profile_image || ""} alt={user?.first_name} />
            <AvatarFallback>{getInitials(user?.first_name || "")}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.first_name} {user?.last_name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
            {profileData?.profile.bio && (
              <p className="mt-2 text-sm">{profileData.profile.bio}</p>
            )}
            {profileData?.profile.location && (
              <p className="text-sm text-muted-foreground">
                📍 {profileData.profile.location}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress 
                  value={profileData?.stats.profile_completion || 0} 
                  className="h-2" 
                />
                <p className="text-sm text-muted-foreground">
                  Complete your profile to increase your visibility to opportunities
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{section.count}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/profile/timeline/new">
              Add Timeline Entry
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile/projects/new">
              Add Project
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile/skills/new">
              Add Skill
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 