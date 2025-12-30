import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Design Document | Echelon Case Study",
  description: "Complete game design document outlining core mechanics, systems, and vision for Echelon",
};

export default async function GDDPage() {
  const gddPath = join(process.cwd(), "GDD.md");
  const gddContent = readFileSync(gddPath, "utf-8");

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
          <h1 className="text-4xl font-bold mb-2">Game Design Document</h1>
          <p className="text-sm text-muted-foreground">
            Complete game design document outlining core mechanics, systems, and vision
          </p>
        </header>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={gddContent} />
        </div>
      </div>
    </div>
  );
}
