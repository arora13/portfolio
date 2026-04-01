import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-colors duration-300 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-4
        ${scrolled ? 'bg-black/70 shadow-md shadow-black/20' : 'bg-black/30'}`}
    >
      <motion.a
        href="#hero"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-cyan-400 tracking-tight shrink-0"
      >
        Arjun Arora
      </motion.a>

      <div className="flex items-center gap-3 sm:gap-6 md:gap-10 min-w-0">
        <ul className="flex gap-2 sm:gap-4 md:gap-6 text-gray-200 text-[11px] sm:text-xs md:text-sm font-medium">
          {navLinks.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="transition-colors duration-200 hover:text-white whitespace-nowrap"
            >
              <a href={link.href}>{link.label}</a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="/resume.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="text-white border border-cyan-400/80 px-3 py-1.5 sm:px-4 rounded-lg text-xs sm:text-sm hover:bg-cyan-400 hover:text-black transition-colors shrink-0"
        >
          Resume
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
