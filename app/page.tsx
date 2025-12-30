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
            <h1>What if you wrote the case study before building the project?</h1>
            <p className="text-lg text-muted-foreground">
              Building a co-op heist game by designing the post-mortem first
            </p>
          </header>

          <section>
            <p>
              A multiplayer co-op heist game is a tangle of interconnected problems: physics destruction that syncs across clients, AI that responds to player noise, economic systems that create real tension, and cooperative objectives that demand actual teamwork. The usual approach—build everything, hope it works—fails hard. It fails harder with AI assistance, because effective collaboration requires clear structure. Without it, you&apos;re just prompting in circles.
            </p>
            <p>
              So we flipped the process. Instead of building first and documenting later, we asked: <strong>What would the ideal post-mortem look like?</strong> What questions would we wish we&apos;d asked upfront? We designed that structure first—{totalQuestions} critical questions, nine discrete prototypes—and used it as our guide.
            </p>
            <p>
              This documents what happened. Each POC is a self-contained case study that walks through the problem, explores the options, shows the implementation, and explains what we learned. You&apos;ll learn how multiplayer networking actually works, how to sync physics destruction across clients, how simple AI state machines create emergent behavior, and how to structure validation questions before writing code.
            </p>
          </section>

          <section>
            <h2>The Game</h2>
            <p>
              Payday meets Tarkov, but the cops are superheroes. Careful plans meet cartoon physics. Desperate people make impossible choices.
            </p>
            <p>
              You&apos;re an Operator from the Echelon Group—corporate mercenaries in a fractured megacity. Every job sounds simple: get in, hit objectives, get out. The dilemma is always the same: <strong>quiet and safe, or loud and profitable?</strong> Every tool costs money you can&apos;t afford to lose. Every noise draws attention you can&apos;t afford. Three strikes and you&apos;re fired—new operator, empty wallet, start over.
            </p>
            <p>
              The environment isn&apos;t backdrop—it&apos;s your toolkit. Destruction creates shortcuts and escape routes, but it&apos;s loud and expensive. Heat escalates with every noise, bringing more guards and eventually a Super encounter. Objectives require real cooperation, not parallel solo play. Economic pressure forces meaningful choices between gear and survival.
            </p>
            <div className="not-prose mt-4">
              <Link href="/docs/gdd">
                <Button variant="outline" size="sm">
                  View GDD{" "}
                  <ArrowUpRight className="size-3 ml-1" />
                </Button>
              </Link>
            </div>
          </section>

          <section>
            <h2>The Approach</h2>
            <p>
              Before writing code, we wrote the questions. What would we wish we&apos;d validated before building? What would we want a post-mortem to cover? We identified {totalQuestions} critical questions spanning core loops, design pillars, and system interactions. That became our validation framework.
            </p>
            <p>
              Then we mapped those questions to prototypes. Each POC isolates one risky assumption. Each has one job: prove that a specific mechanic is solvable—and fun. The questions give each prototype clear success criteria. This structure makes AI collaboration work. With explicit questions and a consistent template—<strong>Hypothesis → Experiment → Results → Decision</strong>—the AI has context. It can maintain consistency across sessions. It knows what we&apos;re actually trying to prove.
            </p>
            <p>
              We document as we go. Each prototype stands alone. Together, they show what Echelon could be and what we learned building it—about the game and about the process. Each POC follows the same structure: we explain the problem and why it&apos;s hard, explore the options with industry context, show what we built and how, and document what we learned.
            </p>
          </section>

          <section>
            <h2>Nine Prototypes</h2>
            <p>
              Each POC answers specific questions from the validation framework. We start with multiplayer networking—the foundation everything else depends on. Then we add destruction, heat systems, AI guards, cooperative objectives, economic pressure, Super encounters, and finally mission flow. The last POC brings it all together.
            </p>
            <div className="flex flex-col gap-3 not-prose mt-6">
              {POCS.map((poc) => (
                <Link
                  key={poc.id}
                  href={`/poc/${poc.slug}`}
                  className="group block border-b border-border pb-3 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">
                          POC {poc.id}
                        </span>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {poc.title}
                        </span>
                      </div>
                      {poc.keyQuestion && (
                        <p className="text-sm text-muted-foreground">
                          {poc.keyQuestion}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="not-prose mt-12 pt-8">
            <div className="flex justify-end">
              <Link href={`/poc/${POCS[0]?.slug || ""}`}>
                <Button variant="default" size="sm">
                  Start Reading{" "}
                  <ArrowUpRight className="size-3 ml-1" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
