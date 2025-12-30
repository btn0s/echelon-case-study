import { cn } from "@/lib/utils";

interface POCCalloutProps {
  variant?: "info" | "warning" | "success" | "error";
  children: React.ReactNode;
  className?: string;
}

export function POCCallout({ variant = "info", children, className }: POCCalloutProps) {
  const variants = {
    info: "bg-muted/50 border-l-2 border-primary",
    warning: "bg-yellow-500/10 border-l-2 border-yellow-500",
    success: "bg-green-500/10 border-l-2 border-green-500",
    error: "bg-red-500/10 border-l-2 border-red-500",
  };

  return (
    <div className={cn("p-3 rounded-md mb-4", variants[variant], className)}>
      <div className="text-sm">{children}</div>
    </div>
  );
}
