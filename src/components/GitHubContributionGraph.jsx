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
        
        // Fetch real contribution data from GitHub API
        const contributionData = await getContributionData();
        console.log('Contribution data:', contributionData);
        console.log('Total contributions:', contributionData.reduce((sum, day) => sum + day.count, 0));
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
    if (count === 0) return { backgroundColor: '#374151' }; // gray-700
    if (count === 1) return { backgroundColor: '#4ade80' }; // green-400
    if (count === 2) return { backgroundColor: '#22c55e' }; // green-500
    if (count === 3) return { backgroundColor: '#16a34a' }; // green-600
    return { backgroundColor: '#15803d' }; // green-700
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthLabels = [];
    let currentMonth = -1;
    
    contributions.forEach((contribution, index) => {
      const date = new Date(contribution.date);
      const month = date.getMonth();
      
      if (month !== currentMonth && index % 7 === 0) {
        monthLabels.push({
          month: months[month],
          position: index
        });
        currentMonth = month;
      }
    });
    
    return monthLabels;
  };

  if (loading) {
    return (
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
            {Array.from({ length: 371 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-700 rounded-sm" style={{ minWidth: '10px', minHeight: '10px' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <FaGithub className="text-2xl text-white" />
          <h3 className="text-xl font-semibold text-white">GitHub Contributions</h3>
        </div>
        <div className="text-red-400 text-sm">{error}</div>
      </div>
    );
  }

  const monthLabels = getMonthLabels();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e1e1e] px-3 py-2 rounded-lg shadow-md inline-block"
    >
      <div className="flex items-center gap-2">
        <FaGithub className="text-sm text-indigo-400" />
        <span className="text-xs text-gray-300">{totalContributions} contributions</span>
      </div>
    </motion.div>
  );
};

export default GitHubContributionGraph;
