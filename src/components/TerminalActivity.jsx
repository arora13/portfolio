import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTerminal, FaCloud, FaClock, FaGlobe, FaUser } from 'react-icons/fa';

const TerminalActivity = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get weather data
  useEffect(() => {
    const getWeather = async () => {
      try {
        // Using a free weather API (you can replace with your preferred service)
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=demo&units=metric');
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          // Fallback weather data
          setWeather({
            main: { temp: 22 },
            weather: [{ description: 'sunny', main: 'Clear' }],
            name: 'San Francisco'
          });
        }
      } catch (error) {
        // Fallback weather data
        setWeather({
          main: { temp: 22 },
          weather: [{ description: 'sunny', main: 'Clear' }],
          name: 'San Francisco'
        });
      }
      setWeatherLoading(false);
    };

    getWeather();
  }, []);

  // Terminal commands to display
  const commands = [
    { cmd: 'whoami', output: 'arjun:~$ whoami', result: 'arjun' },
    { cmd: 'date', output: 'arjun:~$ date', result: currentTime.toLocaleString() },
    { cmd: 'weather', output: 'arjun:~$ weather', result: weatherLoading ? 'Loading...' : `${Math.round(weather?.main?.temp || 22)}°C, ${weather?.weather?.[0]?.description || 'sunny'} in ${weather?.name || 'San Francisco'}` },
    { cmd: 'pwd', output: 'arjun:~$ pwd', result: '/home/arjun' },
    { cmd: 'ls -la', output: 'arjun:~$ ls -la', result: 'total 67\n-rw-r--r-- 1 arjun arjun 1234 Jan 15 10:30 projects/\n-rw-r--r-- 1 arjun arjun 5678 Jan 15 10:25 skills/\n-rw-r--r-- 1 arjun arjun 9012 Jan 15 10:20 experience/' },
    { cmd: 'git status', output: 'arjun:~$ git status', result: 'On branch main\nYour branch is up to date with origin/main.\n\nnothing to commit, working tree clean' },
    { cmd: 'npm run dev', output: 'arjun:~$ npm run dev', result: '> port@0.0.0 dev\n> vite\n\n  VITE v6.3.5  ready in 251 ms\n  ➜  Local:   http://localhost:5174/' }
  ];

  // Animate terminal lines
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        setTerminalLines(prev => [...prev, commands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      } else {
        // Reset after showing all commands
        setTimeout(() => {
          setTerminalLines([]);
          setCurrentLine(0);
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentLine, commands.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-4 font-mono text-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs">Terminal - arjun</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-1 min-h-[200px]">
        {terminalLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-1"
          >
            <div className="text-cyan-400">{line.output}</div>
            <div className="text-gray-300 whitespace-pre-line ml-2">{line.result}</div>
          </motion.div>
        ))}
        
        {/* Cursor */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-cyan-400"
        >
          arjun:~$ <span className="bg-cyan-400 text-cyan-400">█</span>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2 text-cyan-400">
          <FaClock className="text-xs" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <FaCloud className="text-xs" />
          <span>{weatherLoading ? 'Loading...' : `${Math.round(weather?.main?.temp || 22)}°C`}</span>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <FaGlobe className="text-xs" />
          <span>{weather?.name || 'San Francisco'}</span>
        </div>
        <div className="flex items-center gap-2 text-purple-400">
          <FaUser className="text-xs" />
          <span>arjun</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalActivity;
