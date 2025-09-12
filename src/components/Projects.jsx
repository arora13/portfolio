import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GitHubContributionGraph from './GitHubContributionGraph';
import VisitorCounter from './VisitorCounter';
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

        {/* each project gets its own full-screen section - looks more professional */}
        <div className="space-y-32">
          {/* Project 1: NextSwing AI - golf swing analysis with ML */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* left side - project info */}
              <div className="space-y-8">
                <h3 className="text-6xl font-bold text-white">NextSwing AI</h3>
                <p className="text-2xl text-gray-300">AI Golf Analysis App</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  AI-powered golf swing analysis app that provides detailed feedback and improvement suggestions for golfers using computer vision and machine learning.
                </p>
                {/* links with hover effects */}
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* right side - mock app interface */}
              <div className="bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* app header */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">NextSwing AI</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">📱</span>
                    </div>
                  </div>
                  {/* app content - showing progress */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* completed tasks */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Swing Analysis Complete</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">AI Feedback Generated</span>
                      </div>
                      {/* pending task */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Improvement Tips Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 2: RateMySchedule - student schedule rating platform */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* right side - project info (alternating layout) */}
              <div className="lg:order-2 space-y-8">
                <h3 className="text-6xl font-bold text-white">RateMySchedule</h3>
                <p className="text-2xl text-gray-300">Student Schedule Platform</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  Platform where students can rate and review their classmates' course schedules to help with academic planning and course selection.
                </p>
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* left side - mock app interface */}
              <div className="lg:order-1 bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* app header with calendar icon */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">RateMySchedule</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">📅</span>
                    </div>
                  </div>
                  {/* app content */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* task list showing app features */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Schedule Uploaded</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Peer Reviews Complete</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Rating Analysis Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 3: NBA ML Model - my sports betting side project (jk) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* Left side - project info */}
              <div className="space-y-8">
                <h3 className="text-6xl font-bold text-white">NBA ML Model</h3>
                <p className="text-2xl text-gray-300">Sports Prediction System</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  Machine learning model that predicts NBA game outcomes and player performance using advanced statistical analysis and historical data.
                </p>
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* Right side - mock app interface */}
              <div className="bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* App header with basketball icon */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">NBA ML Model</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">🏀</span>
                    </div>
                  </div>
                  {/* App content - ML pipeline progress */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* ML pipeline steps */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Data Processing Complete</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Model Training Finished</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Prediction Analysis Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 4: AlgoFlow - making CS education less painful */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* Right side - project info (alternating layout) */}
              <div className="lg:order-2 space-y-8">
                <h3 className="text-6xl font-bold text-white">AlgoFlow</h3>
                <p className="text-2xl text-gray-300">Educational Platform</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  Educational platform teaching data structures and algorithms to AP Computer Science and middle school students with interactive lessons.
                </p>
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* Left side - mock app interface */}
              <div className="lg:order-1 bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* App header with book icon */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">AlgoFlow</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">📚</span>
                    </div>
                  </div>
                  {/* App content - course progress */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* Course development progress */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Course Content Created</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Interactive Lessons Ready</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Student Progress Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 5: QuakeIQ - saving lives with ML (hopefully) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* Left side - project info */}
              <div className="space-y-8">
                <h3 className="text-6xl font-bold text-white">QuakeIQ</h3>
                <p className="text-2xl text-gray-300">Earthquake Prediction System</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  Intelligent earthquake prediction and analysis system using machine learning and seismic data processing for early warning systems.
                </p>
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* Right side - mock app interface */}
              <div className="bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* App header with earth icon */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">QuakeIQ</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">🌍</span>
                    </div>
                  </div>
                  {/* App content - seismic monitoring */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* Seismic monitoring progress */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Seismic Data Collected</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">ML Model Trained</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Early Warning System Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project 6: 3D Portfolio - this very website you're looking at */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* Right side - project info (alternating layout) */}
              <div className="lg:order-2 space-y-8">
                <h3 className="text-6xl font-bold text-white">3D Portfolio</h3>
                <p className="text-2xl text-gray-300">Interactive Portfolio</p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  A responsive and animated portfolio built using React, Tailwind CSS, Framer Motion, and Three.js with interactive 3D elements.
                </p>
                <div className="flex gap-8">
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LIVE APP
                  </a>
                  <a href="#" className="text-white underline decoration-red-500 underline-offset-4 hover:text-red-400 transition-colors text-lg">
                    LEARN MORE
                  </a>
                </div>
              </div>
              
              {/* Left side - mock app interface */}
              <div className="lg:order-1 bg-teal-100 p-12 rounded-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* App header with art icon */}
                  <div className="bg-pink-500 px-6 py-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg">3D Portfolio</span>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-pink-500 text-lg">🎨</span>
                    </div>
                  </div>
                  {/* App content - portfolio development */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-6">
                      {/* Portfolio development progress */}
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">3D Elements Implemented</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-gray-700 text-lg">Animations Complete</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="text-gray-500 text-lg">Performance Optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Stats and social links section */}
        <div className="mt-20 space-y-12">
          {/* GitHub stats and visitor counter */}
          <div className="flex flex-wrap justify-center gap-4">
            <GitHubContributionGraph />
            <VisitorCounter />
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
