"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MoreVertical, Plus, Pencil, Trash2, Briefcase, GraduationCap, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TimelineEntry {
  id: number;
  type: 'WORK' | 'EDUCATION' | 'VOLUNTEER' | 'INTERNSHIP' | 'CERTIFICATION';
  title: string;
  organization: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  role?: string;
  department?: string;
  degree?: string;
  field_of_study?: string;
  grade?: string;
  highlights: string[];
  url?: string;
}

const typeIcons = {
  WORK: Briefcase,
  EDUCATION: GraduationCap,
  VOLUNTEER: Award,
  INTERNSHIP: Briefcase,
  CERTIFICATION: Award,
};

const typeLabels = {
  WORK: "Work Experience",
  EDUCATION: "Education",
  VOLUNTEER: "Volunteer Work",
  INTERNSHIP: "Internship",
  CERTIFICATION: "Certification",
};

export default function TimelinePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const data = await fetchWithAuth<{ timeline_entries: TimelineEntry[] }>("/profiles/me/");
      setEntries(data.timeline_entries);
    } catch (error) {
      console.error("Failed to fetch timeline entries:", error);
      toast({
        title: "Error",
        description: "Failed to load timeline entries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteEntry(id: number) {
    try {
      await fetchWithAuth(`/profiles/timeline/${id}/`, {
        method: "DELETE",
      });
      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: "Success",
        description: "Timeline entry deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete timeline entry:", error);
      toast({
        title: "Error",
        description: "Failed to delete timeline entry",
        variant: "destructive",
      });
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Present";
    return format(new Date(date), "MMM yyyy");
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Timeline</h1>
        <Button onClick={() => router.push("/profile/timeline/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="space-y-6">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No timeline entries yet</p>
              <Button onClick={() => router.push("/profile/timeline/new")}>
                Add Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const Icon = typeIcons[entry.type];
              return (
                <Card key={entry.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <Badge variant="outline">
                            {typeLabels[entry.type]}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold">{entry.title}</h3>
                        <p className="text-muted-foreground">
                          {entry.organization}
                          {entry.location && ` • ${entry.location}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(entry.start_date)} - {formatDate(entry.end_date)}
                          {entry.is_current && " • Present"}
                        </p>
                        {entry.role && (
                          <p className="text-sm">{entry.role}</p>
                        )}
                        {entry.degree && (
                          <p className="text-sm">
                            {entry.degree} in {entry.field_of_study}
                            {entry.grade && ` • ${entry.grade}`}
                          </p>
                        )}
                        <p className="mt-2 text-sm">{entry.description}</p>
                        {entry.highlights && entry.highlights.length > 0 && (
                          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                            {entry.highlights.map((highlight, index) => (
                              <li key={index}>{highlight}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/profile/timeline/${entry.id}/edit`)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 