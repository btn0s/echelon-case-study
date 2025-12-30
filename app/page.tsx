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
            <h1>Echelon: A Case Study in AI-Assisted Game Development</h1>
            <p>
              Building a co-op heist game by designing the post-mortem first
            </p>

            <div className="flex gap-3 flex-wrap not-prose">
              <Link
                href={`/poc/${POCS[0]?.slug || ""}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                <Button variant="outline" size="sm">
                  Start Reading{" "}
                  <ArrowUpRight className="size-3 text-muted-foreground" />
                </Button>
              </Link>
              <Link
                href="/docs/gdd"
                className="text-sm font-medium text-primary hover:underline"
              >
                <Button variant="outline" size="sm">
                  View GDD{" "}
                  <ArrowUpRight className="size-3 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </header>

          <section>
            <h2>The Prompt</h2>
            <p>
              What if you wrote the case study before building the project? We
              designed an ideal validation framework upfront—the structure
              we&apos;d want in a post-mortem—then used it to guide AI-assisted
              development. This documents the process and the game.
            </p>
          </section>

          {/* Overview */}
          <section>
            <h2>The Problem</h2>

            <p>
              A multiplayer co-op heist game is a tangle of interconnected
              problems: physics destruction that syncs across clients, AI that
              responds to player noise, economic systems that create real
              tension, and cooperative objectives that demand actual teamwork.
            </p>
            <p>
              The usual approach—build everything, hope it works—fails hard. It
              fails harder with AI assistance, because effective collaboration
              requires clear structure. Without it, you&apos;re just prompting
              in circles.
            </p>
            <p>
              So we flipped the process. Instead of building first and
              documenting later, we asked:
              <strong> What would the ideal post-mortem look like?</strong> What
              questions would we wish we&apos;d asked upfront? We designed that
              structure first—{totalQuestions} critical questions, nine discrete
              prototypes—and used it as our guide.
            </p>
            <p>This documents what happened.</p>
          </section>

          {/* Game Overview */}
          <section>
            <h2>The Game</h2>
            <p>
              Payday meets Tarkov, but the cops are superheroes. Careful plans
              meet cartoon physics. Desperate people make impossible choices.
            </p>
            <p>
              You&apos;re an Operator from the Echelon Group—corporate
              mercenaries in a fractured megacity. Every job sounds simple: get
              in, hit objectives, get out. The dilemma is always the same:
              <strong> quiet and safe, or loud and profitable?</strong>
            </p>
            <p>
              Every tool costs money you can&apos;t afford to lose. Every noise
              draws attention you can&apos;t afford. Three strikes and
              you&apos;re fired—new operator, empty wallet, start over.
            </p>
            <p>The systems we needed to prove:</p>
            <ul>
              <li>
                <strong>Destruction as Strategy</strong> — Environment as
                toolkit, not backdrop
              </li>
              <li>
                <strong>Heat as Consequence</strong> — Escalating tension
                without frustration
              </li>
              <li>
                <strong>Dynamic Co-op Objectives</strong> — Real cooperation,
                not parallel solo play
              </li>
              <li>
                <strong>Economic Pressure</strong> — Interesting choices, not
                just annoyance
              </li>
            </ul>
          </section>

          {/* Methodology */}
          <section>
            <h2>The Approach</h2>
            <p>
              Before writing code, we wrote the questions. What would we wish
              we&apos;d validated before building? What would we want a
              post-mortem to cover? We identified {totalQuestions} critical
              questions spanning core loops, design pillars, and system
              interactions. That became our validation framework.
            </p>
            <p>
              Then we mapped those questions to prototypes. Each POC isolates
              one risky assumption. Each has one job: prove that a specific
              mechanic is solvable—and fun. The questions give each prototype
              clear success criteria.
            </p>
            <p>
              This structure makes AI collaboration work. With explicit
              questions and a consistent template—
              <strong>Hypothesis → Experiment → Results → Decision</strong>—the
              AI has context. It can maintain consistency across sessions. It
              knows what we&apos;re actually trying to prove.
            </p>
            <p>
              We document as we go. Each prototype stands alone. Together, they
              show what Echelon could be and what we learned building it—about
              the game and about the process.
            </p>
          </section>

          {/* Journey */}
          <section>
            <h2>Nine Prototypes</h2>
            <p>
              Each POC answers specific questions from the validation framework.
              Click through for the details—what we tried, what worked, what
              didn&apos;t.
            </p>
            <div className="flex flex-col gap-4">
              {POCS.map((poc) => (
                <div key={poc.id} className="not-prose">
                  <Link
                    key={poc.id}
                    href={`/poc/${poc.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    POC {poc.id}: {poc.title}
                  </Link>
                  {poc.keyQuestion && (
                    <p className="text-sm text-muted-foreground">
                      {poc.keyQuestion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
