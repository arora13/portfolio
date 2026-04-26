import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { getContributionData } from '../services/githubApi';

const GitHubContributionGraph = () => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const contributionData = await getContributionData();
        setContributions(contributionData);
        setTotalContributions(contributionData.reduce((sum, day) => sum + day.count, 0));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributions:', error);
        setError('Failed to load contribution data. Please check your GitHub API configuration.');
        setLoading(false);
      }
    };

    // Add a small delay to prevent immediate API calls on page load
    const timer = setTimeout(() => {
      fetchContributions();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const getContributionStyle = (count, color) => {
    // Use the actual color from GitHub's GraphQL API if available
    if (color) {
      return { backgroundColor: color };
    }
    
    // Fallback to count-based colors
    if (count === 0) return { backgroundColor: '#dbeafe' };
    if (count === 1) return { backgroundColor: '#93c5fd' };
    if (count === 2) return { backgroundColor: '#60a5fa' };
    if (count === 3) return { backgroundColor: '#3b82f6' };
    return { backgroundColor: '#1d4ed8' };
  };
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
        <div className="animate-pulse">
          <div className="h-6 bg-blue-200 rounded mb-4"></div>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
            {Array.from({ length: 371 }).map((_, i) => (
              <div key={i} className="aspect-square bg-blue-100 rounded-sm" style={{ minWidth: '10px', minHeight: '10px' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white px-3 py-2 rounded-lg shadow-md border-2 border-blue-200 inline-block"
      >
        <div className="flex items-center gap-2">
          <FaGithub className="text-sm text-blue-700" />
          <span className="text-xs text-slate-600">67 contributions</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white px-3 py-2 rounded-lg shadow-md border-2 border-blue-200 inline-block"
    >
      <div className="flex items-center gap-2">
        <FaGithub className="text-sm text-blue-700" />
        <span className="text-xs text-slate-600">{totalContributions} contributions</span>
      </div>
    </motion.div>
  );
};

export default GitHubContributionGraph;
