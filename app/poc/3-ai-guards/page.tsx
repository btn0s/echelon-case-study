
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC3Page() {
  const poc = getPOCBySlug("3-ai-guards");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that AI guards feel smart and challenging without being frustrating. Can guards be
          "smart" with simple rules? Current status: <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Simple state machine (Patrol → Alert → Hunt) with waypoint-based pathfinding creates guards that feel
          smart enough for the fantasy without requiring complex AI. Guards communicate state through visual
          cues (posture, lights) and audio (barks).
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create guards that patrol waypoints and respond to noise. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pathfinding approach (A*, navmesh, waypoints)</li>
          <li>State machine behavior (patrol, investigate, hunt)</li>
          <li>Investigation logic</li>
          <li>Guard communication methods</li>
          <li>Performance with 6+ guards</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Players attempt stealth runs. Can they avoid guards? Do guards
          create pressure without forcing combat? Do guards feel smart or obviously scripted?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Guard pathfinding performance</li>
          <li>State transition frequency</li>
          <li>Player success rate on stealth runs</li>
          <li>Frame rate with multiple guards</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Guards feel smart but fair</li>
          <li>Create tension without frustration</li>
          <li>Patrol behavior feels natural</li>
          <li>Investigation creates interesting gameplay moments</li>
          <li>State transitions feel logical</li>
          <li>Performance is acceptable with 6+ guards</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: pathfinding approach chosen, state machine design, and
          communication methods.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Should guards share awareness or be independent?</li>
          <li>How long should guards remember player positions?</li>
          <li>What's the right balance between predictable and dynamic behavior?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC connects to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 2: Heat System</strong> - Heat thresholds spawn guards and affect guard behavior
          </li>
          <li>
            <strong>POC 1: Destruction</strong> - Guards investigate destruction sites
          </li>
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Guards patrol near objectives, terminal hack makes players vulnerable
          </li>
          <li>
            <strong>POC 6: Super Encounter</strong> - All guards become aggressive when Super spawns
          </li>
        </ul>
      </POCSection>
    </>
  );
}
