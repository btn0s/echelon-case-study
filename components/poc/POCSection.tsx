interface POCSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function POCSection({ title, children, className }: POCSectionProps) {
  return (
    <section className={`mb-8 ${className || ""}`}>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-sm space-y-3">{children}</div>
    </section>
  );
}
