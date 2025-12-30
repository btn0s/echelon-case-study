import type { MDXComponents } from "mdx/types";
import { Concept } from "@/components/mdx/concept";
import { IndustryExample } from "@/components/mdx/industry-example";
import { Tradeoffs } from "@/components/mdx/tradeoffs";
import { Pitfall } from "@/components/mdx/pitfall";
import { CodeWalkthrough } from "@/components/mdx/code-walkthrough";
import { LearnMore } from "@/components/mdx/learn-more";

const components: MDXComponents = {
  Concept,
  IndustryExample,
  Tradeoffs,
  Pitfall,
  CodeWalkthrough,
  LearnMore,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
