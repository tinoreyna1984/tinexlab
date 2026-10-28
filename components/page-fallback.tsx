export function PageFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-busy="true" aria-label="Cargando">
      <div className="h-5 w-40 animate-pulse rounded bg-surface-muted" />
      <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-surface-muted" />
      <div className="mt-5 h-5 max-w-2xl animate-pulse rounded bg-surface-muted" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
        <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
        <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
      </div>
    </div>
  );
}
