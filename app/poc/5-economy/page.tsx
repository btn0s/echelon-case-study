
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC5Page() {
  const poc = getPOCBySlug("5-economy");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that economic constraints create interesting choices without feeling punitive. Can
          players make an agonizing loadout choice with only ~200 credits? Current status:{" "}
          <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          GDD-specified credit values (starting ~200, rewards +100/+200) create meaningful loadout choices.
          Three-strike failure system creates dramatic stakes without feeling punitive. Strike 2 (+25% costs)
          meaningfully changes player behavior.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create pre-mission shop with three loadout options. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Credit balance and rewards</li>
          <li>Loadout choice difficulty</li>
          <li>3-strike failure system impact</li>
          <li>Persistence between missions</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Players face loadout choices with limited credits. Do they
          deliberate? After failures, do they want to retry? Does Strike 2 change behavior?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Loadout choice time</li>
          <li>Credit balance after missions</li>
          <li>Retry rate after failures</li>
          <li>Behavior changes at Strike 2</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Economic constraints create interesting decisions</li>
          <li>Loadout choices feel meaningful</li>
          <li>Failure feels consequential but not punitive</li>
          <li>Players want to optimize loadouts based on strategy</li>
          <li>Credit balance supports replayability</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: final credit values, loadout costs, and strike system
          tuning.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Should credits persist between sessions?</li>
          <li>Do strikes reset after success or only on failure?</li>
          <li>Are loadout costs balanced with effectiveness?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC connects to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Completed objectives reward credits (+100 each)
          </li>
          <li>
            <strong>POC 2: Heat System</strong> - Stealth bonus (Heat &lt; 50) rewards +100 credits
          </li>
          <li>
            <strong>POC 7: Mission Flow</strong> - Pre-mission shop and credit rewards
          </li>
          <li>
            <strong>POC 1: Destruction</strong> - Equipment costs affect destruction strategy
          </li>
        </ul>
      </POCSection>
    </>
  );
}
