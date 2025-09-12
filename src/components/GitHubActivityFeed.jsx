import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaCode, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { getGitHubStats } from '../services/githubApi';

const GitHubActivityFeed = () => {
  const [stats, setStats] = useState({
    totalCommits: 0,
    totalRepos: 0,
    languages: [],
    recentActivity: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Language color mapping
  const languageColors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#ed8b00',
    'React': '#61dafb',
    'Vue': '#4fc08d',
    'Angular': '#dd0031',
    'Node.js': '#339933',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'SCSS': '#cf649a',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Go': '#00add8',
    'Rust': '#000000',
    'C++': '#00599c',
    'C#': '#239120',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Dart': '#0175c2',
    'R': '#276dc3',
    'MATLAB': '#e16737',
    'Shell': '#89e051',
    'PowerShell': '#012456',
    'Dockerfile': '#2496ed',
    'YAML': '#cb171e',
    'JSON': '#000000',
    'Markdown': '#083fa1',
    'TeX': '#3d6117'
  };

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const githubStats = await getGitHubStats();
        
        // Add colors to languages
        const languagesWithColors = githubStats.languages.map(lang => ({
          ...lang,
          color: languageColors[lang.name] || '#6b7280'
        }));
        
        setStats({
          ...githubStats,
          languages: languagesWithColors
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setError(error.message || 'Failed to load GitHub data. Please check your API configuration.');
        setLoading(false);
      }
    };

    // Add a small delay to prevent immediate API calls on page load
    const timer = setTimeout(() => {
      fetchGitHubStats();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
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
        className="bg-[#1e1e1e] p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <FaGithub className="text-2xl text-white" />
          <h3 className="text-xl font-semibold text-white">GitHub Activity</h3>
        </div>
        <div className="flex items-center gap-3 text-red-400">
          <FaExclamationTriangle />
          <span className="text-sm">{error}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e1e1e] p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaGithub className="text-2xl text-white" />
        <h3 className="text-xl font-semibold text-white">GitHub Activity</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">{stats.totalCommits}</div>
          <div className="text-sm text-gray-400">Total Commits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.totalRepos}</div>
          <div className="text-sm text-gray-400">Repositories</div>
        </div>
      </div>

      {/* Languages */}
      {stats.languages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <FaCode className="text-cyan-400" />
            Languages
          </h4>
          <div className="space-y-2">
            {stats.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: lang.color }}
                ></div>
                <span className="text-sm text-gray-300 flex-1">{lang.name}</span>
                <span className="text-sm text-gray-400">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-green-400" />
            Recent Activity
          </h4>
          <div className="space-y-2">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="text-sm text-gray-400">
                <span className="text-white font-medium">{activity.repo}</span>
                <span className="mx-2">•</span>
                <span>{activity.action}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubActivityFeed;
