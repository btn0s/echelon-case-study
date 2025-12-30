import { POCLayout } from "@/components/poc/POCLayout";

export default function POC5Page() {
  return (
    <POCLayout slug="5-economy">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Core System #4: Economic Pressure (GDD lines 74-101)</li>
        <li>Credit Economy table (GDD lines 77-83) - Objective +100, Extraction +200, Stealth bonus +100, Speed bonus +50</li>
        <li>Loadout Options (GDD lines 84-96) - Stealth 200, Assault 275, Demolition 325</li>
        <li>Failure System (GDD lines 97-101) - Strike 1 warning, Strike 2 +25% costs, Strike 3 FIRED</li>
        <li>Core Fantasy: Desperation and Stakes pillars</li>
        <li>Mission Flow: Pre-Mission - "The Dilemma" (GDD lines 130-131)</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        Every tool costs money you don't have. This needs validation because:
      </p>
      <ul>
        <li>Economic constraints can create frustration if too restrictive</li>
        <li>Loadout choices need to feel meaningful, not arbitrary</li>
        <li>3-strike failure system needs to feel fair but consequential</li>
        <li>Credit balance affects replayability and progression feel</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement credit tracking system (server-side)</li>
        <li>Create pre-mission loadout shop</li>
        <li>Design three loadout options (Stealth 200, Assault 275, Demolition 325)</li>
        <li>Implement credit rewards from objectives</li>
        <li>Build 3-strike failure tracking system</li>
        <li>Test persistence between missions</li>
        <li>Validate economic constraints create interesting choices</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Credit Balance</h3>
      <ul>
        <li>What's the right starting credit amount?</li>
        <li>Are reward values balanced? (Objective +100, Extraction +200, Stealth bonus +100, Speed bonus +50)</li>
        <li>Are loadout costs appropriate? (Stealth 200, Assault 275, Demolition 325)</li>
        <li>Should credits persist between sessions?</li>
      </ul>

      <h3>3-Strike System</h3>
      <ul>
        <li>Does Strike 1 warning create enough tension?</li>
        <li>Is Strike 2 (+25% equipment costs) impactful?</li>
        <li>Does Strike 3 (fired, reset) feel fair or too harsh?</li>
        <li>Should strikes reset after success, or only on failure?</li>
      </ul>

      <h3>Loadout Choices</h3>
      <ul>
        <li>Do the three loadouts create distinct playstyles?</li>
        <li>Are loadout costs balanced with their effectiveness?</li>
        <li>Do players want to optimize loadouts based on strategy?</li>
      </ul>

      <h2>Loadout Options</h2>
      <h3>STEALTH (200 credits)</h3>
      <ul>
        <li>Suppressed Pistol (75): Quiet, weak damage</li>
        <li>Lockpicks (50): Silent door/vault access</li>
        <li>Smoke Grenades (75): Concealment, no damage</li>
      </ul>

      <h3>ASSAULT (275 credits)</h3>
      <ul>
        <li>Assault Rifle (125): Loud, high damage</li>
        <li>Frag Grenades (100): AoE damage, loud</li>
        <li>Body Armor (50): Survive more hits</li>
      </ul>

      <h3>DEMOLITION (325 credits)</h3>
      <ul>
        <li>Shotgun (75): Close range, moderate noise</li>
        <li>Explosives (200): Instant destruction, very loud</li>
        <li>Breaching Charges (50): Quiet destruction</li>
      </ul>

      <h2>Credit Economy</h2>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Completed objective</td>
            <td>+100</td>
          </tr>
          <tr>
            <td>Extraction bonus</td>
            <td>+200</td>
          </tr>
          <tr>
            <td>Stealth bonus (Heat &lt; 50)</td>
            <td>+100</td>
          </tr>
          <tr>
            <td>Speed bonus (&lt; 8 min)</td>
            <td>+50</td>
          </tr>
        </tbody>
      </table>

      <h2>Failure System</h2>
      <ul>
        <li><strong>Strike 1</strong>: Warning message</li>
        <li><strong>Strike 2</strong>: All equipment costs +25%</li>
        <li><strong>Strike 3</strong>: FIRED — restart with new operator, lose all credits</li>
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
        <li>Economic constraints create interesting decisions</li>
        <li>Loadout choices feel meaningful</li>
        <li>Failure feels consequential but not punitive</li>
        <li>Players want to optimize loadouts based on strategy</li>
        <li>Credit balance supports replayability</li>
      </ul>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
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
          <strong>POC 1: Destruction</strong> - Equipment costs affect destruction strategy (Explosives 200, Breaching Charges 100)
        </li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        With economy established, we'll create <strong>POC 6: Super Encounter</strong> for the
        dramatic climax moment when heat hits 100.
      </p>
    </POCLayout>
  );
}
