import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaCloud, FaClock, FaGlobe, FaUser } from 'react-icons/fa';

const STATIC_COMMANDS = [
  { cmd: 'whoami', output: 'arjun:~$ whoami', result: 'arjun' },
  { cmd: 'pwd', output: 'arjun:~$ pwd', result: '/home/arjun' },
  {
    cmd: 'ls -la',
    output: 'arjun:~$ ls -la',
    result:
      'total 67\n-rw-r--r-- 1 arjun arjun 1234 Jan 15 10:30 projects/\n-rw-r--r-- 1 arjun arjun 5678 Jan 15 10:25 skills/\n-rw-r--r-- 1 arjun arjun 9012 Jan 15 10:20 experience/',
  },
  {
    cmd: 'git status',
    output: 'arjun:~$ git status',
    result: 'On branch main\nYour branch is up to date with origin/main.\n\nnothing to commit, working tree clean',
  },
  {
    cmd: 'npm run dev',
    output: 'arjun:~$ npm run dev',
    result: '> port@0.0.0 dev\n> vite\n\n  VITE v6.3.5  ready\n  ➜  Local:   http://localhost:5173/',
  },
];

const TerminalActivity = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const getWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=demo&units=metric'
        );
        if (cancelled) return;
        if (response.ok) setWeather(await response.json());
        else {
          setWeather({
            main: { temp: 22 },
            weather: [{ description: 'clear', main: 'Clear' }],
            name: 'San Francisco',
          });
        }
      } catch {
        if (!cancelled) {
          setWeather({
            main: { temp: 22 },
            weather: [{ description: 'clear', main: 'Clear' }],
            name: 'San Francisco',
          });
        }
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    };
    getWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let i = 0;
    let cycling = false;

    const tick = () => {
      if (cycling) return;
      if (i < STATIC_COMMANDS.length) {
        const line = STATIC_COMMANDS[i];
        setTerminalLines((prev) => [...prev, line]);
        i++;
        if (i >= STATIC_COMMANDS.length) {
          cycling = true;
          resetTimeoutRef.current = window.setTimeout(() => {
            setTerminalLines([]);
            i = 0;
            cycling = false;
            resetTimeoutRef.current = null;
          }, 2800);
        }
      }
    };

    const id = window.setInterval(tick, 1800);
    return () => {
      clearInterval(id);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const weatherLine =
    weatherLoading || !weather
      ? 'fetching wx…'
      : `${Math.round(weather.main?.temp ?? 22)}°C, ${weather.weather?.[0]?.description ?? 'clear'} — ${weather.name ?? 'SF'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5 font-mono text-xs sm:text-sm text-[var(--fg)]"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <span className="text-[var(--muted)] text-[10px] uppercase tracking-widest">Terminal — arjun</span>
      </div>

      <div className="space-y-1 min-h-[180px] text-[var(--muted)]">
        <div className="text-[var(--accent)] mb-2">
          arjun:~$ weather<span className="text-[var(--muted)]"> — {weatherLine}</span>
        </div>
        <div className="text-[var(--muted)] text-[10px] mb-3">
          date — {currentTime.toLocaleString()}
        </div>
        {terminalLines.map((line, index) => (
          <motion.div
            key={`${line.cmd}-${index}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 mb-2"
          >
            <div className="text-[var(--accent)]">{line.output}</div>
            <div className="text-[var(--fg)] whitespace-pre-line ml-2 opacity-90">{line.result}</div>
          </motion.div>
        ))}

        <motion.div
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-[var(--accent)] pt-1"
        >
          arjun:~$ <span className="bg-[var(--accent)] text-[var(--bg)] px-px">▍</span>
        </motion.div>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-3 text-[10px] sm:text-xs text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <FaClock />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCloud />
          <span>{weatherLoading ? '…' : `${Math.round(weather?.main?.temp || 22)}°C`}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaGlobe />
          <span>{weather?.name || 'San Francisco'}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser />
          <span>arjun</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalActivity;
