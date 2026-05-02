import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../theme/ThemeProvider.jsx';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Chat', href: '#conversation' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-[9998] border-b border-[var(--border)] transition-colors duration-300 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 backdrop-blur-md ${
        scrolled ? 'bg-[color-mix(in_srgb,var(--bg)_92%,transparent)]' : 'bg-[color-mix(in_srgb,var(--bg)_85%,transparent)]'
      }`}
    >
      <motion.a
        href="#hero"
        className="font-display font-bold text-base sm:text-lg tracking-tight text-[var(--fg)] shrink-0 hover:text-[var(--accent)] transition-colors"
        whileHover={{ scale: 1.02 }}
      >
        Arjun Arora
      </motion.a>

      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-6 min-w-0 flex-1 md:flex-initial">
        <ul className="flex flex-wrap justify-end gap-x-4 gap-y-1 sm:gap-5 lg:gap-7 text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[var(--muted)]">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group whitespace-nowrap">
              <a href={link.href} className="block py-1 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors">
                {link.label}
              </a>
              <span
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-px origin-center scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://github.com/arora13"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/arjora"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-lg" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            aria-label={theme === 'dark' ? 'Use light contrast' : 'Use dark contrast'}
            title="Change contrast"
          >
            {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>

          <span
            className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[10px] font-semibold text-[var(--muted)] cursor-default"
            title="Resume is not available yet"
          >
            Resume <span className="text-[var(--accent)]">·</span> soon
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
