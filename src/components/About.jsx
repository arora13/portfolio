import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaMicrochip, FaUniversity } from 'react-icons/fa';
import BinaryBackdrop from './BinaryBackdrop';

const TIMELINE = [
  {
    date: '2024',
    title: 'Graduated high school',
    body: 'Completed high school in 2024 with a strong interest in STEM, programming, and entrepreneurship.',
    Icon: FaGraduationCap,
  },
  {
    date: '2024–2025',
    title: 'Rutgers University (freshman year)',
    body: 'Majored in Computer Science, foundational programming, and project-based learning.',
    Icon: FaLaptopCode,
  },
  {
    date: '2025–2028',
    title: 'Santa Clara University (sophomore–senior)',
    body: 'Pursuing CS with a Mathematics minor — software engineering, startups, and ambitious builds.',
    Icon: FaUniversity,
  },
  {
    date: '2025–Present',
    title: 'IoT software engineering research',
    body: 'Researcher at SCU on IoT-focused software engineering — embedded systems, sensors, and the stack around connected devices.',
    Icon: FaMicrochip,
  },
];

const COURSES = [
  'Data Structures',
  'Probability & Statistics I',
  'Probability & Statistics II',
  'Linear Algebra',
  'Discrete Mathematics',
  'Intro to Embedded Systems',
];

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen border-t border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg)] px-6 py-20 sm:py-28 overflow-hidden"
    >
      <BinaryBackdrop className="opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-4"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-8"
        >
          Software meets curiosity
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[var(--muted)] text-base sm:text-lg leading-relaxed mb-14"
        >
          I&apos;m <strong className="text-[var(--fg)] font-semibold">Arjun Arora</strong>, a Computer Science student at{' '}
          <strong className="text-[var(--fg)] font-semibold">Santa Clara University</strong>, passionate about building
          thoughtful software, exploring new stacks, and shipping creative solutions to real problems. I&apos;m also
          minoring in Mathematics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">Relevant coursework</h3>
          <ul className="flex flex-wrap gap-2">
            {COURSES.map((course) => (
              <li
                key={course}
                className="px-3 py-1.5 text-xs sm:text-sm border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)]"
              >
                {course}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h3 className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--muted)] mb-10">Timeline</h3>
          <div className="space-y-10 sm:space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-5 sm:gap-6"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-[var(--accent)]">
                    <item.Icon className="text-sm" aria-hidden />
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 min-h-[3rem] bg-[var(--border)] mt-4" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-2">{item.date}</p>
                  <h4 className="font-display text-lg sm:text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
