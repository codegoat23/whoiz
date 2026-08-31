"use client";

import { useEffect, useRef } from "react";
import { LiquidGlass } from "@ybouane/liquidglass";
import { Share2 } from "lucide-react";

interface LiquidGlassShareButtonProps {
  handleShare: () => void | Promise<void>;
  imageSrc?: string | null;
}

export function LiquidGlassShareButton({
  handleShare,
  imageSrc,
}: LiquidGlassShareButtonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!rootRef.current || !glassRef.current) return;

    const root = rootRef.current;
    const element = glassRef.current;

    // Signature liquid-glass button config — inspired by the LiquidGlass demo:
    // glass must refract something behind it, so the scene (avatar) is rendered
    // as a sibling of the glass inside the root.
    element.dataset.config = JSON.stringify({
      blurAmount: 0.2,
      refraction: 0.6,
      chromAberration: 0.06,
      edgeHighlight: 0.08,
      specular: 0.12,
      fresnel: 1.0,
      distortion: 0.02,
      cornerRadius: 50,
      zRadius: 26,
      opacity: 0.95,
      saturation: 0.05,
      tintStrength: 0.03,
      brightness: 0.05,
      shadowOpacity: 0.35,
      shadowSpread: 12,
      shadowOffsetY: 2,
      button: true,
      bevelMode: 0,
    });

    let instance: Awaited<
      ReturnType<typeof LiquidGlass.init>
    > | null = null;

    LiquidGlass.init({
      root,
      glassElements: [element],
    }).then((result) => {
      instance = result;
    });

    return () => {
      instance?.destroy();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        absolute
        bottom-[-6px]
        right-[calc(50%-104px)]
        size-12
        z-20
      "
    >
      {/* Scene — what the glass refracts. Rendered inside the root so the
          shader can sample it (the library only captures the root's children). */}
   

      {/* Glass element (direct child of root) */}
      <button
        ref={glassRef}
        type="button"
        onClick={handleShare}
        aria-label="Share"
        className="
          absolute
          inset-0
          size-12
          rounded-full
          flex
          items-center
          justify-center

          bg-white
          border
          border-black/70
          text-black
            border-2
          transition-transform
          duration-300
          hover:scale-105
          active:scale-95
        "
      >
        <Share2 className="size-[18px]" />
      </button>
    </div>
  );
}
