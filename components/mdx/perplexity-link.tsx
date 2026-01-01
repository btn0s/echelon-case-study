import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

interface PerplexityLinkProps {
  query: string;
  children?: ReactNode;
  className?: string;
  variant?: "inline" | "callout";
}

export function PerplexityLink({
  query,
  children,
  className,
  variant,
}: PerplexityLinkProps) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.perplexity.ai/search?q=${encodedQuery}`;

  const resolvedVariant = variant ?? (children ? "inline" : "callout");

  const linkClassName =
    resolvedVariant === "inline"
      ? `font-medium text-primary underline-offset-2 hover:underline ${
          className ?? ""
        }`.trim()
      : `inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ${
          className ?? ""
        }`.trim();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {children ?? "Learn more"}
      {resolvedVariant === "callout" && <ExternalLink className="size-3" />}
    </a>
  );
}
