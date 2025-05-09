import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Event, Competition, Program } from "@/lib/types";
import Image from "next/image";

type ResourceCardProps = {
  resource: Event | Competition | Program;
  type: "event" | "competition" | "program";
};

// export function ResourceCard({ resource, type }: ResourceCardProps) {
export function ResourceCard({ resource }: ResourceCardProps) {

  // Default image if none provided
  const imageUrl = resource.cover_image || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  
  // Determine route based on type
  // const href = `/${type}s/${resource.id}`;
  
  // Date display logic
  // let dateDisplay = "";
  
  // if ("startDate" in resource) {
  //   if ("endDate" in resource && resource.endDate) {
  //     dateDisplay = `${formatDate(resource.startDate)} - ${formatDate(resource.endDate)}`;
  //   } else {
  //     dateDisplay = formatDate(resource.startDate);
  //   }
  // } else if ("duration" in resource) {
  //   dateDisplay = resource.duration;
  // }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={resource.title}
          className="object-cover transition-transform duration-500 hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.category? <>{resource.category.slice(0, 3).map((cat, e) => (
            <Badge key={e} variant="secondary" className="text-xs">
              {cat.title}
            </Badge>
          ))}</> : <></>}
          {resource.category.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.category.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {resource.description}
        </p>
        
        <div className="space-y-2 text-sm">
          {/*{dateDisplay && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{dateDisplay}</span>
            </div>
          )}
          
           {"location" in resource && resource.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{resource.location}</span>
            </div>
          )}
          
          {"format" in resource && resource.format && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Format:</span>
              <span>{resource.format}</span>
            </div>
          )}*/} 
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center border-t">
        <span className="text-sm text-muted-foreground">
          By {resource.host.name}
        </span>
        
        <Link href={resource.url} className="text-lightHighlight dark:text-darkHighlight hover:underline flex items-center gap-1 text-sm font-medium">
          View details
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}