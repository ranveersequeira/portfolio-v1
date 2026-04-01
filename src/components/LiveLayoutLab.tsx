import { layout, layoutWithLines, prepareWithSegments, type PreparedTextWithSegments } from "@chenglou/pretext";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { labText } from "@/content/portfolio";

type LabState = {
  lines: string[];
  lineHeight: number;
  lineCount: number;
  height: number;
  width: number;
};

const initialState: LabState = {
  lines: [],
  lineHeight: 0,
  lineCount: 0,
  height: 0,
  width: 0,
};

export default function LiveLayoutLab() {
  const frameRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const preparedRef = useRef<{ key: string; prepared: PreparedTextWithSegments } | null>(null);
  const [ratio, setRatio] = useState(78);
  const [state, setState] = useState<LabState>(initialState);
  const deferredRatio = useDeferredValue(ratio);

  useEffect(() => {
    const panel = panelRef.current;
    const textNode = textRef.current;
    if (!panel || !textNode) return;

    let cancelled = false;

    const compute = async () => {
      await document.fonts.ready;
      if (cancelled || !panel.isConnected || !textNode.isConnected) return;

      const panelWidth = panel.clientWidth;
      if (!panelWidth) return;

      const targetWidth = Math.max(260, Math.floor(panelWidth * (deferredRatio / 100)));
      const styles = window.getComputedStyle(textNode);
      const fontSize = Number.parseFloat(styles.fontSize) || 16;
      const lineHeightValue = Number.parseFloat(styles.lineHeight);
      const lineHeight = Number.isFinite(lineHeightValue) ? lineHeightValue : fontSize * 1.2;
      const font = styles.font || `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}`;
      const preparedKey = `${font}__${labText}`;

      if (!preparedRef.current || preparedRef.current.key !== preparedKey) {
        preparedRef.current = {
          key: preparedKey,
          prepared: prepareWithSegments(labText, font),
        };
      }

      const prepared = preparedRef.current.prepared;
      const lineResult = layoutWithLines(prepared, targetWidth, lineHeight);
      const metrics = layout(prepared, targetWidth, lineHeight);

      setState({
        lines: lineResult.lines.map((line) => line.text),
        lineHeight,
        lineCount: metrics.lineCount,
        height: metrics.height,
        width: targetWidth,
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

    observer.observe(panel);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [deferredRatio]);

  return (
    <section className="studio-panel space-y-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <div className="section-kicker">Pretext Lab</div>
          <h2 className="section-title max-w-lg text-balance">
            Live line layout without leaning on DOM measurement.
          </h2>
          <p className="section-copy max-w-md">
            This block uses Pretext to prepare once and relayout on width changes using arithmetic.
            It is the kind of primitive that makes dynamic editorial UI and AI-generated surfaces much
            more practical.
          </p>

          <label className="space-y-3">
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.26em] text-[color:var(--muted-ink)]">
              <span>Column width</span>
              <span>{deferredRatio}%</span>
            </div>
            <input
              aria-label="Adjust layout width"
              className="lab-slider"
              max={100}
              min={48}
              step={1}
              type="range"
              value={ratio}
              onChange={(event) => setRatio(Number(event.target.value))}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div className="lab-metric">
              <span>Computed width</span>
              <strong>{state.width || 0}px</strong>
            </div>
            <div className="lab-metric">
              <span>Line count</span>
              <strong>{state.lineCount || 0}</strong>
            </div>
            <div className="lab-metric">
              <span>Layout height</span>
              <strong>{Math.round(state.height || 0)}px</strong>
            </div>
            <div className="lab-metric">
              <span>Mode</span>
              <strong>prepare + layout</strong>
            </div>
          </div>
        </div>

        <div ref={panelRef} className="lab-stage">
          <div
            className="lab-ruler"
            style={state.width ? ({ left: `${state.width}px` } as React.CSSProperties) : undefined}
          />
          <div
            ref={textRef}
            className="lab-copy"
            style={state.width ? ({ width: `${state.width}px` } as React.CSSProperties) : undefined}
          >
            {state.lines.length > 0
              ? state.lines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className="kinetic-line-shell"
                    style={
                      state.lineHeight
                        ? ({ minHeight: `${state.lineHeight}px` } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <span
                      className="kinetic-line is-visible"
                      style={
                        {
                          "--delay": `${index * 60}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {line}
                    </span>
                  </span>
                ))
              : labText}
          </div>
        </div>
      </div>
    </section>
  );
}
