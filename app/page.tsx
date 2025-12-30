import Link from "next/link";
import { POCS } from "@/lib/pocs";
import { QUESTIONS } from "@/lib/caseStudy/questions";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              Payday meets Tarkov, but the cops are superheroes. You&apos;re
              corporate mercenaries in a fractured megacity. Every job sounds
              simple: get in, hit objectives, get out. The dilemma:{" "}
              <strong>quiet and safe, or loud and profitable?</strong>
            </p>
            <p>
              Every tool costs money you can&apos;t afford to lose. Every noise
              draws attention you can&apos;t afford. The environment isn&apos;t
              backdrop—it&apos;s your toolkit. Three strikes and you&apos;re
              fired.
            </p>
            <div className="not-prose mt-4">
              <Link
                href="/docs/gdd"
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 hover:underline"
              >
                View GDD <ArrowUpRight className="size-3" />
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

          <section className="not-prose mt-12 pt-8">
            <div className="flex justify-end">
              <Link href={`/poc/${POCS[0]?.slug || ""}`}>
                <Button variant="default" size="sm">
                  Start Reading <ArrowUpRight className="size-3 ml-1" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
