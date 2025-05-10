"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { Event, Program, Competition, Category } from "@/lib/types";
import { CategoryFilter } from "@/components/category-filter";
import { getEvents, getPrograms, getCompetitions } from "@/lib/api";
import { DisoverPageHeader } from "@/components/discover-header";
import { useTheme } from "next-themes";

export default function DiscoveryPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]); // Use category IDs
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [allCompetitions, setAllCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    fetchAllResources();
  }, []);

  const fetchAllResources = async () => {
    try {
      setIsLoading(true);
      const [eventsResponse, programsResponse, competitionsResponse] =
        await Promise.all([
          getEvents(1, 100),
          getPrograms(1, 100),
          getCompetitions(1, 100),
        ]);
      setAllEvents(eventsResponse.results);
      setAllPrograms(programsResponse.results);
      setAllCompetitions(competitionsResponse.results);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  const filterResources = (
    resources: (Competition | Program | Event)[],
    categoryIds: number[]
  ) => {
    if (categoryIds.length === 0) return resources;
    const categorySet = new Set(categoryIds);
    return resources.filter((resource) =>
      resource.category?.some((cat: Category) => categorySet.has(cat.id))
    );
  };

  const renderResources = () => {
    const filteredEvents = filterResources(
      allEvents,
      selectedCategories
    ) as Event[];
    const filteredPrograms = filterResources(
      allPrograms,
      selectedCategories
    ) as Program[];
    const filteredCompetitions = filterResources(
      allCompetitions,
      selectedCategories
    ) as Competition[];

    const allResources = [
      ...filteredEvents.map((resource) => ({
        resource,
        type: "event" as const,
      })),
      ...filteredPrograms.map((resource) => ({
        resource,
        type: "program" as const,
      })),
      ...filteredCompetitions.map((resource) => ({
        resource,
        type: "competition" as const,
      })),
    ].sort((a, b) => a.resource.title.localeCompare(b.resource.title));

    const filterByQuery = (r: Event | Program | Competition) => {
      const searchTerms = query.toLowerCase().split(" ");
      return searchTerms.some(
        (term) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          (r.category?.some((c) => c.title.toLowerCase().includes(term)) ??
            false)
      );
    };

    return allResources
      .filter(({ resource }) => (query ? filterByQuery(resource) : true))
      .map(({ resource, type }) => (
        <ResourceCard
          key={`${type}-${resource.id}`}
          resource={resource}
          type={type}
        />
      ));
  };

  const textClass = resolvedTheme == "dark"? "text-white" : 'text-dark';
  const bgColor = resolvedTheme == "dark"? "white" : 'dark';

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <DisoverPageHeader />

          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Try: 'Find me AI workshops and hackathons in the next 3 months'"
                className={`pl-10 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 ${textClass} placeholder:text-white/50`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              size="lg"
              onClick={handleSearch}
              disabled={isSearching || !query}
              className={`min-w-[120px] bg-${bgColor}/10 hover:bg-${bgColor}/20 backdrop-blur-sm ${textClass}`}
            >
              {isSearching ? (
                <Sparkles className="h-5 w-5 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>

          <p className={`text-sm text-start mb-8 ${textClass}/80`}>
            Click to select multiple categories and click again to unselect.
          </p>
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-lg animate-pulse h-[400px]"
                >
                  <div className="h-48 bg-white/20 rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-white/20 rounded-md w-3/4" />
                    <div className="h-4 bg-white/20 rounded-md w-1/2" />
                    <div className="h-4 bg-white/20 rounded-md w-full" />
                  </div>
                </div>
              ))
            : renderResources()}
        </div>
      </div>
    </div>
  );
}
