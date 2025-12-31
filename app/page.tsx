import type { Metadata } from "next";
import Link from "next/link";
import { POCS } from "@/lib/pocs";
import { QUESTIONS } from "@/lib/caseStudy/questions";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Designing Echelon: A Co-op Heist Game Case Study",
  description:
    "How I designed a multiplayer co-op heist game with physics destruction, AI guards, and economic pressure. Nine prototypes, one game.",
  openGraph: {
    title: "Echelon Case Study",
    description:
      "A case study in designing a multiplayer co-op heist game. How I solved physics sync, AI behavior, and cooperative objectives.",
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
              Designing Echelon: A co-op heist game case study
            </h1>
            <p className="text-lg text-muted-foreground">
              How I designed a multiplayer game with physics destruction, AI
              guards, and economic pressure
            </p>
          </header>

          <section>
            <h2>The Game</h2>
            <p>
              Echelon is a co-op heist game where you and a partner are
              corporate mercenaries in a megacity where superheroes work for the
              highest bidder. Every job presents the same dilemma: go quiet and
              stay safe, or go loud and get rich. The walls aren&apos;t
              obstacles—they&apos;re shortcuts you can blow open, if you&apos;re
              willing to pay the price.
            </p>
            <p>
              Make too much noise and a superpowered enforcer crashes through to
              stop you. Every tool costs money you can&apos;t afford to lose.
              Every noise draws attention you can&apos;t afford. Three failed
              missions and you&apos;re fired—new operator, empty wallet, start
              over.
            </p>
            <p>
              It&apos;s a game about desperate improvisation: the moment your
              careful plan meets chaotic physics and you have to decide what to
              do next.
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
            <h2>The Design Challenge</h2>
            <p>
              A multiplayer co-op heist game needs physics destruction that syncs
              across clients, AI that responds to noise, economic pressure, and
              cooperative objectives—all at once. Each system depends on the
              others. Get one wrong, and the whole experience breaks down.
            </p>
            <p>
              My usual approach is to break problems down into small questions
              with small answers. Each question becomes a prototype. Each
              prototype proves one thing works—and works well.
            </p>
            <p>
              Game design is a stress test of this process. Unlike linear UX
              flows or common interface problems, systems interact. Physics
              destruction affects heat. Heat affects AI behavior. AI behavior
              affects economic pressure. Each system depends on the others.
            </p>
            <p>
              I can prototype in isolation, but I need to know which isolated
              prototypes will actually answer what I need to know about how these
              systems interact. Which questions matter? Which prototypes will
              reveal the right answers? I didn't want to waste time building the
              wrong things.
            </p>
          </section>

          <section>
            <h2>How I Designed It</h2>
            <p>
              When using AI, context management is critical. I decided to do an
              experiment: do all the design work and research ahead of time.
              Document it all as if this is the ideal case study and it's done
              already. Then build prototypes to test it.
            </p>
            <p>
              This approach helps me learn about what I'm building and think
              through things. While I'm writing, AI assists and helps me explore
              ideas. Later, when I'm implementing, AI has the full context.
              Effectively, I'm writing a tutorial for myself.
            </p>
            <p>
              I wrote {totalQuestions} critical questions spanning core loops,
              design pillars, and system interactions. I mapped them to
              prototypes. Each POC follows the same structure:{" "}
              <strong>
                Problem &rarr; Options &rarr; Implementation &rarr; Results
              </strong>
              .
            </p>
            <p>
              This consistency enabled AI collaboration. With explicit questions
              and a clear template, the AI had context. It knew what I was trying
              to prove. Each POC stands alone. Together, they show how I
              designed Echelon.
            </p>
          </section>

          <section>
            <h2>Nine Design Prototypes</h2>
            <p>
              I built multiplayer networking first—the foundation everything
              else depends on. Then I added destruction, heat, AI, objectives,
              economy, and boss encounters, each building on what came before.
              The final POC integrates them all to see how the systems work
              together.
            </p>
            <p>Each prototype answers a design question.</p>
            <div className="flex flex-col gap-2 not-prose mt-6">
              {POCS.map((poc, index) => (
                <Link
                  key={poc.id}
                  href={`/poc/${poc.slug}`}
                  className="group block pb-3 hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    {poc.keyQuestion && (
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {String(index + 1).padStart(2, "0")}. {poc.keyQuestion}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      {poc.title}
                      <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </span>
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
