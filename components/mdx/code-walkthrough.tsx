"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

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
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn("my-4", className)}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors">
        <span>{title}</span>
        <ChevronDownIcon
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 prose prose-sm dark:prose-invert max-w-none text-muted-foreground [&_pre]:text-xs [&_pre]:overflow-x-auto">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
