import { POCLayout } from "@/components/poc/POCLayout";

export default function POC6Page() {
  return (
    <POCLayout slug="6-super">
      <h2>GDD Mapping</h2>
      <p>This POC validates:</p>
      <ul>
        <li>Super Encounters section (GDD lines 112-127)</li>
        <li>Heat Scale: SUPER state at 75-100 (GDD line 52) - Boss spawns, all guards aggressive</li>
        <li>Super Behavior (GDD lines 115-122) - Dramatic entrance, chase, physics knockback, stun mechanic</li>
        <li>Mission Flow: Super Encounter - "The Terror" (GDD lines 138-139)</li>
        <li>Mission Flow: Extraction - "The Choice" (GDD lines 140-141) - Super affects extraction decisions</li>
      </ul>

      <h2>Why This Needs a POC</h2>
      <p>
        When heat hits 100, a Super arrives - an elite, superpowered enforcer. This needs validation because:
      </p>
      <ul>
        <li>Boss encounters can feel frustrating if too difficult</li>
        <li>Chase mechanics need to be exciting, not annoying</li>
        <li>Stun mechanic must feel satisfying to use</li>
        <li>Escape conditions need to feel achievable</li>
        <li>Dramatic entrance needs to feel impactful</li>
      </ul>

      <h2>Goals</h2>
      <ul>
        <li>Implement Super spawn trigger (heat 100)</li>
        <li>Create dramatic entrance (breaks through wall)</li>
        <li>Build chase behavior (targets nearest player)</li>
        <li>Implement physics knockback attacks</li>
        <li>Add stun mechanic (explosives, 3-second stun)</li>
        <li>Design escape conditions and victory criteria</li>
        <li>Test that Super feels threatening but not impossible</li>
      </ul>

      <h2>Key Questions</h2>
      <h3>Super Behavior</h3>
      <ul>
        <li>How should Super pathfind? (Through walls, around obstacles)</li>
        <li>Should Super break through walls when chasing, or find paths?</li>
        <li>What's the right chase speed? (Fast enough to be scary, slow enough to escape)</li>
        <li>Should Super have health/defeat mechanics, or is it purely invincible?</li>
      </ul>

      <h3>Stun Mechanic</h3>
      <ul>
        <li>3-second stun duration - is this balanced?</li>
        <li>Can stuns be chained, or should there be a cooldown?</li>
        <li>Only explosives stun, or other tools too?</li>
        <li>Does stun feel satisfying to use?</li>
      </ul>

      <h3>Escape Conditions</h3>
      <ul>
        <li>What happens if players escape the room while Super is active?</li>
        <li>Does Super despawn on extraction, or does extraction require surviving Super?</li>
        <li>Should there be a safe zone, or is extraction the only escape?</li>
      </ul>

      <h3>Dramatic Impact</h3>
      <ul>
        <li>How can we make the entrance feel dramatic?</li>
        <li>Should there be audio/visual cues before spawn?</li>
        <li>Does breaking through wall feel impactful?</li>
      </ul>

      <h2>Super Behavior (from GDD)</h2>
      <ul>
        <li>Dramatic entrance: Breaks through wall</li>
        <li>Chase behavior: Targets nearest player</li>
        <li>Physics knockback attacks</li>
        <li>Breaks through walls, creating new paths</li>
        <li>Can be stunned with explosives (3-second stun)</li>
        <li>Nearly invincible — goal is escape, not defeat</li>
      </ul>

      <h2>Rewards (if killed - future consideration)</h2>
      <ul>
        <li>Rare tech and loot</li>
        <li>Reputation</li>
        <li>Bragging rights</li>
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
        <li>Super feels threatening and memorable</li>
        <li>Chase creates tension and excitement</li>
        <li>Players can escape (not impossible)</li>
        <li>Stun mechanic feels satisfying to use</li>
        <li>Entrance feels dramatic and impactful</li>
        <li>Encounter doesn't feel frustrating or unfair</li>
      </ul>

      <h2>Integration Points</h2>
      <p>This POC connects to:</p>
      <ul>
        <li>
          <strong>POC 2: Heat System</strong> - Super spawns at heat 100 (climax of all tension)
        </li>
        <li>
          <strong>POC 1: Destruction</strong> - Super breaks through walls, creating new paths
        </li>
        <li>
          <strong>POC 3: AI Guards</strong> - All guards become aggressive when Super spawns
        </li>
        <li>
          <strong>POC 5: Economy</strong> - Stun requires explosives (economy system)
        </li>
        <li>
          <strong>POC 4: Co-op Objectives</strong> - Super chases players, affecting objective completion
        </li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        With all core mechanics proven, we'll move to <strong>POC 7: Mission Flow & Lobby</strong> to validate
        the complete game loop, then <strong>POC 8: Integration & Polish</strong> to bring everything together.
      </p>
    </POCLayout>
  );
}
