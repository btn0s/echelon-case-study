import Link from "next/link";

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Case Study
            </Link>

            <div className="text-sm text-muted-foreground">Playground</div>
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
}

