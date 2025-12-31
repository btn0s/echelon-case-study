import { ExternalLink } from "lucide-react";

interface PerplexityLinkProps {
  query: string;
}

export function PerplexityLink({ query }: PerplexityLinkProps) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.perplexity.ai/search?q=${encodedQuery}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      Learn more
      <ExternalLink className="size-3" />
    </a>
  );
}
