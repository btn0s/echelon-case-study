
import { POCSection } from "@/components/poc/POCSection";
import { POCCallout } from "@/components/poc/POCCallout";
import { POCQuestionList } from "@/components/poc/POCQuestionList";
import { getPOCBySlug } from "@/lib/pocs";
import { getQuestionById } from "@/lib/caseStudy/questions";

export default function POC0Page() {
  const poc = getPOCBySlug("0-multiplayer-foundation");
  const questions = poc?.questionIds
    ? poc.questionIds.map((id) => getQuestionById(id)).filter((q): q is NonNullable<typeof q> => q !== undefined)
    : [];

  return (
    <>
      <POCSection title="TL;DR">
        <p>
          We're establishing the multiplayer networking foundation that all other systems depend on. Can we
          build reliable multiplayer sync that supports cooperative gameplay? Current status:{" "}
          <strong>{poc?.status || "pending"}</strong>.
        </p>
      </POCSection>

      <POCSection title="Key Questions">
        <POCQuestionList questions={questions} showWhy={true} />
      </POCSection>

      <POCSection title="Hypothesis">
        <p>
          Client-server architecture with server authority for critical state (positions, game state, heat,
          objectives) and client-side prediction for movement provides the best balance of responsiveness and
          consistency for our co-op game.
        </p>
      </POCSection>

      <POCSection title="Experiment Design">
        <p>
          Build a minimal multiplayer test: two players can move around a shared space. We'll test:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Networking architecture (client-server vs peer-to-peer)</li>
          <li>State synchronization approach</li>
          <li>Connection handling and reconnection logic</li>
          <li>Latency tolerance for responsive feel</li>
        </ul>
        <POCCallout variant="info" className="mt-4">
          <strong>Validation method:</strong> Two players connect and move simultaneously. Does movement feel
          responsive? Do both clients see consistent state? Can we handle disconnects gracefully?
        </POCCallout>
      </POCSection>

      <POCSection title="Instrumentation">
        <p>What we're measuring:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Network latency and jitter</li>
          <li>State consistency (do clients agree?)</li>
          <li>Connection stability</li>
          <li>Reconnection success rate</li>
        </ul>
      </POCSection>

      <POCSection title="Results">
        <POCCallout variant="warning">
          <em>This section will be updated as we implement the POC.</em>
        </POCCallout>
        <h3 className="text-lg font-semibold mt-4 mb-2">Success Criteria</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Two players can connect reliably</li>
          <li>Player movement feels responsive and consistent</li>
          <li>Connection handling is robust (handles disconnects gracefully)</li>
          <li>Network architecture supports all planned systems</li>
          <li>Latency is acceptable for responsive gameplay</li>
          <li>Reconnection works without losing game state</li>
        </ul>
      </POCSection>

      <POCSection title="Decision">
        <POCCallout variant="warning">
          <em>This section will document our decision once we complete the POC.</em>
        </POCCallout>
        <p>
          Once we complete testing, we'll document: which networking architecture we chose, what tick rate we're
          using, and how we're handling authority vs prediction.
        </p>
      </POCSection>

      <POCSection title="Open Questions">
        <ul className="list-disc pl-6 space-y-1">
          <li>What's the maximum acceptable latency for tight co-op feel?</li>
          <li>Can players rejoin mid-mission, or only at lobby?</li>
          <li>How do we handle state reconciliation after network hiccups?</li>
        </ul>
      </POCSection>

      <POCSection title="Integration Notes">
        <p>This POC enables all other POCs:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>POC 1: Destruction</strong> - Destruction state must sync across clients
          </li>
          <li>
            <strong>POC 2: Heat System</strong> - Heat state needs server authority
          </li>
          <li>
            <strong>POC 3: AI Guards</strong> - Guard positions and states must sync
          </li>
          <li>
            <strong>POC 4: Co-op Objectives</strong> - Objective progress needs shared state
          </li>
          <li>
            <strong>POC 5: Economy</strong> - Credit and loadout data must persist
          </li>
          <li>
            <strong>POC 7: Mission Flow</strong> - Lobby and matchmaking depend on networking
          </li>
        </ul>
      </POCSection>
    </>
  );
}
