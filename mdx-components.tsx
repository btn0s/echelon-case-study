import { AccordionSection } from "@/components/mdx/accordion-section";
import { Alert } from "@/components/mdx/alert";
import { PerplexityLink } from "@/components/mdx/perplexity-link";
import type { ComponentProps } from "react";

const components = {
  AccordionSection,
  Alert,
  PerplexityLink,
  a: ({ href, ...props }: ComponentProps<"a">) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  ),
};

export function useMDXComponents() {
  return components;
}
