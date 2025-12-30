"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface IndustryExampleProps {
  game: string
  relevance?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function IndustryExample({
  game,
  relevance,
  children,
  defaultOpen = false,
  className,
}: IndustryExampleProps) {
  const title = relevance ? `${game} (${relevance})` : game

  return (
    <Accordion
      type="single"
      {...(defaultOpen ? { defaultValue: "example" } : {})}
      collapsible
      className={cn("my-4 border", className)}
    >
      <AccordionItem value="example">
        <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground hover:no-underline py-2">
          {title}
        </AccordionTrigger>
        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground pt-0">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
