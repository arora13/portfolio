import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Projects = () => {
  return (
    <section id="projects" className="relative w-full bg-black text-white px-6 pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e1e1e] p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">3D Portfolio Website</h3>
            <p className="text-sm text-gray-300 mb-4">
              A responsive and animated portfolio built using React, Tailwind CSS, Framer Motion, and Three.js.
            </p>
            <a href="#" className="text-indigo-400 text-sm font-semibold hover:underline flex items-center gap-1">
              View Project <span className="ml-1">→</span>
            </a>
          </motion.div>

          <motion.div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-400">Coming Soon</p>
          </motion.div>

          <motion.div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-400">Coming Soon</p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-8 mt-8 text-white text-2xl">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
