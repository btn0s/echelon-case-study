import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Roadmap | Echelon Case Study",
  description: "Detailed development strategy and POC breakdown for Echelon",
};

export default async function RoadmapPage() {
  const roadmapPath = join(process.cwd(), ".cursor", "plans", "echelon_strategic_roadmap.md");
  const roadmapContent = readFileSync(roadmapPath, "utf-8");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Study
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Strategic Roadmap</h1>
          <p className="text-sm text-muted-foreground">
            Detailed development strategy and POC breakdown
          </p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={roadmapContent} />
        </div>
      </div>
    </div>
  );
}
