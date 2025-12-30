"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface CodeWalkthroughProps {
  title?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function CodeWalkthrough({
  title = "Code Walkthrough",
  children,
  defaultOpen = false,
  className,
}: CodeWalkthroughProps) {
  return (
    <Accordion
      type="single"
      defaultValue={defaultOpen ? "code" : undefined}
      collapsible
      className={cn("my-4 border", className)}
    >
      <AccordionItem value="code">
        <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground hover:no-underline py-2">
          {title}
        </AccordionTrigger>
        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground [&_pre]:text-xs [&_pre]:overflow-x-auto pt-0">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
