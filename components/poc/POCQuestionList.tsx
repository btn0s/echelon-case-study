import Link from "next/link";
import { Question } from "@/lib/caseStudy/questions";
import { POCS } from "@/lib/pocs";

interface POCQuestionListProps {
  questions: Question[];
  showWhy?: boolean;
  showHowToTest?: boolean;
}

export function POCQuestionList({
  questions,
  showWhy = false,
  showHowToTest = false,
}: POCQuestionListProps) {
  if (questions.length === 0) {
    return <p className="text-sm text-muted-foreground">No questions assigned yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {questions.map((question) => {
        const relatedPOCs = question.relatedPOCs
          .map((id) => POCS.find((p) => p.id === id))
          .filter((p): p is NonNullable<typeof p> => p !== undefined);

        return (
          <li key={question.id} className="border-l-2 border-muted pl-4">
            <div className="font-medium text-sm mb-1">{question.text}</div>
            {showWhy && (
              <div className="text-xs text-muted-foreground mb-1">
                <strong>Why:</strong> {question.why}
              </div>
            )}
            {showHowToTest && (
              <div className="text-xs text-muted-foreground mb-1">
                <strong>How to test:</strong> {question.howToTest}
              </div>
            )}
            {relatedPOCs.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Answered in:{" "}
                {relatedPOCs.map((poc, idx) => (
                  <span key={poc.id}>
                    <Link href={`/poc/${poc.slug}`} className="text-primary hover:underline">
                      POC {poc.id}
                    </Link>
                    {idx < relatedPOCs.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
