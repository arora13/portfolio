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
      className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-colors duration-300 px-8 py-4 flex items-center justify-between 
        ${scrolled ? 'bg-black/60 shadow-md' : 'bg-black/30'}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-3xl font-extrabold text-cyan-400 tracking-tight cursor-pointer"
      >
        Arjun Arora
      </motion.div>

      <div className="flex items-center space-x-10">
        <ul className="flex gap-6 text-gray-200 text-sm font-medium">
          {navLinks.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors duration-200 hover:text-white"
            >
              <a href={link.href}>{link.label}</a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="/resume.pdf"
          download
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="text-white border border-cyan-400 px-4 py-1.5 rounded-lg text-sm hover:bg-cyan-400 hover:text-black transition"
        >
          Resume
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
