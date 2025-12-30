"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPOCNavigation, POCS } from "@/lib/pocs";

export function POCNavigation() {
  const pathname = usePathname();
  const slug = pathname.replace("/poc/", "");
  const { prev, next } = getPOCNavigation(slug);

  if (!prev && !next) return null;

  return (
    <nav className="not-prose flex items-center justify-between border-t pt-8 mt-12">
      <div>
        {prev && (
          <Link
            href={`/poc/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{prev.title}</span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/poc/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{next.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
