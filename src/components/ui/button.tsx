import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "inverse";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-green",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "px-0 text-ink hover:text-green",
  inverse: "bg-white text-ink hover:bg-green-mist",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = clsx(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
