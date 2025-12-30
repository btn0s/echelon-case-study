import { AccordionSection } from "@/components/mdx/accordion-section";
import { Pitfall } from "@/components/mdx/pitfall";
import { PerplexityLink } from "@/components/mdx/perplexity-link";

// Wrapper components for backward compatibility
function Concept(props: React.ComponentProps<typeof AccordionSection>) {
  return <AccordionSection {...props} value="concept" />;
}

function LearnMore(props: React.ComponentProps<typeof AccordionSection>) {
  return <AccordionSection {...props} value="content" />;
}

function IndustryExample({
  game,
  relevance,
  ...props
}: Omit<React.ComponentProps<typeof AccordionSection>, "title"> & {
  game: string;
  relevance?: string;
}) {
  const title = relevance ? `${game} (${relevance})` : game;
  return <AccordionSection {...props} title={title} value="example" />;
}

function CodeWalkthrough({
  title = "Code Walkthrough",
  ...props
}: React.ComponentProps<typeof AccordionSection>) {
  return (
    <AccordionSection
      {...props}
      title={title}
      value="code"
      contentClassName="[&_pre]:text-xs [&_pre]:overflow-x-auto"
    />
  );
}

function Tradeoffs({
  title = "Options & Tradeoffs",
  ...props
}: React.ComponentProps<typeof AccordionSection>) {
  return <AccordionSection {...props} title={title} value="tradeoffs" />;
}

const components = {
  Concept,
  IndustryExample,
  Tradeoffs,
  Pitfall,
  CodeWalkthrough,
  LearnMore,
  PerplexityLink,
};

export function useMDXComponents() {
  return components;
}
