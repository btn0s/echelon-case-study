import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Study
          </Link>
        </nav>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
