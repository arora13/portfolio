import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaUniversity, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="comic-dot-bg relative w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-100 text-slate-900 px-6 py-16 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-black mb-6 text-blue-800 [text-shadow:2px_2px_0_#bfdbfe]"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-xl leading-relaxed text-slate-700"
        >
          I'm <strong>Arjun Arora</strong>, a Computer Science student at <strong>Santa Clara University</strong>, passionate about building cool software, exploring new tech stacks, and developing creative solutions to real-world problems. I'm also minoring in Mathematics.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-4">Relevant Coursework</h3>
          <p className="text-slate-600 text-sm sm:text-base mb-5 max-w-2xl">
            Highlights from my CS and math coursework; additional courses include algorithms, calculus, and more.
          </p>
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {[
              'Data Structures',
              'Probability & Statistics I',
              'Probability & Statistics II',
              'Linear Algebra',
              'Discrete Mathematics',
              'Intro to Embedded Systems',
            ].map((course) => (
              <li
                key={course}
                className="rounded-lg border-[3px] border-slate-900 bg-white px-3 py-2 text-sm sm:text-base text-slate-700 shadow-[3px_3px_0_#60a5fa]"
              >
                {course}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-blue-800 mb-8">Timeline</h3>

          <VerticalTimeline lineColor="#93c5fd">
            <VerticalTimelineElement
              contentStyle={{ background: '#ffffff', color: '#1e293b', border: '2px solid #bfdbfe', boxShadow: '0 8px 20px rgba(37, 99, 235, 0.1)' }}
              contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
              date="2024"
              iconStyle={{ background: '#2563eb', color: '#fff' }}
              icon={<FaUniversity />}
            >
              <h4>Graduated High School</h4>
              <p>Completed high school in 2024 with a strong interest in STEM, programming, and entrepreneurship.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              contentStyle={{ background: '#ffffff', color: '#1e293b', border: '2px solid #bfdbfe', boxShadow: '0 8px 20px rgba(37, 99, 235, 0.1)' }}
              contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
              date="2024–2025"
              iconStyle={{ background: '#0284c7', color: '#fff' }}
              icon={<FaLaptopCode />}
            >
              <h4>Rutgers University (Freshman Year)</h4>
              <p>Majored in Computer Science, started foundational programming, and explored project-based learning.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              contentStyle={{ background: '#ffffff', color: '#1e293b', border: '2px solid #bfdbfe', boxShadow: '0 8px 20px rgba(37, 99, 235, 0.1)' }}
              contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
              date="2025–2028"
              iconStyle={{ background: '#1d4ed8', color: '#fff' }}
              icon={<FaUniversity />}
            >
              <h4>Santa Clara University (Sophomore–Senior)</h4>
              <p>Currently pursuing a CS degree with a Mathematics minor, focused on software engineering and startup projects.</p>
            </VerticalTimelineElement>

          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


