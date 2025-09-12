import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get or create visitor count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const currentCount = storedCount ? parseInt(storedCount) : 0;
    
    // Increment visitor count
    const newCount = currentCount + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    
    // Animate counter
    setIsVisible(true);
    
    // Animate the number counting up
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = newCount / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= newCount) {
        setVisitorCount(newCount);
        clearInterval(timer);
      } else {
        setVisitorCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1e1e1e] px-3 py-2 rounded-lg shadow-md inline-block"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FaEye className="text-sm text-indigo-400" />
        </motion.div>
        <motion.span 
          className="text-xs text-gray-300 font-mono"
          key={visitorCount}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {visitorCount.toLocaleString()} visitors
        </motion.span>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
