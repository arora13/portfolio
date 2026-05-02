import { useState, useCallback } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import BinaryBackdrop from './BinaryBackdrop'
import { Magnetic } from './Magnetic'

function SplitWord({ text, className = '', delay = 0 }) {
  const chars = text.split('')
  return (
    <span className={className} aria-hidden>
      {chars.map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block origin-bottom"
          initial={{ opacity: 0, y: '1.1em', rotateX: -55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.028,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  const [interactionX, setInteractionX] = useState(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const spotlight = useMotionTemplate`radial-gradient(580px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)`

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setInteractionX((e.clientX - rect.left) / rect.width)
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }, [mx, my])

  const onMouseLeave = useCallback(() => {
    setInteractionX(null)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10 scroll-mt-20 bg-[var(--bg)]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <BinaryBackdrop interactionX={interactionX} />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-70"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[var(--muted)] mb-8 flex flex-wrap gap-x-3 gap-y-1 items-center"
        >
          <span>Coding from California</span>
          <span className="text-[var(--accent)]">·</span>
          <span>CS @ Santa Clara University</span>
          <span className="text-[var(--accent)]">·</span>
          <Magnetic strength={0.25}>
            <a href="#contact" className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)] hover:border-[var(--accent)] pb-px">
              Open to collaboration →
            </a>
          </Magnetic>
        </motion.p>

        <h1 className="font-display font-extrabold leading-[0.9] tracking-tight perspective-[1200px] text-[clamp(2.6rem,9vw,6.5rem)] [transform-style:preserve-3d]">
          <span className="block text-[var(--fg)] mb-1">
            <SplitWord text="Software" delay={0.08} />
          </span>
          <motion.span
            className="block text-[var(--accent)] drop-shadow-[0_0_42px_color-mix(in_srgb,var(--accent)_38%,transparent)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.32, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <SplitWord text="Engineer" delay={0.18} />
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-10 max-w-xl text-sm sm:text-base text-[var(--muted)] leading-relaxed"
        >
          Building software, AI, and systems with bold execution. Math minor. Interested in embedded systems,
          research, and products that feel alive — motion, clarity, and craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-12 flex flex-wrap gap-6 items-center"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="group relative font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] px-1"
            >
              <span className="relative z-10 group-hover:text-[var(--accent)] transition-colors">Let&apos;s talk</span>
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--accent)] origin-left scale-x-100 group-hover:scale-x-110 transition-transform" />
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a
              href="#projects"
              className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-2"
            >
              View work
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
                ↗
              </motion.span>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 font-mono text-[10px] text-[var(--muted)] flex flex-wrap gap-6"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Interactive portfolio
          </span>
          <span>Binary field reacts to cursor</span>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        aria-label="Scroll to about section"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <span className="block h-8 w-px bg-[color-mix(in_srgb,var(--accent)_40%,var(--border))]" />
      </motion.a>
    </section>
  )
}

export default Hero
