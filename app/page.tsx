import type { Metadata } from "next";
import Link from "next/link";
import { POCS } from "@/lib/pocs";
import { QUESTIONS } from "@/lib/caseStudy/questions";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Echelon: A Game Design Case Study",
  description:
    "Nine prototypes, one game. A case study in breaking down a complex multiplayer game into answerable design questions.",
  openGraph: {
    title: "Echelon: A Game Design Case Study",
    description:
      "Nine prototypes. One game. Breaking down a complex design problem into answerable questions.",
  },
};

export default function HomePage() {
  const totalQuestions = QUESTIONS.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
          {/* Header */}
          <header>
            <h1 className="text-balance">
              Echelon: A Game Design Case Study
            </h1>
            <p className="text-lg text-muted-foreground">
              Nine prototypes. One game. Breaking down a complex design problem
              into answerable questions.
            </p>
          </header>

          <section>
            <h2>The Game</h2>
            <p>
              Echelon is a co-op heist game. You and a partner are corporate
              mercenaries in a megacity where superheroes work for the highest
              bidder. Go quiet and stay safe, or go loud and get rich. The
              walls aren&apos;t obstacles—they&apos;re shortcuts you can blow
              open, if you&apos;re willing to pay the price.
            </p>
            <p>
              Make too much noise and a superpowered enforcer crashes through.
              Every tool costs money. Every noise draws attention. Three failed
              missions and you&apos;re fired. It&apos;s a game about desperate
              improvisation.
            </p>
            <div className="not-prose mt-4">
              <Link
                href="/docs/gdd"
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 hover:underline"
              >
                Read the full GDD <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </section>

          <section>
            <h2>The Approach</h2>
            <p>
              Physics destruction, AI guards, economic pressure, cooperative
              objectives—each system depends on the others. I wrote{" "}
              {totalQuestions} design questions and broke them into nine core
              prototypes. Each POC answers a subset of questions. Together, they
              show how the systems interact.
            </p>
          </section>

          <section>
            <h2>The Prototypes</h2>
            <div className="flex flex-col gap-6 not-prose mt-6">
              {POCS.map((poc, index) => {
                const parts = poc.parts ?? [];
                const isComingSoon = parts.length === 0 && poc.status === "pending";
                const fallbackPart = { title: poc.title, href: `/poc/${poc.slug}` };

                return (
                  <div key={poc.id} className="border-b pb-4">
                    <p className="text-sm font-medium">
                      {String(index + 1).padStart(2, "0")}. {poc.keyQuestion}
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      {isComingSoon ? (
                        <div className="inline-flex items-center justify-between gap-3 rounded-md px-2 py-1 text-sm text-muted-foreground opacity-70">
                          <span>Coming soon</span>
                        </div>
                      ) : (
                        (parts.length ? parts : [fallbackPart]).map(
                          (part, partIndex) => (
                            <Link
                              key={part.href}
                              href={part.href}
                              className="group inline-flex items-center justify-between gap-3 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                            >
                              <span>
                                Part {partIndex + 1} — {part.title}
                              </span>
                              <ArrowUpRight className="size-4 shrink-0" />
                            </Link>
                          )
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <nav className="not-prose flex items-center justify-between border-t pt-8 mt-12">
            <div />
            <Link
              href={
                POCS[0]?.parts?.[0]?.href ??
                `/poc/${POCS[0]?.slug || ""}`
              }
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Start reading</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
