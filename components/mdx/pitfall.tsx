"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface PitfallProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Pitfall({ title, children, className }: PitfallProps) {
  return (
    <Alert
      className={cn(
        "my-4 p-4 text-sm bg-destructive/10 border-destructive/20",
        className
      )}
      variant="destructive"
    >
      <AlertTitle className="flex items-center gap-2">
        <TriangleAlert className="size-4" />
        {title}
      </AlertTitle>
      <AlertDescription className="mt-1 [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </AlertDescription>
    </Alert>
  );
}
