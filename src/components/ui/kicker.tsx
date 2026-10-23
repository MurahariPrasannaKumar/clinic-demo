import clsx from "clsx";

export function Kicker({
  index,
  label,
  tone = "ink",
  className,
}: {
  index?: string;
  label: string;
  tone?: "ink" | "inverse";
  className?: string;
}) {
  const muted = tone === "ink" ? "text-ink-soft" : "text-white/55";
  const accent = tone === "ink" ? "text-green-text" : "text-white";

  return (
    <div
      className={clsx(
        "flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em]",
        muted,
        className,
      )}
    >
      {index && <span className={clsx("tabular-nums", accent)}>{index}</span>}
      <span className={clsx("h-px w-7", tone === "ink" ? "bg-green" : "bg-white/40")} aria-hidden />
      <span className={accent}>{label}</span>
    </div>
  );
}
