"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "@/components/resource-card";
import { Event, Competition, Program } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ResourceData = {
  events: Event[];
  competitions: Competition[];
  programs: Program[];
};

export function FeaturedResources() {
  const [resources, setResources] = useState<ResourceData>({
    events: [],
    competitions: [],
    programs: [],
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");

  // This would be replaced with actual API calls in a real implementation
  useEffect(() => {
    const mockData = {
      events: [
        {
          id: "1",
          title: "Tech Innovation Summit 2025",
          description: "Join industry leaders and innovators for a two-day summit on emerging technologies and their impact on various industries.",
          startDate: "2025-06-15T09:00:00Z",
          endDate: "2025-06-16T18:00:00Z",
          location: "San Francisco, CA",
          imageUrl: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Technology", "Innovation", "Conference"],
          organizerName: "TechConnect",
          url: "https://example.com/event1",
        },
        {
          id: "2",
          title: "AI Ethics Workshop",
          description: "A hands-on workshop exploring ethical considerations in artificial intelligence development and deployment.",
          startDate: "2025-05-22T13:00:00Z",
          location: "Online",
          imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["AI", "Ethics", "Workshop", "Virtual"],
          organizerName: "AI Research Institute",
          url: "https://example.com/event2",
        },
        {
          id: "3",
          title: "Design Thinking Masterclass",
          description: "Learn the fundamentals of design thinking and how to apply this problem-solving approach to your work.",
          startDate: "2025-07-05T10:00:00Z",
          endDate: "2025-07-05T16:00:00Z",
          location: "New York, NY",
          imageUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Design", "Innovation", "Masterclass"],
          organizerName: "Creative Solutions",
          url: "https://example.com/event3",
        },
      ],
      competitions: [
        {
          id: "1",
          title: "Global Hackathon Challenge",
          description: "A 48-hour hackathon bringing together developers, designers, and entrepreneurs to build innovative solutions for climate change.",
          startDate: "2025-08-10T00:00:00Z",
          endDate: "2025-08-12T00:00:00Z",
          prizes: ["$50,000 First Prize", "$25,000 Second Prize", "$10,000 Third Prize"],
          eligibility: "Open to individuals and teams worldwide, ages 18+",
          imageUrl: "https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Hackathon", "Programming", "Climate Tech", "Global"],
          organizerName: "EcoTech Alliance",
          url: "https://example.com/competition1",
        },
        {
          id: "2",
          title: "Student Entrepreneurship Contest",
          description: "Pitch your startup idea to a panel of venture capitalists and industry experts for a chance to win funding and mentorship.",
          startDate: "2025-09-01T00:00:00Z",
          endDate: "2025-12-15T00:00:00Z",
          prizes: ["$100,000 seed funding", "6-month incubator program"],
          eligibility: "Current students and recent graduates (within 2 years)",
          imageUrl: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Entrepreneurship", "Startup", "Pitching", "Students"],
          organizerName: "Future Founders Foundation",
          url: "https://example.com/competition2",
        },
        {
          id: "3",
          title: "Data Science Competition",
          description: "Use machine learning to predict housing prices based on a comprehensive dataset of properties and market factors.",
          startDate: "2025-06-01T00:00:00Z",
          endDate: "2025-07-31T23:59:59Z",
          prizes: ["$30,000 in prizes", "Job opportunities with sponsor companies"],
          eligibility: "Open to all skill levels, individuals or teams of up to 5",
          imageUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Data Science", "Machine Learning", "Competition"],
          organizerName: "DataScope",
          url: "https://example.com/competition3",
        },
      ],
      programs: [
        {
          id: "1",
          title: "Leadership Development Program",
          description: "A comprehensive 3-month program designed to equip emerging leaders with essential skills for effective leadership in today's dynamic business environment.",
          duration: "3 months",
          startDate: "2025-07-01T00:00:00Z",
          format: "Hybrid",
          imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Leadership", "Professional Development", "Career Growth"],
          organizerName: "Executive Excellence Institute",
          url: "https://example.com/program1",
        },
        {
          id: "2",
          title: "Full-Stack Web Development Bootcamp",
          description: "Intensive coding bootcamp covering front-end and back-end development, with a focus on modern JavaScript frameworks and databases.",
          duration: "14 weeks",
          startDate: "2025-06-15T00:00:00Z",
          location: "Multiple locations and online",
          format: "In-person and online options",
          imageUrl: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Coding", "Web Development", "Bootcamp", "Tech Skills"],
          organizerName: "CodeMasters Academy",
          url: "https://example.com/program2",
        },
        {
          id: "3",
          title: "Product Management Certification",
          description: "Learn the essential skills of product management, from market research and user experience to product strategy and roadmap planning.",
          duration: "8 weeks",
          location: "Online",
          format: "Online, self-paced with live sessions",
          imageUrl: "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Product Management", "Certification", "Tech Career"],
          organizerName: "Product School",
          url: "https://example.com/program3",
        },
      ],
    };
    
    // Simulate API fetch delay
    setTimeout(() => {
      setResources(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked events, competitions, and programs designed to help you advance in your career.
          </p>
        </div>

        <Tabs 
          defaultValue="events" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries({
            events: resources.events,
            competitions: resources.competitions,
            programs: resources.programs,
          }).map(([key, items]) => (
            <TabsContent key={key} value={key} className={cn(
              "transition-all duration-500",
              activeTab === key ? "opacity-100" : "opacity-0"
            )}>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card rounded-lg animate-pulse h-80">
                      <div className="h-48 bg-muted rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted rounded-md w-3/4"></div>
                        <div className="h-4 bg-muted rounded-md w-1/2"></div>
                        <div className="h-4 bg-muted rounded-md w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.div key={item.id} variants={itemVariant}>
                      <ResourceCard 
                        resource={item} 
                        type={key.slice(0, -1) as "event" | "competition" | "program"} 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}