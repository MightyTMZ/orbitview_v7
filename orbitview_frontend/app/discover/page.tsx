"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { Event, Program, Competition } from "@/lib/types";
import { CategoryFilter } from "@/components/category-filter";
import { getEvents, getPrograms, getCompetitions } from "@/lib/api";

export default function DiscoveryPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [selectedCategories]);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const [eventsResponse, programsResponse, competitionsResponse] = await Promise.all([
        getEvents(1, 10, selectedCategories),
        getPrograms(1, 10, selectedCategories),
        getCompetitions(1, 10, selectedCategories)
      ]);
      setEvents(eventsResponse.results);
      setPrograms(programsResponse.results);
      setCompetitions(competitionsResponse.results);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 1500);
  };

  const renderResources = () => {
    const allResources = [
      ...events.map(event => ({
        resource: {
          id: event.id.toString(),
          title: event.title,
          description: event.description,
          startDate: event.start_time,
          endDate: event.end_time,
          location: event.location,
          imageUrl: event.cover_image,
          tags: event.category? event.category.map(c => c.title) : [],          
          organizerName: event.host.name,
          url: event.url,
          categories: event.category
        },
        type: "event" as const
      })),
      ...programs.map(program => ({
        resource: {
          id: program.id.toString(),
          title: program.title,
          description: program.description,
          duration: program.duration_description,
          imageUrl: program.cover_image,
          tags: program.category? program.category.map(c => c.title) : [],          organizerName: program.host.name,
          url: program.url,
          categories: program.category
        },
        type: "program" as const
      })),
      ...competitions.map(competition => ({
        resource: {
          id: competition.id.toString(),
          title: competition.title,
          description: competition.description,
          startDate: competition.start_date,
          endDate: competition.end_date,
          tags: [...competition.tags.map(t => t.name), ...competition.category.map(c => c.title)],
          difficulty: competition.difficulty_level,
          url: competition.url,
          categories: competition.category
        },
        type: "competition" as const
      }))
    ].sort((a, b) => a.resource.title.localeCompare(b.resource.title));

    return allResources.map(({ resource, type }) => (
      <ResourceCard
        key={`${type}-${resource.id}`}
        resource={resource}
        type={type}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover Your Next Opportunity</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Use natural language to find events, competitions, and programs that match your interests and goals.
          </p>
          
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Try: 'Find me AI workshops and hackathons in the next 3 months'"
                className="pl-10 py-6 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button 
              size="lg" 
              onClick={handleSearch}
              disabled={isSearching || !query}
              className="min-w-[120px]"
            >
              {isSearching ? (
                <Sparkles className="h-5 w-5 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>

          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          
          <p className="text-sm text-muted-foreground mt-3">
            Powered by AI to understand your needs and find the perfect matches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg animate-pulse h-[400px]">
                <div className="h-48 bg-muted rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded-md w-3/4" />
                  <div className="h-4 bg-muted rounded-md w-1/2" />
                  <div className="h-4 bg-muted rounded-md w-full" />
                </div>
              </div>
            ))
          ) : (
            renderResources()
          )}
        </div>
      </div>
    </div>
  );
}