"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
  value?: string;
}

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
  className,
  contentClassName,
  value = "section",
}: AccordionSectionProps) {
  return (
    <Accordion
      {...(defaultOpen ? { defaultValue: [value] } : {})}
      className={cn("my-4 border", className)}
    >
      <AccordionItem value={value}>
        <AccordionTrigger className="text-sm hover:no-underline py-2">
          {title}
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none pt-0 pb-2",
            contentClassName
          )}
        >
          <div className="p-4 bg-background border rounded-md">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
