
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC4Page() {
  const poc = getPOCBySlug("4-coop-objectives");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that objectives create real cooperation, not just parallel solo tasks. Does the 10s
          terminal hack create real co-op tension? Current status: <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Terminal hack requiring both players (10s channel, both vulnerable) creates genuine cooperation
          moments. Secondary objectives with quiet/loud path dilemmas create meaningful tradeoffs that split
          team attention.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create test scenarios with terminal hack and secondary objectives. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Terminal hack mechanic (10s channel, both vulnerable)</li>
          <li>Secondary objectives (vault, data extraction, evidence)</li>
          <li>Objective UI/UX clarity</li>
          <li>Cooperation requirements</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Players attempt objectives. Do they coordinate? Does terminal
          hack create tension? Do secondary objectives create dilemmas?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Coordination frequency (do players work together?)</li>
          <li>Objective completion rates</li>
          <li>Player understanding (do they know what to do?)</li>
          <li>Time spent on objectives</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Objectives create meaningful cooperation</li>
          <li>Terminal hack creates tension (both players vulnerable)</li>
          <li>Players want to coordinate strategy</li>
          <li>Secondary objectives create interesting tradeoffs</li>
          <li>Objective UI communicates status clearly</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: final objective designs, interruption behavior, and UI/UX
          choices.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Should hack progress save on interruption or reset?</li>
          <li>Do secondary objectives create real dilemmas?</li>
          <li>Is splitting up ever optimal?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC connects to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 3: AI Guards</strong> - Guards patrol near objectives, terminal hack makes both players vulnerable
          </li>
          <li>
            <strong>POC 5: Economy</strong> - Completed objectives reward credits (+100 each)
          </li>
          <li>
            <strong>POC 7: Mission Flow</strong> - Mission success requires objective completion
          </li>
        </ul>
      </POCSection>
    </>
  );
}
