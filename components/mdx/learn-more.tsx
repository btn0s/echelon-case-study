"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface LearnMoreProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function LearnMore({
  title,
  children,
  defaultOpen = false,
  className,
}: LearnMoreProps) {
  return (
    <Accordion
      type="single"
      defaultValue={defaultOpen ? "content" : undefined}
      collapsible
      className={cn("my-4 border-none", className)}
    >
      <AccordionItem value="content" className="border-none">
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
