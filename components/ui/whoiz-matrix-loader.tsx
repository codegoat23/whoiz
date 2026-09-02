import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { WHOIZ_MATRIX } from "@/lib/whoiz-matrix";
import { DotmSquare1 } from "./dotm-square-1";

const POP_MAX_MS = 750;

type MatrixKind = keyof Pick<
  typeof WHOIZ_MATRIX,
  "edge" | "glyph" | "interior"
>;

const MAX_T = WHOIZ_MATRIX.cols + WHOIZ_MATRIX.rows - 2;

function DotLayout({
  kind,
  points,
}: {
  kind: MatrixKind;
  points: readonly (readonly [number, number])[];
}) {
  return (
    <>
      {points.map(([col, row]) => {
        const t = (col + row) / MAX_T;
        const style = {
          left: `${((col + 0.5) / WHOIZ_MATRIX.cols) * 100}%`,
          top: `${((row + 0.5) / WHOIZ_MATRIX.rows) * 100}%`,
          "--whoiz-pop-delay": `${Math.round(POP_MAX_MS * t)}ms`,
          "--whoiz-glow-delay": `${((col * 13 + row * 17) % 24) * 100}ms`,
        } as CSSProperties;

        return (
          <span
            key={`${kind}-${col}-${row}`}
            aria-hidden="true"
            className={cn("whoiz-matrix-dot", `whoiz-matrix-dot--${kind}`)}
            style={style}
          />
        );
      })}
    </>
  );
}

/**
 * The WHOIZ logo rendered as a dot matrix — the brand rounded-square icon
 * recreated from public/logos/logo1.svg (see scripts/generate-whoiz-matrix.mjs).
 */
export function WhoizMatrixMark({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative aspect-square", className)}
      style={size ? { width: size } : undefined}
    >
      <DotLayout kind="edge" points={WHOIZ_MATRIX.edge} />
      <DotLayout kind="glyph" points={WHOIZ_MATRIX.glyph} />
      <DotLayout kind="interior" points={WHOIZ_MATRIX.interior} />
    </div>
  );
}

/**
 * Full-screen WHOIZ brand loader used during authentication transitions
 * (login → dashboard, logout → login). Pure CSS animation, theme aware,
 * honours `prefers-reduced-motion`.
 */
export function WhoizMatrixLoader({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message ?? "Loading"}
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        
      />
 <DotmSquare1
      size={32}
      dotSize={4}
      speed={1.2}
      bloom
    />
      {message ? (
        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {message}
        </p>
      ) : null}
    </div>
  );
}