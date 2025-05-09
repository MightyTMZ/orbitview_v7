"use client";

import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategories: number[];
  onCategoryChange: (categoryIds: number[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/resources/categories/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: number) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelection);
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden py-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex space-x-2 p-1">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant="outline"
            className={cn(
              "cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground",
              selectedCategories.includes(category.id) && "bg-primary text-primary-foreground"
            )}
            onClick={() => toggleCategory(category.id)}
          >
            {category.title}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}