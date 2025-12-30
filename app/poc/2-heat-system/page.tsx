import { POCLayout } from "@/components/poc/POCLayout";

export default function POC2Page() {
  return (
    <POCLayout slug="2-heat-system">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Core System #2: Heat as Consequence (GDD lines 43-59)</li>
        <li>Heat Scale table (GDD lines 46-52) - 0-25 Patrol, 25-50 Alert, 50-75 Alarmed, 75-100 SUPER</li>
        <li>Heat Sources (GDD lines 53-58) - Footsteps, Suppressed Shot, Gunshot, Breaking Wall, Explosion</li>
        <li>Heat Decay (GDD line 59) - -1 per second when no guards investigating</li>
        <li>Mission Flow: Escalation - "Heat rises" (GDD line 135)</li>
        <li>Core Fantasy: Consequence pillar - "Every noise draws attention you can't afford"</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        Heat is Echelon's core consequence system - the louder you are, the harder the world pushes back.
        This mechanic needs validation because:
      </p>
      <ul>
        <li>Heat formula balance is critical (too fast = unfair, too slow = no tension)</li>
        <li>Players need clear cause-effect understanding</li>
        <li>Threshold events (guard spawns, Super) need to feel fair</li>
        <li>Heat decay rate affects pacing</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement server-authoritative heat state (0-100)</li>
        <li>Create noise detection system with radius-based calculations</li>
        <li>Implement heat sources: footsteps (+1, 5m), gunshots (+15, 50m), explosions (+35, 100m), wall breaking (+25, 75m)</li>
        <li>Add heat decay logic (-1/second when no active investigations)</li>
        <li>Create heat meter UI with clear feedback</li>
        <li>Test threshold-based events (guard spawns at 25, 50, 75, Super at 100)</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Heat Formula Balance</h3>
      <ul>
        <li>Are noise source values correct? (footsteps +1, gunshots +15, explosions +35)</li>
        <li>Are detection radii appropriate? (5m, 15m, 50m, 75m, 100m)</li>
        <li>Is decay rate (-1/sec) balanced?</li>
      </ul>

      <h3>Threshold Spacing</h3>
      <ul>
        <li>Guard spawns at 25, 50, 75 - is this too predictable?</li>
        <li>Should thresholds be fixed or dynamic?</li>
        <li>Does Super at 100 feel like a natural escalation?</li>
      </ul>

      <h3>Player Feedback</h3>
      <ul>
        <li>How do we communicate heat level clearly?</li>
        <li>Should heat have audio/visual feedback?</li>
        <li>Do players understand what actions generate heat?</li>
      </ul>

      <h2>Implementation</h2>
      <p>
        <em>This section will be updated as we implement the POC.</em>
      </p>

      <h3>Heat Sources (from GDD)</h3>
      <ul>
        <li>Footsteps: +1 Heat, 5m radius</li>
        <li>Suppressed Shot: +5 Heat, 15m radius</li>
        <li>Gunshot: +15 Heat, 50m radius</li>
        <li>Breaking Wall: +25 Heat, 75m radius</li>
        <li>Explosion: +35 Heat, 100m radius</li>
      </ul>

      <h3>Heat Decay</h3>
      <ul>
        <li>-1 per second when no guards investigating</li>
        <li>Pauses during active investigations</li>
      </ul>

      <h2>Results & Learnings</h2>
      <p>
        <em>This section will document what we learned during implementation.</em>
      </p>

      <h3>Success Criteria</h3>
      <ul>
        <li>Heat creates meaningful pressure</li>
        <li>Players understand cause-effect relationship</li>
        <li>Heat feels fair (not arbitrary)</li>
        <li>Threshold events create tension escalation</li>
        <li>Heat meter UI is clear and informative</li>
      </ul>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
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

      <h2>Next Steps</h2>
      <p>
        With heat proven, we'll build <strong>POC 3: AI Guards & Opposition</strong> to create the opposition
        that responds to heat levels and creates the actual gameplay challenge.
      </p>
    </POCLayout>
  );
}
