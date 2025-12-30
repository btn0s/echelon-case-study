
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function IntegrationPage() {
  const poc = getPOCBySlug("integration");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that all systems work together cohesively to create a fun, polished experience.
          Which system interaction is most fragile? Current status:{" "}
          <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          All POC systems integrate smoothly with minimal edge cases. System interactions (heat↔AI,
          destruction↔sync, economy↔tools) are robust. Minimal polish set (audio/UI/juice) sells the fantasy
          effectively.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Integrate all POC systems into single game loop. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>System interactions and edge cases</li>
          <li>Balance across all systems</li>
          <li>UI/UX polish</li>
          <li>Audio/visual polish</li>
          <li>Complete mission flow</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Play through complete integrated demo. Do systems work together?
          Are there edge cases? Does it feel polished? Do players want "one more run"?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Edge case frequency</li>
          <li>System interaction bugs</li>
          <li>Player engagement (retry rate)</li>
          <li>Performance across all systems</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>All systems work together cohesively</li>
          <li>Core game loop feels fun and tense</li>
          <li>No major bugs or edge cases</li>
          <li>Polish level appropriate for demo</li>
          <li>Players want to "try one more run"</li>
          <li>Case study documentation is complete</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: final system balance, polish choices, and key learnings
          from the entire development process.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Which system interaction is most fragile?</li>
          <li>What's the minimal polish set required?</li>
          <li>Are there any fundamental issues we missed?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC integrates all previous POCs:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 0: Multiplayer Foundation</strong> - Networking enables all cooperative gameplay
          </li>
          <li>
            <strong>POC 1: Destruction</strong> - Environmental interactions sync across clients
          </li>
          <li>
            <strong>POC 2: Heat System</strong> - Tension mechanic drives escalation
          </li>
          <li>
            <strong>POC 3: AI Guards</strong> - Opposition responds to player actions
          </li>
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Goals require cooperation
          </li>
          <li>
            <strong>POC 5: Economic Pressure</strong> - Choices create meaningful decisions
          </li>
          <li>
            <strong>POC 6: Super Encounter</strong> - Climax moment creates drama
          </li>
          <li>
            <strong>POC 7: Mission Flow</strong> - Complete game loop ties everything together
          </li>
        </ul>
      </POCSection>
    </>
  );
}
