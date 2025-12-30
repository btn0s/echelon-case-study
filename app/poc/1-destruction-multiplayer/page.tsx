import { POCLayout } from "@/components/poc/POCLayout";

export default function POC1Page() {
  return (
    <POCLayout slug="1-destruction-multiplayer">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Core System #1: Destruction as Strategy (GDD lines 28-42)</li>
        <li>Player Tools table (GDD lines 37-41) - Explosives, Breaching Charges, Environmental</li>
        <li>Mission Flow: Execution - "Plans meet physics" (GDD line 134)</li>
        <li>Core Fantasy: Chaos pillar - "Physics turns careful plans into desperate improvisation"</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        Destruction is a core pillar of Echelon's gameplay, but syncing destruction state across
        multiple clients is complex. We need to validate:
      </p>
      <ul>
        <li>Which physics engine handles multiplayer sync best?</li>
        <li>How do we handle destruction state authority (server vs client)?</li>
        <li>What's the right destruction granularity (voxel, chunks, pre-broken)?</li>
        <li>How do we clean up debris without performance hits?</li>
        <li>Can two players destroy simultaneously without desync?</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Integrate physics engine (Cannon.js or Rapier)</li>
        <li>Create destructible wall components</li>
        <li>Implement destruction triggers (explosives, impacts)</li>
        <li>Sync destruction state across multiple clients</li>
        <li>Test performance with simultaneous destructions</li>
        <li>Implement debris cleanup strategy</li>
        <li>Compare physics engines if time permits</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Physics Engine Choice</h3>
      <ul>
        <li><strong>Cannon.js</strong>: Mature, good docs, works well with R3F</li>
        <li><strong>Rapier</strong>: More modern, better performance, Rust-based</li>
      </ul>

      <h3>Destruction Approach</h3>
      <ul>
        <li><strong>Voxel-based</strong>: High detail, complex physics</li>
        <li><strong>Mesh cutting</strong>: Dynamic but computationally expensive</li>
        <li><strong>Pre-broken chunks</strong>: Performance-friendly, less dynamic</li>
      </ul>

      <h3>State Synchronization</h3>
      <ul>
        <li><strong>Event-based</strong>: Server broadcasts destruction events</li>
        <li><strong>State snapshot</strong>: Periodic full state sync</li>
        <li><strong>Deterministic physics</strong>: Same seed/timestep on all clients</li>
      </ul>

      <h2>Implementation</h2>
      <p>
        <em>This section will be updated as we implement the POC.</em>
      </p>

      <h3>Technical Decisions</h3>
      <ul>
        <li>TBD: Physics engine choice</li>
        <li>TBD: Destruction granularity</li>
        <li>TBD: State sync approach</li>
        <li>TBD: Debris cleanup strategy</li>
      </ul>

      <h2>Results & Learnings</h2>
      <p>
        <em>This section will document what we learned during implementation.</em>
      </p>

      <h3>Success Criteria</h3>
      <ul>
        <li>Two players can destroy walls and see changes sync smoothly</li>
        <li>Destruction feels satisfying</li>
        <li>Performance remains acceptable with multiple destructions</li>
        <li>State stays consistent across clients</li>
        <li>No visible desync issues</li>
      </ul>

      <h3>What Worked</h3>
      <ul>
        <li>TBD</li>
      </ul>

      <h3>What Didn't Work</h3>
      <ul>
        <li>TBD</li>
      </ul>

      <h3>Key Insights</h3>
      <ul>
        <li>TBD</li>
      </ul>

      <h2>Code Examples</h2>
      <p>
        <em>Key code patterns and snippets will be documented here.</em>
      </p>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
        <li>
          <strong>POC 0: Multiplayer Foundation</strong> - Destruction state must sync across clients
        </li>
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

      <h2>Next Steps</h2>
      <p>
        Once destruction and multiplayer sync are proven, we'll move to <strong>POC 2: Heat as Consequence</strong>,
        which will trigger based on destruction events (explosions, breaking walls).
      </p>
    </POCLayout>
  );
}
