import { useRef } from 'react';
import { motion } from 'framer-motion';

export function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    el.style.setProperty('--mx', `${(e.clientX - cx) * strength}px`);
    el.style.setProperty('--my', `${(e.clientY - cy) * strength}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transform: 'translate(var(--mx,0px), var(--my,0px))', transition: 'transform 0.25s ease-out' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
