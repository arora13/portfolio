import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import BinaryBackdrop from './BinaryBackdrop';

const EXAMPLE_QUESTIONS = [
  'What are you currently building?',
  "What's your tech stack?",
  'Tell me about your background',
  'What are your goals?',
];

const ConversationSection = () => {
  return (
    <section
      id="conversation"
      className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg)] px-6 py-20 sm:py-28 overflow-hidden"
    >
      <BinaryBackdrop className="opacity-35" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)] inline-flex items-center gap-2 border border-[var(--border)] px-3 py-1.5 bg-[var(--bg)]">
            <FaRobot size={11} /> Arjun&apos;s AI · Coming soon
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
            Talk with Arjun
            <br />
            <span className="text-[var(--muted)]">for real</span>
          </h2>

          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed max-w-md">
            I&apos;m building <strong className="text-[var(--fg)]">Arjun&apos;s AI</strong> — a{' '}
            <strong className="text-[var(--fg)]">trained voice agent</strong> so it feels like you&apos;re speaking with me
            directly: my stories, my projects, and eventually my voice and cadence — not a generic chatbot.
          </p>

          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              When it ships, you might ask…
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_QUESTIONS.map((q) => (
                <span
                  key={q}
                  className="border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-xs text-[var(--muted)]"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="border border-[var(--border)] bg-[var(--panel)] p-8 sm:p-10 flex flex-col items-center text-center gap-4 relative overflow-hidden"
        >
          <div
            className="absolute inset-x-0 top-0 h-1 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(135deg, var(--accent) 0px, var(--accent) 10px, var(--border) 10px, var(--border) 22px)',
            }}
            aria-hidden
          />
          <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] border border-[var(--accent)] text-[var(--accent)] px-3 py-1.5">
            Coming soon
          </span>
          <div className="w-14 h-14 rounded-full border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-[var(--accent)]">
            <FaRobot size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold">Arjun&apos;s AI</h3>
          <p className="text-[var(--muted)] text-sm leading-relaxed max-w-sm">
            The <strong className="text-[var(--fg)]">robot in the corner</strong> will open this experience once the agent is
            trained and wired up — voice-first, built to sound and respond like me.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversationSection;
