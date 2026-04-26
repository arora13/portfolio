import { motion } from 'framer-motion'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Hey!", "I'm Arjun Arora.", "Scroll down to see my work."],
    loop: false,
    delaySpeed: 1500,
  })

  return (
    <section
      id="hero"
      className="comic-burst relative w-full min-h-screen text-slate-900 flex flex-col justify-center overflow-hidden px-6 sm:px-10 scroll-mt-20"
    >
      <div className="comic-dot-bg absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-6 left-6 z-10 inline-flex items-center rounded-md border-[3px] border-slate-900 bg-white px-4 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
        Supercharged Portfolio
      </div>

      <div className="relative z-10 grid grid-cols-1 items-center max-w-7xl mx-auto w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-left space-y-6"
        >
          <h1 className="max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-slate-900 [text-shadow:3px_3px_0_#bfdbfe]">
            {text}
            <Cursor cursorStyle="|" />
          </h1>
          <p className="max-w-2xl text-2xl font-semibold text-blue-800">Building software, AI, and systems with bold execution.</p>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
        aria-label="Scroll to about section"
      >
        <div className="w-[28px] h-[44px] rounded-full border-[3px] border-slate-900 flex justify-center pt-2 bg-white/90">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/90 animate-bounce" />
        </div>
      </a>
    </section>
  )
}

export default Hero