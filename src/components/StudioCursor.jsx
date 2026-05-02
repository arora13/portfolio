import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function StudioCursor() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const dotX = useSpring(mx, { stiffness: 400, damping: 35, mass: 0.4 });
  const dotY = useSpring(my, { stiffness: 400, damping: 35, mass: 0.4 });
  const ringX = useSpring(mx, { stiffness: 110, damping: 22, mass: 0.8 });
  const ringY = useSpring(my, { stiffness: 110, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (!finePointer) return;
    const prev = document.documentElement.style.cursor;
    document.documentElement.style.cursor = 'none';

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      document.documentElement.style.cursor = prev;
      window.removeEventListener('mousemove', move);
    };
  }, [finePointer, mx, my]);

  if (!finePointer) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[10001] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] pointer-events-none shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_70%,transparent)]"
        style={{ left: dotX, top: dotY }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[10000] h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] pointer-events-none opacity-40"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
