import { useMemo } from 'react';

function randomBits(len) {
  let s = '';
  for (let i = 0; i < len; i++) s += Math.random() > 0.48 ? '1' : '0';
  return s;
}

const BinaryBackdrop = ({ className = '', interactionX = null }) => {
  const columns = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      bits: randomBits(100),
    }));
  }, []);

  const n = columns.length;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 flex justify-between gap-px sm:gap-0.5 px-1 sm:px-4 max-h-full">
        {columns.map((col, i) => {
          const center = (i + 0.5) / n;
          const dist = interactionX == null ? 1 : Math.abs(center - interactionX);
          const glow = Math.max(0, 1 - dist * 4.5);
          const opacity = 0.04 + glow * 0.38;
          const accentMix = glow > 0.15 ? 'color-mix(in srgb, var(--accent) 38%, var(--fg))' : 'var(--fg)';
          return (
            <div
              key={col.id}
              className="font-mono text-[7px] sm:text-[9px] max-h-[min(100%,780px)] overflow-hidden leading-none tracking-wider transition-opacity duration-150 ease-out"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                opacity,
                color: accentMix,
              }}
            >
              {col.bits}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BinaryBackdrop;
