"use client";

import {
  motion,
  type Variants,
  type HTMLMotionProps,
  useReducedMotion,
} from "framer-motion";
import { type ReactNode, createContext, useContext } from "react";

// ---------------------------------------------------------------------------
// Reduced-motion context
// ---------------------------------------------------------------------------

const ReducedMotionContext = createContext(false);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const shouldReduce = useReducedMotion() ?? false;
  return (
    <ReducedMotionContext.Provider value={shouldReduce}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

function useReducedMotionCtx() {
  return useContext(ReducedMotionContext);
}

// ---------------------------------------------------------------------------
// Shared animation configs
// ---------------------------------------------------------------------------

export const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

// ---------------------------------------------------------------------------
// Wrapper props
// ---------------------------------------------------------------------------

type BaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** If true, animation replays every time it enters viewport */
  once?: boolean;
  /** Amount visible before triggering (0-1) */
  amount?: number;
};

// ---------------------------------------------------------------------------
// FadeIn — simple fade
// ---------------------------------------------------------------------------

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  ...props
}: BaseProps & Omit<HTMLMotionProps<"div">, keyof BaseProps>) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      variants={fadeInVariants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0 : duration, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FadeUp — fade + translate Y
// ---------------------------------------------------------------------------

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  ...props
}: BaseProps & Omit<HTMLMotionProps<"div">, keyof BaseProps>) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      variants={fadeUpVariants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0 : duration, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScaleIn — scale + fade
// ---------------------------------------------------------------------------

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  ...props
}: BaseProps & Omit<HTMLMotionProps<"div">, keyof BaseProps>) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      variants={scaleUpVariants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0 : duration, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SlideIn — slide from left or right + fade
// ---------------------------------------------------------------------------

type SlideInProps = BaseProps & {
  direction?: "left" | "right";
} & Omit<HTMLMotionProps<"div">, keyof BaseProps>;

export function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  ...props
}: SlideInProps) {
  const reduced = useReducedMotionCtx();
  const variants = direction === "left" ? slideFromLeftVariants : slideFromRightVariants;

  return (
    <motion.div
      variants={variants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0 : duration, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerContainer — parent that staggers children
// ---------------------------------------------------------------------------

type StaggerContainerProps = BaseProps & {
  stagger?: number;
} & Omit<HTMLMotionProps<"div">, keyof BaseProps>;

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  ...props
}: StaggerContainerProps) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      variants={staggerContainerVariants}
      custom={reduced ? 0 : stagger}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerItem — child used inside StaggerContainer
// ---------------------------------------------------------------------------

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn" | "scaleUp";
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

const itemVariants: Record<string, Variants> = {
  fadeUp: fadeUpVariants,
  fadeIn: fadeInVariants,
  scaleUp: scaleUpVariants,
};

export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
  duration = 0.5,
  ...props
}: StaggerItemProps) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      variants={itemVariants[variant]}
      transition={{ duration: reduced ? 0 : duration, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Floating — continuous subtle floating animation (hero visuals)
// ---------------------------------------------------------------------------

type FloatingProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
};

export function Floating({
  children,
  className,
  y = 8,
  duration = 3.5,
  delay = 0,
}: FloatingProps) {
  const reduced = useReducedMotionCtx();

  return (
    <motion.div
      animate={
        reduced
          ? {}
          : { y: [-y, y, -y] }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
