import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POCS } from "@/lib/pocs";
import {
  QUESTIONS,
  getQuestionsByCategory,
  getQuestionsByPillar,
  type Question,
} from "@/lib/caseStudy/questions";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const completedCount = POCS.filter((poc) => poc.status === "complete").length;
  const inProgressCount = POCS.filter(
    (poc) => poc.status === "in-progress"
  ).length;
  const totalPOCs = POCS.length;
  const progressPercentage = Math.round((completedCount / totalPOCs) * 100);

  // Calculate question coverage
  const answeredQuestions = new Set<string>();
  POCS.forEach((poc) => {
    if (poc.status === "complete" && poc.questionIds) {
      poc.questionIds.forEach((qId) => answeredQuestions.add(qId));
    }
  });
  const totalQuestions = QUESTIONS.length;
  const answeredCount = answeredQuestions.size;
  const questionCoveragePercentage = Math.round(
    (answeredCount / totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-12 mx-auto px-4 py-16 max-w-4xl [&>header]:prose [&>header]:prose-sm [&>section]:prose [&>section]:prose-sm">
        {/* Header */}
        <header>
          <h1>Echelon: A Case Study in AI-Assisted Game Development</h1>
          <p>Building a co-op heist game by designing the post-mortem first</p>
          <p>
            What if you wrote the case study before building the project? We
            designed an ideal validation framework upfront—the structure we'd
            want in a post-mortem—then used it to guide AI-assisted development.
            This documents the process and the game.
          </p>
          <div className="flex gap-2 flex-wrap mb-6 not-prose">
            <Badge variant="outline">AI-Assisted Development</Badge>
            <Badge variant="outline">Strategic Planning</Badge>
            <Badge variant="outline">React Three Fiber</Badge>
            <Badge variant="outline">Next.js</Badge>
          </div>
          <div className="flex gap-3 flex-wrap not-prose">
            <Link
              href={`/poc/${POCS[0]?.slug || ""}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Start Reading <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gdd"
              className="text-sm font-medium text-primary hover:underline"
            >
              View GDD <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

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
              requires clear structure. Without it, you're just prompting in
              circles.
            </p>
            <p>
              So we flipped the process. Instead of building first and
              documenting later, we asked:
              <strong> What would the ideal post-mortem look like?</strong> What
              questions would we wish we'd asked upfront? We designed that
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
              You're an Operator from the Echelon Group—corporate mercenaries in
              a fractured megacity. Every job sounds simple: get in, hit
              objectives, get out. The dilemma is always the same:
              <strong> quiet and safe, or loud and profitable?</strong>
            </p>
            <p>
              Every tool costs money you can't afford to lose. Every noise draws
              attention you can't afford. Three strikes and you're fired—new
              operator, empty wallet, start over.
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
              we'd validated before building? What would we want a post-mortem
              to cover? We identified {totalQuestions} critical questions
              spanning core loops, design pillars, and system interactions. That
              became our validation framework.
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
              knows what we're actually trying to prove.
            </p>
            <p>
              We document as we go. Each prototype stands alone. Together, they
              show what Echelon could be and what we learned building it—about
              the game and about the process.
            </p>
        </section>

        {/* Progress & Journey */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Progress & Journey</h2>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Overall Progress
                    </span>
                    <span className="font-medium">
                      {completedCount} / {totalPOCs} Complete
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span>
                        {totalPOCs - completedCount - inProgressCount} Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{inProgressCount} In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60" />
                      <span>{completedCount} Complete</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Nine Prototypes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Each POC answers specific questions from the validation framework.
              Click through for the details—what we tried, what worked, what
              didn't.
            </p>
            <div className="grid gap-6">
              {POCS.map((poc) => (
                <Card key={poc.id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>
                        POC {poc.id}: {poc.title}
                      </CardTitle>
                      <Badge
                        variant={
                          poc.status === "pending" ? "secondary" : "default"
                        }
                      >
                        {poc.status}
                      </Badge>
                    </div>
                    <CardDescription>{poc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {poc.keyQuestion && (
                      <div className="mb-4 p-3 bg-muted/50 rounded-md border-l-2 border-primary">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">
                          Key Question:
                        </p>
                        <p className="text-sm font-medium">{poc.keyQuestion}</p>
                      </div>
                    )}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Focus Areas:
                      </p>
                      <p className="text-sm">{poc.focus}</p>
                    </div>
                    {poc.gddMapping && poc.gddMapping.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          GDD References:
                        </p>
                        <ul className="list-disc pl-6 space-y-0.5 text-xs text-muted-foreground">
                          {poc.gddMapping.slice(0, 2).map((mapping, idx) => (
                            <li key={idx}>{mapping}</li>
                          ))}
                          {poc.gddMapping.length > 2 && (
                            <li className="text-muted-foreground/70">
                              +{poc.gddMapping.length - 2} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    <Link
                      href={`/poc/${poc.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View POC Documentation →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Question Coverage Dashboard */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">
            The Validation Framework
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            The questions we designed upfront. Each represents something we need
            to validate before committing to full production—and gives the AI
            clear context for what we're trying to prove.
          </p>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Questions Answered
                  </span>
                  <span className="font-medium">
                    {answeredCount} / {totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${questionCoveragePercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Questions are marked answered when their POC is complete.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Loop Questions</CardTitle>
                <CardDescription>
                  {getQuestionsByCategory("core-loop").length} questions about
                  mission flow and player experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {getQuestionsByCategory("core-loop")
                    .slice(0, 4)
                    .map((q) => {
                      const isAnswered = answeredQuestions.has(q.id);
                      const poc = POCS.find((p) =>
                        p.questionIds?.includes(q.id)
                      );
                      return (
                        <li key={q.id} className="flex items-start gap-2">
                          <span
                            className={
                              isAnswered
                                ? "text-green-500"
                                : "text-muted-foreground"
                            }
                          >
                            {isAnswered ? "✓" : "○"}
                          </span>
                          <span
                            className={
                              isAnswered ? "" : "text-muted-foreground"
                            }
                          >
                            {q.text}
                            {poc && (
                              <span className="text-xs text-muted-foreground ml-2">
                                (POC {poc.id})
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                </ul>
                {getQuestionsByCategory("core-loop").length > 4 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    +{getQuestionsByCategory("core-loop").length - 4} more
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pillar Questions</CardTitle>
                <CardDescription>
                  {getQuestionsByCategory("pillar").length} questions about core
                  design pillars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {(
                    [
                      "desperation",
                      "consequence",
                      "cooperation",
                      "chaos",
                      "stakes",
                    ] as const
                  ).map((pillar) => {
                    const pillarQuestions = getQuestionsByPillar(pillar);
                    if (pillarQuestions.length === 0) return null;
                    const answered = pillarQuestions.filter((q) =>
                      answeredQuestions.has(q.id)
                    ).length;
                    return (
                      <div key={pillar}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium capitalize">
                            {pillar}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {answered} / {pillarQuestions.length}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full"
                            style={{
                              width: `${Math.round(
                                (answered / pillarQuestions.length) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Reference</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Game Design Document</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The full vision: mechanics, systems, tone
                </p>
                <Link
                  href="/gdd"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View GDD →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Strategic Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Development strategy and POC breakdown
                </p>
                <Link
                  href="/roadmap"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Roadmap →
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>System Mapping</CardTitle>
              <CardDescription>How GDD systems map to POCs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Core Systems</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      Destruction →{" "}
                      <Link
                        href="/poc/1-destruction-multiplayer"
                        className="text-primary hover:underline"
                      >
                        POC 1
                      </Link>
                    </li>
                    <li>
                      Heat →{" "}
                      <Link
                        href="/poc/2-heat-system"
                        className="text-primary hover:underline"
                      >
                        POC 2
                      </Link>
                    </li>
                    <li>
                      Co-op Objectives →{" "}
                      <Link
                        href="/poc/4-coop-objectives"
                        className="text-primary hover:underline"
                      >
                        POC 4
                      </Link>
                    </li>
                    <li>
                      Economy →{" "}
                      <Link
                        href="/poc/5-economy"
                        className="text-primary hover:underline"
                      >
                        POC 5
                      </Link>
                    </li>
                    <li>
                      Super Encounters →{" "}
                      <Link
                        href="/poc/6-super"
                        className="text-primary hover:underline"
                      >
                        POC 6
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Supporting</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      Multiplayer →{" "}
                      <Link
                        href="/poc/0-multiplayer-foundation"
                        className="text-primary hover:underline"
                      >
                        POC 0
                      </Link>
                    </li>
                    <li>
                      AI Guards →{" "}
                      <Link
                        href="/poc/3-ai-guards"
                        className="text-primary hover:underline"
                      >
                        POC 3
                      </Link>
                    </li>
                    <li>
                      Mission Flow →{" "}
                      <Link
                        href="/poc/7-mission-flow"
                        className="text-primary hover:underline"
                      >
                        POC 7
                      </Link>
                    </li>
                    <li>
                      Integration →{" "}
                      <Link
                        href="/poc/integration"
                        className="text-primary hover:underline"
                      >
                        POC 8
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
