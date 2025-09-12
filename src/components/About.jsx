import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaUniversity, FaLaptopCode, FaDownload } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen bg-black text-white px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold mb-6 text-white"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-xl leading-relaxed text-gray-300"
        >
          I'm <strong>Arjun Arora</strong>, a Computer Science student at <strong>Santa Clara University</strong>, passionate about building cool software, exploring new tech stacks, and developing creative solutions to real-world problems. I'm also minoring in Electrical Engineering and Mathematics.
        </motion.p>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-white mb-8">Timeline</h3>

          <VerticalTimeline lineColor="#888">
            <VerticalTimelineElement
              contentStyle={{ background: '#1e1e1e', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #1e1e1e' }}
              date="2024"
              iconStyle={{ background: '#4b6cb7', color: '#fff' }}
              icon={<FaUniversity />}
            >
              <h4>Graduated High School</h4>
              <p>Completed high school in 2024 with a strong interest in STEM, programming, and entrepreneurship.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              contentStyle={{ background: '#1e1e1e', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #1e1e1e' }}
              date="2024–2025"
              iconStyle={{ background: '#0f9b8e', color: '#fff' }}
              icon={<FaLaptopCode />}
            >
              <h4>Rutgers University (Freshman Year)</h4>
              <p>Majored in Computer Science, started foundational programming, and explored project-based learning.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              contentStyle={{ background: '#1e1e1e', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #1e1e1e' }}
              date="2025–2028"
              iconStyle={{ background: '#5b2c6f', color: '#fff' }}
              icon={<FaUniversity />}
            >
              <h4>Santa Clara University (Sophomore–Senior)</h4>
              <p>Currently pursuing a CS degree with a focus on software engineering, startup projects, and FAANG internship prep.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              iconStyle={{ background: '#fff', color: '#000' }}
              icon={<FaDownload />}
            />
          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


