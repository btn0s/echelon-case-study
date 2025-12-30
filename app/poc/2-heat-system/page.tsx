
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC2Page() {
  const poc = getPOCBySlug("2-heat-system");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that heat creates meaningful tension without feeling frustrating or arbitrary. Does
          escalating tension create pressure without frustration? Current status:{" "}
          <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Heat system with GDD-specified values (+1 footsteps, +15 gunshots, +35 explosions) and fixed
          thresholds (25, 50, 75, 100) creates meaningful tension. Players will understand cause-effect
          relationships through clear feedback channels (UI meter + audio cues).
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create a test scenario where players can generate noise (footsteps, gunshots, explosions). We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Heat calculation with GDD values</li>
          <li>Threshold-based events (guard spawns, Super)</li>
          <li>Heat decay behavior</li>
          <li>Player feedback mechanisms</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Players make noise and observe heat rise. Do they understand
          cause-effect? Do thresholds feel fair? Does heat create tension without frustration?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Heat progression rate</li>
          <li>Player understanding (do they connect actions to heat?)</li>
          <li>Threshold event timing</li>
          <li>Decay behavior</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Heat creates meaningful pressure</li>
          <li>Players understand cause-effect relationship</li>
          <li>Heat feels fair (not arbitrary)</li>
          <li>Threshold events create tension escalation</li>
          <li>Heat meter UI is clear and informative</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: final heat values, threshold spacing, decay rate, and
          feedback channel choices.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Should thresholds be fixed, stochastic, or context-sensitive?</li>
          <li>What's the best feedback channel combination?</li>
          <li>When should decay pause?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC connects to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 1: Destruction</strong> - Destruction events trigger heat (explosions +35, wall breaking +25)
          </li>
          <li>
            <strong>POC 3: AI Guards</strong> - Heat thresholds spawn guards (2 at 0-25, 4 at 25-50, 6 at 50-75)
          </li>
          <li>
            <strong>POC 5: Economy</strong> - Stealth bonus (Heat &lt; 50) rewards +100 credits
          </li>
          <li>
            <strong>POC 6: Super Encounter</strong> - Heat 100 triggers Super spawn
          </li>
        </ul>
      </POCSection>
    </>
  );
}
