import type { Metadata } from "next";
import Link from "next/link";
import { POCS } from "@/lib/pocs";
import { QUESTIONS } from "@/lib/caseStudy/questions";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Building a Co-op Heist Game by Designing the Post-Mortem First",
  description:
    "A case study in AI-assisted game development. Nine prototypes, one game: how we built Echelon by asking the right questions first.",
  openGraph: {
    title: "Echelon Case Study",
    description:
      "Building a co-op heist game by designing the post-mortem first. A case study in AI-assisted game development.",
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
              Building a co-op heist game by designing the post-mortem first
            </h1>
            <p className="text-lg text-muted-foreground">
              A case study in AI-assisted game development
            </p>
          </header>

          <section>
            <p>
              A multiplayer co-op heist game is a tangle of interconnected
              problems: physics destruction that syncs across clients, AI that
              responds to noise, economic pressure, cooperative objectives. The
              usual approach—build everything, hope it works—fails hard. It
              fails harder with AI assistance, because effective AI
              collaboration requires clear structure.
            </p>
            <p>
              So we flipped the process. Instead of building first and
              documenting later, we asked:{" "}
              <strong>What would the ideal post-mortem look like?</strong> We
              designed that structure first—{totalQuestions} critical questions,
              nine discrete prototypes—and used it as our guide. This documents
              what happened.
            </p>
          </section>

          <section>
            <h2>The Game</h2>
            <p>
              Echelon is a co-op heist game where you and a partner are
              corporate mercenaries in a megacity where superheroes work for the
              highest bidder. Every job presents the same dilemma: go quiet and
              stay safe, or go loud and get rich. The walls aren&apos;t
              obstacles—they&apos;re shortcuts you can blow open, if you&apos;re
              willing to pay the price. Make too much noise and a superpowered
              enforcer crashes through to stop you.
            </p>
            <p>
              Every tool costs money you can&apos;t afford to lose. Every noise
              draws attention you can&apos;t afford. Three failed missions and
              you&apos;re fired—new operator, empty wallet, start over. It&apos;s
              a game about desperate improvisation: the moment your careful plan
              meets chaotic physics and you have to decide what to do next.
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
              Before writing code, we wrote the questions. {totalQuestions}{" "}
              critical questions spanning core loops, design pillars, and system
              interactions. Then we mapped them to prototypes. Each POC isolates
              one risky assumption. Each has one job: prove that a specific
              mechanic is solvable—and fun.
            </p>

            <b>Problem &rarr; Options &rarr; Implementation &rarr; Results</b>

            {/* <code className="bg-foreground text-background w-full h-24 flex items-center justify-center before:content-[''] after:content-['']">
              Problem &rarr; Options &rarr; Implementation &rarr; Results
            </code> */}

            <p>
              This structure makes AI collaboration work. With explicit
              questions and a consistent template, the AI has context. It knows
              what we&apos;re trying to prove. Each POC stands alone. Together,
              they show what we learned building Echelon.
            </p>
          </section>

          <section>
            <h2>Nine Prototypes</h2>
            <p>
              Starting with multiplayer networking, then layering destruction,
              heat, AI, objectives, economy, and boss encounters. The last POC
              brings it all together.
            </p>
            <div className="flex flex-col gap-2 not-prose mt-6">
              {POCS.map((poc) => (
                <Link
                  key={poc.id}
                  href={`/poc/${poc.slug}`}
                  className="group block pb-3 hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-1 group-hover:underline">
                      {poc.title}
                      <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </span>
                    {poc.keyQuestion && (
                      <p className="text-xs text-muted-foreground">
                        {poc.keyQuestion}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <nav className="not-prose flex items-center justify-between border-t pt-8 mt-12">
            <div />
            <Link
              href={`/poc/${POCS[0]?.slug || ""}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{POCS[0]?.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
