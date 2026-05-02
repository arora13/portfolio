import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setP(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-[color-mix(in_srgb,var(--border)_80%,transparent)] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full w-full bg-[var(--accent)] origin-left will-change-transform"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
