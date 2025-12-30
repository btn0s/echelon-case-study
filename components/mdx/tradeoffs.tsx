"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface TradeoffsProps {
  title?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Tradeoffs({
  title = "Options & Tradeoffs",
  children,
  defaultOpen = false,
  className,
}: TradeoffsProps) {
  return (
    <Accordion
      type="single"
      defaultValue={defaultOpen ? "tradeoffs" : undefined}
      collapsible
      className={cn("my-4 border-none", className)}
    >
      <AccordionItem value="tradeoffs" className="border-none">
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
