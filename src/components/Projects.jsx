import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GitHubContributionGraph from './GitHubContributionGraph';
import TerminalActivity from './TerminalActivity';

const Projects = () => {
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

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">AlgoFlow</h3>
                  <p className="text-gray-400">Educational platform for learning algorithms</p>
                </div>
                <a
                  href="https://algoflow.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  algoflow.org
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">NextSwing AI</h3>
                  <p className="text-gray-400">Golf swing analysis app using computer vision and ML</p>
                </div>
                <a
                  href="https://github.com/arora13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">RateMySchedule</h3>
                  <p className="text-gray-400">Social platform for rating and uploading schedules</p>
                  <span className="inline-block mt-2 text-yellow-400/95 text-sm font-medium">Coming soon</span>
                </div>
                <a
                  href="https://github.com/arora13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">NBA ML Model</h3>
                  <p className="text-gray-400">Prediction model for games and top scorers</p>
                </div>
                <a
                  href="https://github.com/arora13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">QuakeIQ</h3>
                  <p className="text-gray-400">AI earthquake planner app</p>
                </div>
                <a
                  href="https://github.com/arora13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/90 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">DisasterNets</h3>
                  <p className="text-gray-400">AI emergency planner with 3D home modeling</p>
                  <span className="inline-block mt-2 text-emerald-400/95 text-sm font-medium">50+ users</span>
                </div>
                <a
                  href="https://github.com/arora13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 shrink-0 transition-colors underline decoration-cyan-400/80 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>
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
              href="https://www.linkedin.com/in/arjunarora"
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