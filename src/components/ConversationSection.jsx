import { motion } from 'framer-motion';
import { FaRobot, FaHardHat } from 'react-icons/fa';

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
      className="comic-dot-bg relative w-full bg-gradient-to-b from-blue-50 via-white to-cyan-50 text-slate-900 px-6 pt-20 pb-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-md border-[3px] border-slate-900 bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700 shadow-[3px_3px_0_#2563eb]">
            <FaRobot size={11} /> AI-Powered
          </span>

          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-blue-800 [text-shadow:2px_2px_0_#bfdbfe]">
            Have a conversation<br />with Arjun
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-md">
            Soon you&apos;ll be able to ask anything here — projects, stack, background, goals — through a voice-and-chat assistant. It&apos;s still being wired up; check the note on the right.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Try asking…</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_QUESTIONS.map((q) => (
                <span
                  key={q}
                  className="rounded-lg border-[2px] border-slate-900 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-[2px_2px_0_#93c5fd]"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="comic-card relative overflow-hidden bg-amber-50 border-[3px] border-slate-900 p-8 sm:p-10 flex flex-col items-center text-center gap-4 shadow-[6px_6px_0_#d97706]"
        >
          <div
            className="absolute inset-x-0 top-0 h-2 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(135deg, #fbbf24 0px, #fbbf24 12px, #1e293b 12px, #1e293b 24px)',
            }}
            aria-hidden
          />
          <span className="mt-2 inline-flex items-center gap-2 rounded-md border-[3px] border-slate-900 bg-amber-400 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-slate-900 shadow-[3px_3px_0_#1e293b]">
            <FaHardHat size={12} /> Under construction
          </span>
          <div className="w-16 h-16 rounded-full bg-amber-500 border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_#1e293b]">
            <FaRobot size={26} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">Voice assistant</h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-sm">
            The <strong>blue robot</strong> in the bottom-right is a preview: voice, chat, and backend may not work reliably yet. Thanks for bearing with me while I finish it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversationSection;
