import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GitHubContributionGraph from './GitHubContributionGraph';
import TerminalActivity from './TerminalActivity';

const TAB_OPTIONS = ['Software', 'Embedded Systems', 'More'];

const SOFTWARE_PROJECTS = [
  {
    name: 'AlgoFlow',
    description: 'Educational platform for learning algorithms',
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
    <section id="projects" className="relative w-full bg-black text-white px-6 pt-20 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-semibold text-center mb-3"
        >
          Projects
        </motion.h2>
        <p className="text-center text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-12 sm:mb-14">
          A few things I have built or am building.
        </p>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="inline-flex rounded-xl border border-gray-700/90 bg-gray-900/50 p-1">
            {TAB_OPTIONS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    isActive ? 'bg-cyan-500 text-black font-semibold' : 'text-gray-300 hover:text-white'
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
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400">{project.description}</p>
                    <span className="inline-block mt-2 text-yellow-400/95 text-sm font-medium">Coming soon</span>
                  </div>
                  <span className="text-gray-500 text-sm shrink-0">Coming soon</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <div className="flex flex-wrap justify-center gap-4">
            <GitHubContributionGraph />
          </div>

          <div className="max-w-4xl mx-auto">
            <TerminalActivity />
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 text-white text-2xl">
            <a
              href="https://github.com/arora13"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/arjora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
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