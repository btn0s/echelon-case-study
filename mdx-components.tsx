import { Concept } from "@/components/mdx/concept";
import { IndustryExample } from "@/components/mdx/industry-example";
import { Tradeoffs } from "@/components/mdx/tradeoffs";
import { Pitfall } from "@/components/mdx/pitfall";
import { CodeWalkthrough } from "@/components/mdx/code-walkthrough";
import { LearnMore } from "@/components/mdx/learn-more";
import { PerplexityLink } from "@/components/mdx/perplexity-link";

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
