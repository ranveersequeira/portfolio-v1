import { layout, layoutWithLines, prepareWithSegments, type PreparedTextWithSegments } from "@chenglou/pretext";
import { startTransition, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PretextLinesProps = {
  text: string;
  className?: string;
  lineClassName?: string;
  bodyClassName?: string;
  as?: "div" | "p";
  once?: boolean;
  delayStep?: number;
};

type LayoutState = {
  lines: string[];
  lineHeight: number;
  height: number;
  lineCount: number;
};

const initialState: LayoutState = {
  lines: [],
  lineHeight: 0,
  height: 0,
  lineCount: 0,
};

export default function PretextLines({
  text,
  className,
  lineClassName,
  bodyClassName,
  as = "div",
  once = true,
  delayStep = 90,
}: PretextLinesProps) {
  const Component = as;
  const ref = useRef<HTMLDivElement | HTMLParagraphElement | null>(null);
  const preparedRef = useRef<{ key: string; prepared: PreparedTextWithSegments } | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState<LayoutState>(initialState);

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
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [once]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    const compute = async () => {
      await document.fonts.ready;
      if (cancelled || !node.isConnected) return;

      const width = node.clientWidth;
      if (!width) return;

      // Pretext's default break-word behavior can get visually harsh on narrow phone widths.
      // Fall back to regular DOM wrapping there and keep pretext for larger editorial surfaces.
      if (width < 420) {
        startTransition(() => {
          setState(initialState);
        });
        return;
      }

      // Leave a small safety margin so precomputed lines do not clip on narrower screens.
      const layoutWidth = Math.max(width - 6, 0);
      if (!layoutWidth) return;

      const styles = window.getComputedStyle(node);
      const fontSize = Number.parseFloat(styles.fontSize) || 16;
      const lineHeightValue = Number.parseFloat(styles.lineHeight);
      const lineHeight = Number.isFinite(lineHeightValue) ? lineHeightValue : fontSize * 1.18;
      const font = styles.font || `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}`;
      const preparedKey = `${font}__${text}`;

      if (!preparedRef.current || preparedRef.current.key !== preparedKey) {
        preparedRef.current = {
          key: preparedKey,
          prepared: prepareWithSegments(text, font),
        };
      }

      const prepared = preparedRef.current.prepared;
      const lineResult = layoutWithLines(prepared, layoutWidth, lineHeight);
      const metrics = layout(prepared, layoutWidth, lineHeight);

      startTransition(() => {
        setState({
          lines: lineResult.lines.map((line) => line.text),
          lineHeight,
          height: metrics.height,
          lineCount: metrics.lineCount,
        });
      });
    };

    const schedule = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        void compute();
      });
    };

    schedule();

    const observer = new ResizeObserver(() => {
      schedule();
    });

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text]);

  return (
    <Component
      ref={(node) => {
        ref.current = node;
      }}
      className={cn("kinetic-lines", className)}
      data-line-count={state.lineCount || undefined}
      data-layout-height={state.height || undefined}
    >
      {state.lines.length > 0 ? (
        state.lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className={cn("kinetic-line-shell", lineClassName)}
            style={state.lineHeight ? ({ minHeight: `${state.lineHeight}px` } as React.CSSProperties) : undefined}
          >
            <span
              className={cn("kinetic-line", isVisible && "is-visible", bodyClassName)}
              style={
                {
                  "--delay": `${index * delayStep}ms`,
                } as React.CSSProperties
              }
            >
              {line}
            </span>
          </span>
        ))
      ) : (
        <span className={cn("kinetic-line is-visible", bodyClassName)}>{text}</span>
      )}
    </Component>
  );
}
