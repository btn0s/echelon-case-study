import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POCS } from "@/lib/pocs";

export default function HomePage() {
  const completedCount = POCS.filter((poc) => poc.status === "complete").length;
  const inProgressCount = POCS.filter((poc) => poc.status === "in-progress").length;
  const totalPOCs = POCS.length;
  const progressPercentage = Math.round((completedCount / totalPOCs) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Echelon: A Case Study in Strategic Prototyping</h1>
          <p className="text-sm text-muted-foreground mb-4">
            How we validated a co-op heist game's core mechanics through discrete Proof of Concept prototypes—and what we learned along the way
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">React Three Fiber</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Multiplayer</Badge>
            <Badge variant="outline">Game Development</Badge>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">The Problem</h2>
          <div className="space-y-3 text-sm">
            <p>
              Building a multiplayer co-op heist game means solving dozens of interconnected problems:
              physics-based destruction that syncs across clients, AI that responds to player noise,
              economic systems that create meaningful choices, and cooperative objectives that actually
              require teamwork—not just parallel solo play.
            </p>
            <p>
              The traditional approach? Build everything at once, hope it works, and discover fundamental
              issues months into development. We chose a different path: validate each risky assumption
              in isolation before committing to the full game.
            </p>
            <p>
              This case study documents our journey through nine Proof of Concept prototypes, each designed
              to answer a specific question: <em>Does this mechanic actually work?</em>
            </p>
          </div>
        </section>

        {/* Game Overview */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">The Vision</h2>
          <Card>
            <CardHeader>
              <CardTitle>Echelon: Payday Meets Tarkov, But the Cops Are Superheroes</CardTitle>
              <CardDescription>
                Co-op heist game where careful plans meet cartoon physics and desperate people make impossible choices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm">
                You're Operators from the Echelon Group—corporate mercenaries taking contracts in a fractured megacity.
                Every job is simple on paper: get in, complete objectives, get out. But your squad faces a constant
                dilemma: <strong>quiet and safe, or loud and profitable?</strong>
              </p>
              <p className="mb-3 text-sm">
                Every tool costs money you can't afford to lose. Every noise draws attention you can't afford to get.
                Fail three missions? You're fired. New operator, empty wallet, start over.
              </p>
              <div className="mt-3 space-y-1.5">
                <h4 className="text-sm font-semibold">Four Core Systems We Had to Prove:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>
                    <strong>Destruction as Strategy</strong> — Can we make the environment feel like a toolkit, not
                    just backdrop?
                  </li>
                  <li>
                    <strong>Heat as Consequence</strong> — Does escalating tension create pressure without frustration?
                  </li>
                  <li>
                    <strong>Dynamic Co-op Objectives</strong> — Do objectives create real cooperation, or just parallel
                    solo tasks?
                  </li>
                  <li>
                    <strong>Economic Pressure</strong> — Can credit constraints create interesting choices, not just
                    annoyance?
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Our Approach</h2>
          <div className="space-y-3 text-sm">
            <p>
              Rather than building the full game and hoping everything works together, we isolated each risky
              assumption into its own prototype. Each POC has one job: prove that a specific mechanic or
              technical challenge is solvable—and fun.
            </p>
            <p>
              This isn't just about technical validation. It's about answering questions like: <em>Does heat
              create tension or frustration? Do co-op objectives actually require cooperation? Can economic
              pressure feel meaningful, not punitive?</em>
            </p>
            <p>
              Each prototype stands alone as a demonstrable proof of concept. Together, they form a complete
              picture of what Echelon could be—and what we learned building it.
            </p>
          </div>
        </section>

        {/* GDD System Mapping */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">How GDD Systems Map to Prototypes</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Systems → POCs</CardTitle>
              <CardDescription>
                Each POC validates specific systems and mechanics from the Game Design Document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Core Systems</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      <strong>Destruction as Strategy</strong> →{" "}
                      <Link href="/poc/1-destruction-multiplayer" className="text-primary hover:underline">
                        POC 1
                      </Link>
                    </li>
                    <li>
                      <strong>Heat as Consequence</strong> →{" "}
                      <Link href="/poc/2-heat-system" className="text-primary hover:underline">
                        POC 2
                      </Link>
                    </li>
                    <li>
                      <strong>Dynamic Co-op Objectives</strong> →{" "}
                      <Link href="/poc/4-coop-objectives" className="text-primary hover:underline">
                        POC 4
                      </Link>
                    </li>
                    <li>
                      <strong>Economic Pressure</strong> →{" "}
                      <Link href="/poc/5-economy" className="text-primary hover:underline">
                        POC 5
                      </Link>
                    </li>
                    <li>
                      <strong>Super Encounters</strong> →{" "}
                      <Link href="/poc/6-super" className="text-primary hover:underline">
                        POC 6
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Supporting Systems</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      <strong>Multiplayer Foundation</strong> →{" "}
                      <Link href="/poc/0-multiplayer-foundation" className="text-primary hover:underline">
                        POC 0
                      </Link>{" "}
                      (enables everything)
                    </li>
                    <li>
                      <strong>AI Guards</strong> →{" "}
                      <Link href="/poc/3-ai-guards" className="text-primary hover:underline">
                        POC 3
                      </Link>{" "}
                      (responds to Heat)
                    </li>
                    <li>
                      <strong>Mission Flow</strong> →{" "}
                      <Link href="/poc/7-mission-flow" className="text-primary hover:underline">
                        POC 7
                      </Link>{" "}
                      (integrates all systems)
                    </li>
                    <li>
                      <strong>Integration & Polish</strong> →{" "}
                      <Link href="/poc/integration" className="text-primary hover:underline">
                        POC 8
                      </Link>{" "}
                      (complete demo)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Progress Overview */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Progress Overview</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
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
                    <span>{totalPOCs - completedCount - inProgressCount} Pending</span>
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
        </section>

        {/* POC Roadmap */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">The Journey: Nine Prototypes, Nine Questions</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each POC answers a specific question. Click through to see what we learned—and what surprised us.
          </p>
          <div className="grid gap-6">
            {POCS.map((poc) => (
              <Card key={poc.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle>
                      POC {poc.id}: {poc.title}
                    </CardTitle>
                    <Badge variant={poc.status === "pending" ? "secondary" : "default"}>
                      {poc.status}
                    </Badge>
                  </div>
                  <CardDescription>{poc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {poc.keyQuestion && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-md border-l-2 border-primary">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Key Question:</p>
                      <p className="text-sm font-medium">{poc.keyQuestion}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Focus Areas:</p>
                    <p className="text-sm">{poc.focus}</p>
                  </div>
                  {poc.gddMapping && poc.gddMapping.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">GDD References:</p>
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
        </section>

        {/* Key Questions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Key Questions We're Answering</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Technical Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Which physics engine handles multiplayer destruction best?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>How do we sync destruction state reliably across clients?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>What pathfinding approach works best for AI guards?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Can we achieve acceptable performance with 6+ guards?</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Design Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Does heat escalation feel fair or frustrating?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Do co-op objectives create real cooperation?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Can economic pressure feel meaningful, not punitive?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Does the Super encounter feel exciting or annoying?</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We're Learning */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">What We're Learning</h2>
          <Card>
            <CardHeader>
              <CardTitle>Early Insights</CardTitle>
              <CardDescription>
                As we build each prototype, we're documenting decisions, tradeoffs, and surprises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  This case study is a living document. Each POC page includes our learnings: what worked,
                  what didn't, and what surprised us. We're being honest about the challenges—because that's
                  where the real value is.
                </p>
                <p>
                  Check back as we complete each prototype. The learnings section on each POC page will be
                  updated with our findings, code examples, and honest reflections on what we'd do differently.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Development Timeline */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Development Timeline</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                    <div className="w-px h-full bg-border min-h-8" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-medium mb-1">Foundation Phase</div>
                    <div className="text-muted-foreground text-xs">
                      POC 0: Multiplayer Foundation — Establishing networking architecture
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mt-1" />
                    <div className="w-px h-full bg-border min-h-8" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-medium mb-1">Core Systems</div>
                    <div className="text-muted-foreground text-xs">
                      POCs 1-6: Validating destruction, heat, AI, objectives, economy, and Super encounter
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mt-1" />
                    <div className="w-px h-full bg-border min-h-8" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-medium mb-1">Integration Phase</div>
                    <div className="text-muted-foreground text-xs">
                      POC 7: Mission Flow — Complete game loop validation
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mt-1" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">Polish & Demo</div>
                    <div className="text-muted-foreground text-xs">
                      POC 8: Integration & Polish — Final MVP demo
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Game Design Document</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete game design document outlining core mechanics, systems, and vision
                </p>
                <a
                  href="/GDD.md"
                  className="text-sm font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GDD →
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Strategic Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed development strategy and POC breakdown
                </p>
                <Link
                  href="/.cursor/plans/echelon_strategic_roadmap.md"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Roadmap →
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
