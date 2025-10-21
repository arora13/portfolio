import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GitHubContributionGraph from './GitHubContributionGraph';
import TerminalActivity from './TerminalActivity';

const Projects = () => {
  return (
    <section id="projects" className="relative w-full bg-black text-white px-6 pt-20 pb-8 overflow-hidden">
      {/* background blur effects - makes it look fancy */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* main title - keeping it simple */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">Projects</h2>

        {/* Simple project list */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Project 1: AlgoFlow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">AlgoFlow</h3>
                  <p className="text-gray-400">Educational platform for learning algorithms</p>
                </div>
                <a 
                  href="https://algoflow.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  algoflow.org
                </a>
              </div>
            </motion.div>

            {/* Project 2: NextSwing AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">NextSwing AI</h3>
                  <p className="text-gray-400">Golf swing analysis app using computer vision and ML</p>
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* Project 3: RateMySchedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">RateMySchedule</h3>
                  <p className="text-gray-400">Social platform for rating and uploading schedules</p>
                  <span className="text-yellow-400 text-sm">Coming Soon</span>
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* Project 4: NBA ML Model */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">NBA ML Model</h3>
                  <p className="text-gray-400">Prediction model for games and top scorers</p>
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* Project 5: QuakeIQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">QuakeIQ</h3>
                  <p className="text-gray-400">AI earthquake planner app</p>
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* Project 6: DisasterNets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">DisasterNets</h3>
                  <p className="text-gray-400">AI emergency planner with 3D home modeling</p>
                  <span className="text-green-400 text-sm">50+ users</span>
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400 underline-offset-4"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats and social links section */}
        <div className="mt-20 space-y-12">
          {/* GitHub stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <GitHubContributionGraph />
          </div>

          {/* Terminal activity feed - shows I'm always coding */}
          <div className="max-w-4xl mx-auto">
            <TerminalActivity />
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-8 text-white text-2xl">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaGithub />
          </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaLinkedin />
          </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;