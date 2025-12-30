import { POCLayout } from "@/components/poc/POCLayout";

export default function POC4Page() {
  return (
    <POCLayout slug="4-coop-objectives">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Core System #3: Dynamic Co-op Objectives (GDD lines 61-73)</li>
        <li>Primary Objective: Terminal hack (GDD line 66) - 10 second channel, both players vulnerable</li>
        <li>Secondary Objectives table (GDD lines 68-72) - Vault Access, Data Extraction, Evidence Plant</li>
        <li>Core Fantasy: Cooperation pillar - "Your teammate is your lifeline, not just extra firepower"</li>
        <li>Mission Flow: Infiltration - "I'll hack the terminal, you watch for guards" (GDD line 133)</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        Objectives in Echelon aren't just tasks - they're dilemmas designed to split your team's
        attention. This needs validation because:
      </p>
      <ul>
        <li>Co-op mechanics can feel like parallel solo tasks if not designed well</li>
        <li>Terminal hack (10s channel, both players vulnerable) needs to create real tension</li>
        <li>Secondary objectives should create meaningful tradeoffs</li>
        <li>Objective UI/UX must communicate status clearly</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement terminal hack objective (10s channel, both players vulnerable)</li>
        <li>Create secondary objectives (vault access, data extraction, evidence plant)</li>
        <li>Build objective completion tracking system</li>
        <li>Design UI for objective status and progress</li>
        <li>Test co-op interactions and communication requirements</li>
        <li>Validate dilemma design (objectives that split attention)</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Terminal Hack Mechanic</h3>
      <ul>
        <li>Does 10-second channel create the right tension?</li>
        <li>Should both players be required, or can one hack while other guards?</li>
        <li>What happens if hacking is interrupted?</li>
        <li>Should progress save, or restart on interruption?</li>
      </ul>

      <h3>Secondary Objectives</h3>
      <ul>
        <li><strong>Vault Access</strong>: Loud (explosives) vs Quiet (lockpicks + 30s)</li>
        <li><strong>Data Extraction</strong>: Loud (shoot glass) vs Quiet (find keycard)</li>
        <li><strong>Evidence Plant</strong>: Loud (destroy floor above) vs Quiet (find stairs)</li>
        <li>Do these create meaningful choices?</li>
        <li>Are credit rewards balanced?</li>
      </ul>

      <h3>Cooperation Mechanics</h3>
      <ul>
        <li>Do objectives require coordination, or can players split up?</li>
        <li>Is communication essential or optional?</li>
        <li>Do systems reward coordination, or just make it convenient?</li>
      </ul>

      <h2>Objective Types</h2>
      <h3>Primary Objective (Required)</h3>
      <ul>
        <li>Hack central terminal: 10s channel, both players vulnerable</li>
      </ul>

      <h3>Secondary Objectives (Optional, +credits)</h3>
      <table>
        <thead>
          <tr>
            <th>Objective</th>
            <th>Loud Path</th>
            <th>Quiet Path</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vault Access</td>
            <td>Explosives (+50 Heat)</td>
            <td>Lockpicks + 30 seconds (+10 Heat)</td>
          </tr>
          <tr>
            <td>Data Extraction</td>
            <td>Shoot glass (+15 Heat)</td>
            <td>Find keycard (0 Heat)</td>
          </tr>
          <tr>
            <td>Evidence Plant</td>
            <td>Destroy floor above (+25 Heat)</td>
            <td>Find stairs (0 Heat)</td>
          </tr>
        </tbody>
      </table>

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
        <li>Objectives create meaningful cooperation</li>
        <li>Terminal hack creates tension (both players vulnerable)</li>
        <li>Players want to coordinate strategy</li>
        <li>Secondary objectives create interesting tradeoffs</li>
        <li>Objective UI communicates status clearly</li>
      </ul>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
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

      <h2>Next Steps</h2>
      <p>
        With objectives working, we'll add <strong>POC 5: Economic Pressure</strong> to create
        economic pressure and meaningful choices around equipment loadouts.
      </p>
    </POCLayout>
  );
}
