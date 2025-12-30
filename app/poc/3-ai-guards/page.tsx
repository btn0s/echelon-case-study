import { POCLayout } from "@/components/poc/POCLayout";

export default function POC3Page() {
  return (
    <POCLayout slug="3-ai-guards">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Heat Scale: Guard responses (GDD lines 47-52) - 2 guards at 0-25, 4 at 25-50, 6 at 50-75</li>
        <li>Mission Flow: Escalation - "More guards" (GDD line 136)</li>
        <li>Core Fantasy: Consequence pillar - Guards respond to player actions</li>
        <li>Mission Flow: Execution - "The guard who heard your teammate's footsteps" (GDD line 135)</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        Guards are the primary opposition in Echelon. This mechanic needs validation because:
      </p>
      <ul>
        <li>AI behavior patterns directly affect gameplay feel</li>
        <li>Guards need to feel smart but fair (not frustrating)</li>
        <li>Pathfinding approach affects performance and behavior</li>
        <li>State machine complexity needs testing</li>
        <li>Investigation behavior creates key gameplay moments</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement guard patrol behavior with waypoints</li>
        <li>Create investigation system (responding to noise)</li>
        <li>Build state machine (Patrol → Alert → Hunt)</li>
        <li>Implement pathfinding (A*, navmesh, flow fields, or waypoints)</li>
        <li>Test guard spawn system based on heat thresholds (2 at 0-25, 4 at 25-50, 6 at 50-75)</li>
        <li>Create visual/audio feedback for guard states</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Pathfinding Approach</h3>
      <ul>
        <li><strong>A*</strong>: Classic, reliable, can be expensive</li>
        <li><strong>Navmesh</strong>: Pre-computed, efficient, less flexible</li>
        <li><strong>Flow fields</strong>: Great for groups, complex setup</li>
        <li><strong>Waypoints</strong>: Simple, predictable, less dynamic</li>
      </ul>

      <h3>Guard Awareness</h3>
      <ul>
        <li>Should guards share awareness (one sees player, others alerted)?</li>
        <li>Or should they be independent (individual vision/sound detection)?</li>
        <li>How should guards communicate player position?</li>
      </ul>

      <h3>Investigation Behavior</h3>
      <ul>
        <li>How should guards investigate noise sources?</li>
        <li>What happens when they find nothing?</li>
        <li>How long until they return to patrol?</li>
        <li>Should they remember recent player positions?</li>
      </ul>

      <h3>State Machine</h3>
      <ul>
        <li><strong>Patrol</strong>: Follow waypoints, slow movement, predictable</li>
        <li><strong>Alert</strong>: Investigate noises, faster movement, searching</li>
        <li><strong>Hunt</strong>: Chase player, aggressive, call reinforcements</li>
      </ul>

      <h2>Heat-Based Spawn System</h2>
      <ul>
        <li>0-25 Heat: 2 guards, slow movement, predictable routes</li>
        <li>25-50 Heat: 4 guards, investigate noises, faster movement</li>
        <li>50-75 Heat: 6 guards, active hunting, reinforcements</li>
        <li>75-100 Heat: All guards aggressive (Super spawns at 100)</li>
      </ul>

      <h2>Implementation</h2>
      <p>
        <em>This section will be updated as we implement the POC.</em>
      </p>

      <h2>Results & Learnings</h2>
      <p>
        <em>This section will document what we learned during implementation.</em>
      </p>

      <h3>Success Criteria</h3>
      <ul>
        <li>Guards feel smart but fair</li>
        <li>Create tension without frustration</li>
        <li>Patrol behavior feels natural</li>
        <li>Investigation creates interesting gameplay moments</li>
        <li>State transitions feel logical</li>
        <li>Performance is acceptable with 6+ guards</li>
      </ul>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
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

      <h2>Next Steps</h2>
      <p>
        With guards working, we'll add <strong>POC 4: Dynamic Co-op Objectives</strong> to give players
        meaningful goals that require cooperation and create the core mission structure.
      </p>
    </POCLayout>
  );
}
