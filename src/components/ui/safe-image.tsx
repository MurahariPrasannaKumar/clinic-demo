"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { UserRound } from "lucide-react";
import clsx from "clsx";

/**
 * Wraps next/image for `fill` photos sourced from an external host (Unsplash
 * hotlinks here) that can occasionally fail to load. On error, swaps the
 * broken-image glyph for a themed placeholder instead of leaving a stray
 * browser icon — which is barely visible on a white background but glares on
 * the dark evening theme.
 */
export function SafeImage({
  alt,
  className,
  fallbackIconSize = 28,
  ...props
}: ImageProps & { fallbackIconSize?: number }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={clsx(
          "absolute inset-0 flex items-center justify-center bg-mist text-ink-soft/70",
          className,
        )}
        role="img"
        aria-label={alt || undefined}
      >
        <UserRound size={fallbackIconSize} strokeWidth={1.25} />
      </div>
    );
  }

  return <Image {...props} alt={alt} fill className={className} onError={() => setErrored(true)} />;
}
