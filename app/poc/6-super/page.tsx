
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC6Page() {
  const poc = getPOCBySlug("6-super");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that the Super encounter feels exciting and memorable, not frustrating. Does the
          Super feel like a climax, not a chore? Current status: <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Super spawn at heat 100 with dramatic entrance (breaks through wall), chase mechanics targeting
          nearest player, and stun system (explosives, 3-second stun) creates a memorable climax moment. Players
          can escape reliably with skill.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create Super encounter triggered at heat 100. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Dramatic entrance (breaks through wall)</li>
          <li>Chase behavior (targets nearest player)</li>
          <li>Physics knockback attacks</li>
          <li>Stun mechanic (explosives, 3-second stun)</li>
          <li>Escape conditions</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Trigger Super encounter. Do players feel excitement or
          frustration? Can skilled players escape? Does stun feel satisfying?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Escape success rate</li>
          <li>Stun usage frequency</li>
          <li>Player emotional response</li>
          <li>Chase duration</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Super feels threatening and memorable</li>
          <li>Chase creates tension and excitement</li>
          <li>Players can escape (not impossible)</li>
          <li>Stun mechanic feels satisfying to use</li>
          <li>Entrance feels dramatic and impactful</li>
          <li>Encounter doesn't feel frustrating or unfair</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: Super behavior design, chase mechanics, stun system, and
          escape conditions.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>How should Super pathfind (through walls vs around obstacles)?</li>
          <li>Can stuns be chained, or should there be a cooldown?</li>
          <li>What are the exact escape conditions?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC connects to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 2: Heat System</strong> - Super spawns at heat 100 (climax of all tension)
          </li>
          <li>
            <strong>POC 1: Destruction</strong> - Super breaks through walls, creating new paths
          </li>
          <li>
            <strong>POC 3: AI Guards</strong> - All guards become aggressive when Super spawns
          </li>
          <li>
            <strong>POC 5: Economy</strong> - Stun requires explosives (economy system)
          </li>
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Super chases players, affecting objective completion
          </li>
        </ul>
      </POCSection>
    </>
  );
}
