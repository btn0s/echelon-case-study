import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POC 1: Destruction as Strategy | Echelon Case Study",
  description:
    "Prove destructible environment works in multiplayer context with physics engine integration and state synchronization.",
};

export default function POC1Page() {
  const poc = getPOCBySlug("1-destruction-multiplayer");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're validating that destruction can feel strategic and sync reliably across multiple players.
          Can we make the environment feel like a toolkit, not just backdrop? Current status:{" "}
          <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Destruction can feel strategic (readable, controllable) and sync reliably across multiple clients
          using event-based synchronization. Pre-broken chunks provide the best balance of performance and
          gameplay feel for our demo scope.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Create a minimal test scenario: a single room with destructible walls. Two players can trigger
          destruction via explosives or impacts. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Physics engine integration (Cannon.js vs Rapier)</li>
          <li>Destruction granularity (voxel vs chunks vs pre-broken)</li>
          <li>State synchronization approach (event-based vs snapshot)</li>
          <li>Performance with simultaneous destructions</li>
          <li>Debris cleanup strategy</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Two players destroy walls simultaneously. Do both see the same
          result? Does it feel satisfying? Does performance remain acceptable?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Frame rate during destruction events</li>
          <li>Network message count and size</li>
          <li>State consistency checks (do clients agree on world state?)</li>
          <li>Player feedback (does destruction feel satisfying?)</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Two players can destroy walls and see changes sync smoothly</li>
          <li>Destruction feels satisfying</li>
          <li>Performance remains acceptable with multiple destructions</li>
          <li>State stays consistent across clients</li>
          <li>No visible desync issues</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: which physics engine we chose and why, what destruction
          granularity works best, and how we're syncing state.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>Should destruction be deterministic or event-based?</li>
          <li>How do we handle destruction that happens during network lag?</li>
          <li>What's the minimum destructible set for the demo?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC enables:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 2: Heat System</strong> - Destruction events trigger heat (explosions +35, wall breaking +25)
          </li>
          <li>
            <strong>POC 3: AI Guards</strong> - Guards investigate destruction sites
          </li>
          <li>
            <strong>POC 6: Super Encounter</strong> - Super breaks through walls, creating new paths
          </li>
        </ul>
      </POCSection>
    </>
  );
}
