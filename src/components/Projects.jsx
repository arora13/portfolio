import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TerminalActivity from './TerminalActivity';

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

const Projects = () => {
  const [activeTab, setActiveTab] = useState('Software');

  const displayedProjects = useMemo(() => {
    if (activeTab === 'Software') return SOFTWARE_PROJECTS;
    if (activeTab === 'Embedded Systems') return EMBEDDED_PROJECTS;
    return MORE_PROJECTS;
  }, [activeTab]);

  return (
    <section id="projects" className="comic-dot-bg relative w-full bg-gradient-to-b from-cyan-100 via-white to-blue-50 text-slate-900 px-6 pt-20 pb-16 sm:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-black text-center mb-3 text-blue-800 [text-shadow:2px_2px_0_#bfdbfe]"
        >
          Projects
        </motion.h2>
        <p className="text-center text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-12 sm:mb-14">
          A few things I have built or am building.
        </p>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="inline-flex rounded-xl border-[3px] border-slate-900 bg-white p-1 shadow-[4px_4px_0_#2563eb]">
            {TAB_OPTIONS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 sm:gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="comic-card bg-white/90 backdrop-blur-sm p-6 sm:p-8 hover:border-blue-400 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2">{project.name}</h3>
                    <p className="text-slate-600">{project.description}</p>
                  </div>
                  <div className="shrink-0 flex items-start">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border-[2px] border-slate-900 bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-[2px_2px_0_#93c5fd] hover:bg-blue-50 transition-colors"
                      >
                        <FaGithub className="text-lg" aria-hidden />
                        GitHub
                      </a>
                    ) : (
                      <span className="text-blue-600 text-sm font-semibold">Coming soon</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <div className="max-w-4xl mx-auto">
            <TerminalActivity />
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 text-blue-700 text-2xl">
            <a
              href="https://github.com/arora13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-blue-500 hover:text-blue-800 hover:bg-blue-100 transition-colors"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/arjora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-blue-500 hover:text-blue-800 hover:bg-blue-100 transition-colors"
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