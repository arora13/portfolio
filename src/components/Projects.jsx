import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TerminalActivity from './TerminalActivity';
import BinaryBackdrop from './BinaryBackdrop';

const TAB_OPTIONS = ['Software', 'Embedded Systems', 'More'];

const SOFTWARE_PROJECTS = [
  {
    name: 'Algo Spark',
    description: 'Educational platform for learning algorithms visually — interactive flows, practice, and explanations.',
    github: 'https://github.com/arora13/algo-spark-flow',
  },
  {
    name: 'ReGrid',
    description:
      'Spatial siting intelligence for clean energy — map-based conflict analysis, risk scoring, optimization, and a spatial copilot (Mapbox, React, FastAPI + PostGIS).',
    github: 'https://github.com/arora13/ReGrid',
  },
  {
    name: 'Aria',
    description:
      'Cybersecurity agent in the works — monitors activity, detects intrusions and suspicious patterns, and helps reason through alerts and attack surfaces across systems and networks.',
    upcoming: true,
  },
  {
    name: 'NextSwing AI',
    description: 'Golf swing analysis app using computer vision and ML',
  },
  {
    name: 'RateMySchedule',
    description: 'Social platform for rating and uploading schedules',
  },
  {
    name: 'NBA ML Model',
    description: 'Prediction model for games and top scorers',
  },
  {
    name: 'QuakeIQ',
    description: 'AI earthquake planner app',
  },
  {
    name: 'DisasterNets',
    description: 'AI emergency planner with 3D home modeling',
  },
];

const EMBEDDED_PROJECTS = [
  {
    name: 'IoT Home Monitor',
    description: 'ESP32 sensor network for room health monitoring and alerts.',
  },
  {
    name: 'Autonomous Rover Controller',
    description: 'Microcontroller-based control stack and telemetry dashboard.',
  },
  {
    name: 'FPGA Signal Lab',
    description: 'Hardware acceleration experiments and digital logic prototypes.',
  },
];

const MORE_PROJECTS = [
  {
    name: 'Open Source Utilities',
    description: 'Tooling, scripts, and developer workflow automation.',
  },
  {
    name: 'Data + Analytics',
    description: 'Visualization and prediction projects built from real datasets.',
  },
];

function workCode(name) {
  const raw = name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  return (raw || 'PROJ').padEnd(4, 'J').slice(0, 4);
}

const Projects = () => {
  const [activeTab, setActiveTab] = useState('Software');

  const displayedProjects = useMemo(() => {
    if (activeTab === 'Software') return SOFTWARE_PROJECTS;
    if (activeTab === 'Embedded Systems') return EMBEDDED_PROJECTS;
    return MORE_PROJECTS;
  }, [activeTab]);

  const total = displayedProjects.length;

  return (
    <section
      id="projects"
      className="relative border-t border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] px-6 py-20 sm:py-28 overflow-hidden"
    >
      <BinaryBackdrop className="opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.45em] text-[var(--accent)] mb-4"
        >
          Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4"
        >
          W O R K
        </motion.h2>

        <p className="text-[var(--muted)] text-sm max-w-lg mb-10">
          A few things I have built or am building — same projects as before, presented in a tighter, catalog-style list.
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {TAB_OPTIONS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <motion.button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 py-2 border transition-colors ${
                  isActive
                    ? 'border-[var(--accent)] text-[var(--fg)] bg-[var(--bg-elevated)] shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_15%,transparent)]'
                    : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]'
                }`}
              >
                {tab}
              </motion.button>
            );
          })}
        </div>

        <ul className="space-y-0 border-t border-[var(--border)]">
          {displayedProjects.map((project, index) => {
            const code = workCode(project.name);
            const ref = `${code}-${String(index + 1).padStart(4, '0')}/${String(total).padStart(2, '0')}`;
            return (
              <motion.li
                key={project.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="relative border-b border-[var(--border)] py-6 sm:py-8 group pl-0 hover:pl-4 transition-[padding] duration-300 ease-out"
              >
                <span
                  className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_18px_var(--accent)]"
                  aria-hidden
                />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-[var(--muted)] mb-2 tracking-wide">
                      {project.name}{' '}
                      <span className="text-[var(--accent)]">#{ref}</span>
                    </p>
                    <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl group-hover:text-[var(--fg)] transition-colors">
                      {project.description}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 px-3 py-2 border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      >
                        <FaGithub className="text-sm" aria-hidden />
                        GitHub
                      </a>
                    ) : project.upcoming ? (
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 py-2 border border-[var(--accent)] text-[var(--accent)]">
                        Upcoming soon
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-[var(--muted)]">Coming soon</span>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-20 space-y-12">
          <TerminalActivity />
          <div className="flex justify-center gap-6 text-xl text-[var(--muted)]">
            <a
              href="https://github.com/arora13"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/arjora"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
