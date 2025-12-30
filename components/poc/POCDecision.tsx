interface POCDecisionProps {
  decision: string;
  rationale: string;
  alternatives?: string[];
}

export function POCDecision({ decision, rationale, alternatives }: POCDecisionProps) {
  return (
    <div className="bg-muted/50 border-l-2 border-primary p-4 rounded-md">
      <div className="font-semibold text-sm mb-2">Decision: {decision}</div>
      <div className="text-sm mb-2">{rationale}</div>
      {alternatives && alternatives.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-medium text-muted-foreground mb-1">Alternatives considered:</div>
          <ul className="text-xs text-muted-foreground list-disc pl-5">
            {alternatives.map((alt, idx) => (
              <li key={idx}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
