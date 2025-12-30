
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC7Page() {
  const poc = getPOCBySlug("7-mission-flow");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that the complete mission flow creates an engaging game loop. Does the loop create
          distinct phases? Current status: <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Complete mission flow (pre-mission shop → mission start → execution → extraction → results) creates
          distinct phases that players recognize. The loop feels engaging and supports "one more run"
          mentality.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Build complete mission flow from lobby to results screen. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pre-mission shop integration</li>
          <li>Mission start flow</li>
          <li>Extraction mechanics</li>
          <li>Win/lose condition handling</li>
          <li>Mission end screen</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Play through complete mission cycle. Do phases feel distinct? Do
          players want to start another run? Does the flow feel engaging?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Mission cycle time</li>
          <li>Retry rate</li>
          <li>Phase transition clarity</li>
          <li>Player understanding of flow</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Complete mission flow feels engaging from start to finish</li>
          <li>Pre-mission shop integrates seamlessly with economy</li>
          <li>Extraction creates final tension moments</li>
          <li>Win/lose conditions are clear and fair</li>
          <li>Mission end screen provides satisfying feedback</li>
          <li>Players want to start another mission immediately</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: final mission flow design, extraction mechanics, and
          win/lose condition handling.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Do both players need to reach extraction?</li>
          <li>What happens if one player dies before extraction?</li>
          <li>Is there an extraction timer?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC integrates:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 0: Multiplayer Foundation</strong> - Lobby and matchmaking depend on networking
          </li>
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Mission success requires objective completion
          </li>
          <li>
            <strong>POC 5: Economy</strong> - Pre-mission shop and credit rewards
          </li>
          <li>
            <strong>All POCs</strong> - Complete game loop brings everything together
          </li>
        </ul>
      </POCSection>
    </>
  );
}
