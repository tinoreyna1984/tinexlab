export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="title-neon text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
