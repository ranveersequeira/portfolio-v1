import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CascadeTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  once?: boolean;
  baseDelay?: number;
  step?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  repel?: "none" | "soft" | "strong";
};

export default function CascadeText({
  text,
  className,
  wordClassName,
  once = true,
  baseDelay = 0,
  step = 55,
  as = "span",
  repel = "none",
}: CascadeTextProps) {
  const words = text.split(" ");
  const Component = as;
  const ref = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scheduleRepel = (clientX?: number, clientY?: number) => {
    if (repel === "none") return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      const root = ref.current;
      if (!root) return;

      const hasPointer = typeof clientX === "number" && typeof clientY === "number";
      const maxDistance = repel === "strong" ? 180 : 116;
      const maxShift = repel === "strong" ? 24 : 13;

      wordRefs.current.forEach((word) => {
        if (!word) return;

        if (!hasPointer) {
          word.style.setProperty("--repel-x", "0px");
          word.style.setProperty("--repel-y", "0px");
          word.style.setProperty("--repel-letter", "0em");
          return;
        }

        const bounds = word.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const dx = centerX - clientX;
        const dy = centerY - clientY;
        const distance = Math.hypot(dx, dy);

        if (distance >= maxDistance) {
          word.style.setProperty("--repel-x", "0px");
          word.style.setProperty("--repel-y", "0px");
          word.style.setProperty("--repel-letter", "0em");
          return;
        }

        const force = ((maxDistance - distance) / maxDistance) ** 1.45;
        const safeDistance = distance || 1;
        const shiftX = (dx / safeDistance) * force * maxShift;
        const shiftY = (dy / safeDistance) * force * maxShift * 0.72;

        word.style.setProperty("--repel-x", `${shiftX.toFixed(2)}px`);
        word.style.setProperty("--repel-y", `${shiftY.toFixed(2)}px`);
        word.style.setProperty("--repel-letter", `${(force * 0.02).toFixed(3)}em`);
      });

      frameRef.current = null;
    });
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 240);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [once]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <Component
      ref={(node) => {
        ref.current = node;
      }}
      onPointerLeave={repel === "none" ? undefined : () => scheduleRepel()}
      onPointerMove={
        repel === "none"
          ? undefined
          : (event) => {
              scheduleRepel(event.clientX, event.clientY);
            }
      }
      className={cn("flex max-w-full flex-wrap gap-x-[0.28em] gap-y-[0.08em]", className)}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="kinetic-word-shell">
          <span
            className={cn("kinetic-word", isVisible && "is-visible", wordClassName)}
            style={
              {
                "--delay": `${baseDelay + index * step}ms`,
              } as React.CSSProperties
            }
          >
            <span
              ref={(node) => {
                wordRefs.current[index] = node;
              }}
              className={cn("kinetic-word-core", repel !== "none" && "kinetic-word-core--interactive")}
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </Component>
  );
}
