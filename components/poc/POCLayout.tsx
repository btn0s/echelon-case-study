import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getPOCBySlug, getPOCNavigation } from "@/lib/pocs";

interface POCLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export function POCLayout({ slug, children }: POCLayoutProps) {
  const poc = getPOCBySlug(slug);
  if (!poc) {
    throw new Error(`POC with slug "${slug}" not found`);
  }

  const navigation = getPOCNavigation(slug);
  const statusColors = {
    pending: "secondary",
    "in-progress": "default",
    complete: "default",
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Study
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge variant="outline" className="mb-2">
                POC {poc.id}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{poc.title}</h1>
            </div>
            <Badge variant={statusColors[poc.status]}>{poc.status}</Badge>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{poc.objective}</p>
            </CardContent>
          </Card>
          {poc.gddMapping && poc.gddMapping.length > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>GDD Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1">
                  {poc.gddMapping.map((mapping, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {mapping}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">{children}</div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t flex items-center justify-between">
          {navigation.prev ? (
            <Link
              href={`/poc/${navigation.prev.slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: {navigation.prev.title}
            </Link>
          ) : (
            <div />
          )}
          {navigation.next ? (
            <Link
              href={`/poc/${navigation.next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Next: {navigation.next.title}
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
