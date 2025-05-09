"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { Event, Competition, Program } from "@/lib/types";
import { CategoryFilter } from "@/components/category-filter";

export default function DiscoveryPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Mock data for preview
  const mockResults: (Event | Competition | Program)[] = [
    {
      id: "1",
      title: "AI Ethics Workshop",
      description: "A hands-on workshop exploring ethical considerations in artificial intelligence development and deployment.",
      startDate: "2025-05-22T13:00:00Z",
      location: "Online",
      imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      tags: ["AI", "Ethics", "Workshop", "Virtual"],
      organizerName: "AI Research Institute",
      categories: [{ id: 1, title: "Certifications" }]
    },
    {
      id: "2",
      title: "Global Hackathon Challenge",
      description: "A 48-hour hackathon bringing together developers, designers, and entrepreneurs to build innovative solutions.",
      startDate: "2025-08-10T00:00:00Z",
      endDate: "2025-08-12T00:00:00Z",
      prizes: ["$50,000 First Prize", "$25,000 Second Prize"],
      eligibility: "Open to individuals and teams worldwide",
      imageUrl: "https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg",
      tags: ["Hackathon", "Programming", "Innovation"],
      organizerName: "TechHub",
      categories: [{ id: 6, title: "Hackathon" }]
    },
    {
      id: "3",
      title: "Leadership Development Program",
      description: "A comprehensive program designed to equip emerging leaders with essential skills for effective leadership.",
      duration: "3 months",
      format: "Hybrid",
      imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      tags: ["Leadership", "Professional Development"],
      organizerName: "Leadership Institute",
      categories: [{ id: 4, title: "Fellowships" }]
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 1500);
  };

  const filteredResults = selectedCategories.length > 0
    ? mockResults.filter(result => 
        result.categories?.some(category => 
          selectedCategories.includes(category.id)
        )
      )
    : mockResults;

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
          {filteredResults.map((result) => (
            <ResourceCard
              key={result.id}
              resource={result}
              type={'duration' in result ? 'program' : 'prizes' in result ? 'competition' : 'event'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}