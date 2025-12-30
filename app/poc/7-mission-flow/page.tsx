import { POCLayout } from "@/components/poc/POCLayout";

export default function POC7Page() {
  return (
    <POCLayout slug="7-mission-flow">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Mission Flow section (GDD lines 128-141) - Complete game loop from pre-mission to extraction</li>
        <li>Win/Lose Conditions table (GDD lines 143-151) - All mission outcomes</li>
        <li>Pre-Mission: The Dilemma (GDD lines 130-131) - Equipment shop integration</li>
        <li>Extraction: The Choice (GDD lines 140-141) - Mission completion mechanics</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        The complete mission flow ties all systems together into a cohesive game loop. This needs
        validation because:
      </p>
      <ul>
        <li>Pre-mission shop must integrate with economy system seamlessly</li>
        <li>Mission start/end transitions affect player experience</li>
        <li>Extraction mechanics create final tension moments</li>
        <li>Win/lose conditions must feel fair and clear</li>
        <li>Complete flow must feel engaging from start to finish</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement pre-mission lobby with equipment shop</li>
        <li>Create mission start flow (loading, briefing, spawn)</li>
        <li>Build extraction zone mechanics</li>
        <li>Implement win/lose condition handling</li>
        <li>Create mission end screen with results</li>
        <li>Integrate credit rewards and strike system</li>
        <li>Test complete mission cycle (lobby → mission → results → lobby)</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Pre-Mission Flow</h3>
      <ul>
        <li>How do players join/create lobbies?</li>
        <li>When does equipment shop appear? (before lobby, in lobby, both?)</li>
        <li>Can players change loadouts after joining?</li>
        <li>What information is shown before mission start?</li>
        <li>How do we handle ready state for both players?</li>
      </ul>

      <h3>Mission Start</h3>
      <ul>
        <li>What's the loading experience?</li>
        <li>Should there be a briefing screen?</li>
        <li>How do players spawn into the mission?</li>
        <li>What's the initial camera/control state?</li>
      </ul>

      <h3>Extraction Mechanics</h3>
      <ul>
        <li>Where is the extraction zone? (fixed location, dynamic, multiple options?)</li>
        <li>Do both players need to reach extraction?</li>
        <li>What happens if one player dies before extraction?</li>
        <li>Is there an extraction timer?</li>
        <li>Can players extract early, or must objectives be completed?</li>
      </ul>

      <h3>Win/Lose Conditions</h3>
      <ul>
        <li>
          <strong>Mission Success</strong>: Complete primary + extract (GDD line 147)
        </li>
        <li>
          <strong>Mission Failure</strong>: Both players eliminated (GDD line 148)
        </li>
        <li>
          <strong>Mission Failure</strong>: Extraction timer expires (GDD line 149)
        </li>
        <li>
          <strong>Mission Failure</strong>: Mission abandoned (GDD line 150)
        </li>
        <li>
          <strong>Career Failure</strong>: 3 strikes accumulated (GDD line 151)
        </li>
      </ul>

      <h3>Mission End</h3>
      <ul>
        <li>What information is shown on mission end screen?</li>
        <li>How are credits calculated and awarded?</li>
        <li>When are strikes applied?</li>
        <li>What happens on career failure (strike 3)?</li>
        <li>How do players return to lobby?</li>
      </ul>

      <h2>Mission Flow Stages (from GDD)</h2>
      <h3>Pre-Mission: The Dilemma</h3>
      <p>
        "Stare at the equipment shop with 200 credits. The stealth loadout costs 200. The demolition
        loadout costs 325. You're one strike away from being fired. What do you buy?"
      </p>

      <h3>Infiltration: The Plan</h3>
      <p>
        "Enter quiet, survey the objectives, make the plan. 'I'll hack the terminal, you watch for
        guards. If things go loud, we blow the wall and extract through the hole.'"
      </p>

      <h3>Execution: The Reality</h3>
      <p>
        "Plans meet physics. The explosive barrel you didn't notice. The wall that collapsed the wrong
        way. The guard who heard your teammate's footsteps. Heat rises."
      </p>

      <h3>Escalation: The Chaos</h3>
      <p>
        "More guards. Locked doors. Emergency lighting. Your careful stealth run becomes a running
        firefight through the holes you've blown in the architecture."
      </p>

      <h3>Super Encounter: The Terror</h3>
      <p>
        "Heat hits 100. Something big crashes through the wall. It's not here to arrest you — it's
        here to stop you. By any means necessary. Through any wall necessary."
      </p>

      <h3>Extraction: The Choice</h3>
      <p>
        "The exit is 50 meters away. Your teammate is down. The Super is between you and them. The
        credits from this job would buy you both better gear next time. Do you run or risk everything
        for a rescue?"
      </p>

      <h2>Implementation</h2>
      <p>
        <em>This section will be updated as we implement the POC.</em>
      </p>

      <h3>Lobby System</h3>
      <ul>
        <li>TBD: Lobby creation and joining</li>
        <li>TBD: Player ready state</li>
        <li>TBD: Mission selection</li>
        <li>TBD: Loadout selection integration</li>
      </ul>

      <h3>Mission Flow</h3>
      <ul>
        <li>TBD: Mission start sequence</li>
        <li>TBD: Extraction zone implementation</li>
        <li>TBD: Win/lose condition checking</li>
        <li>TBD: Mission end screen</li>
      </ul>

      <h2>Results & Learnings</h2>
      <p>
        <em>This section will document what we learned during implementation.</em>
      </p>

      <h3>Success Criteria</h3>
      <ul>
        <li>Complete mission flow feels engaging from start to finish</li>
        <li>Pre-mission shop integrates seamlessly with economy</li>
        <li>Extraction creates final tension moments</li>
        <li>Win/lose conditions are clear and fair</li>
        <li>Mission end screen provides satisfying feedback</li>
        <li>Players want to start another mission immediately</li>
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

      <h2>Integration Points</h2>
      <p>This POC integrates:</p>
      <ul>
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

      <h2>Next Steps</h2>
      <p>
        With mission flow validated, we'll move to <strong>POC 8: Integration & Polish</strong> to
        bring all systems together, balance interactions, and create the final MVP demo.
      </p>
    </POCLayout>
  );
}
