const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

// Helper function to make authenticated requests
const makeRequest = async (endpoint) => {
  // Check if we have the required environment variables
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    throw new Error('GitHub API credentials not configured. Please check your .env file.');
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Dashboard'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GitHub API request failed:', error);
    throw error;
  }
};

// Get user's public repositories
export const getUserRepos = async (perPage = 100) => {
  return await makeRequest(`/user/repos?sort=updated&per_page=${perPage}`);
};

// Get language statistics for a repository
export const getRepoLanguages = async (owner, repo) => {
  return await makeRequest(`/repos/${owner}/${repo}/languages`);
};

// Get user's recent activity (public events)
export const getUserActivity = async (perPage = 30) => {
  return await makeRequest(`/users/${GITHUB_USERNAME}/events/public?per_page=${perPage}`);
};

// Get contribution data from GitHub GraphQL API
export const getContributionData = async () => {
  try {
    console.log('🚀 Using GitHub GraphQL API to get real contribution data...');
    
    const query = `
      query {
        viewer {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    console.log('🔑 Using token:', GITHUB_TOKEN ? `${GITHUB_TOKEN.substring(0, 10)}...` : 'NO TOKEN');
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`GraphQL API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 Raw API Response:', JSON.stringify(data, null, 2));
    
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const contributionCalendar = data.data.viewer.contributionsCollection.contributionCalendar;
    const totalContributions = contributionCalendar.totalContributions;
    
    console.log('✅ Successfully fetched contribution data from GraphQL API!');
    console.log('📊 Total contributions:', totalContributions);
    console.log('📅 Total weeks:', contributionCalendar.weeks.length);
    
    // Debug: Log some sample data
    console.log('🔍 Sample week data:', contributionCalendar.weeks[0]);
    console.log('🔍 Sample day data:', contributionCalendar.weeks[0]?.contributionDays[0]);
    
    // Process weeks to match GitHub's exact layout
    const contributionData = [];
    
    // GitHub's contribution graph: 7 rows (days) x 53 columns (weeks)
    // Each week has 7 days, but some weeks might start mid-week (empty days at start)
    contributionCalendar.weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day, dayIndex) => {
        if (day.date) {
          contributionData.push({
            date: day.date,
            count: day.contributionCount,
            color: day.color,
            dayOfWeek: new Date(day.date).getDay(),
            weekIndex: weekIndex,
            dayIndex: dayIndex
          });
          
          // Log first few days for debugging
          if (weekIndex < 3 && dayIndex < 7) {
            console.log(`📅 Week ${weekIndex}, Day ${dayIndex}: ${day.date} (${new Date(day.date).toLocaleDateString()}) - ${day.contributionCount} contributions, color: ${day.color}`);
          }
        }
      });
    });
    
    // Sort by date to ensure proper chronological order
    contributionData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    console.log('🔍 First 10 days:', contributionData.slice(0, 10));
    console.log('🔍 Last 10 days:', contributionData.slice(-10));
    console.log('🔍 Total days processed:', contributionData.length);
    
    console.log('📅 Total days with data:', contributionData.length);
    console.log('🎯 Days with contributions > 0:', contributionData.filter(d => d.count > 0).length);
    
    // Check if we got meaningful data
    if (contributionData.length === 0 || totalContributions === 0) {
      console.warn('⚠️ No contribution data received from GraphQL API');
      console.log('🔍 Full API response:', JSON.stringify(data, null, 2));
      throw new Error('No contribution data available');
    }
    
    console.log('🎯 This should now match your GitHub profile exactly!');
    
    return contributionData;
  } catch (error) {
    console.error('Error fetching contribution data from GraphQL:', error);
    throw error;
  }
};

// Calculate total commits across all repositories
export const getTotalCommits = async () => {
  try {
    const repos = await getUserRepos();
    let totalCommits = 0;
    
    // Get commits for each repository (limited to avoid rate limits)
    const commitPromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const commits = await makeRequest(`/repos/${repo.owner.login}/${repo.name}/commits?author=${GITHUB_USERNAME}&per_page=100`);
        return commits.length;
      } catch (error) {
        console.warn(`Could not fetch commits for ${repo.name}:`, error);
        return 0;
      }
    });
    
    const commitCounts = await Promise.all(commitPromises);
    totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);
    
    return totalCommits;
  } catch (error) {
    console.error('Error calculating total commits:', error);
    return 0;
  }
};

// Get language usage statistics
export const getLanguageStats = async () => {
  try {
    const repos = await getUserRepos();
    const languageStats = {};
    
    // Get languages for each repository (limit to avoid rate limits)
    const languagePromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const languages = await getRepoLanguages(repo.owner.login, repo.name);
        return languages;
      } catch (error) {
        console.warn(`Could not fetch languages for ${repo.name}:`, error);
        return {};
      }
    });
    
    const allLanguages = await Promise.all(languagePromises);
    
    // Aggregate language statistics
    allLanguages.forEach(languages => {
      Object.entries(languages).forEach(([language, bytes]) => {
        if (languageStats[language]) {
          languageStats[language] += bytes;
        } else {
          languageStats[language] = bytes;
        }
      });
    });
    
    // Convert to percentages and format
    const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
    const languagePercentages = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        name: language,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 100)
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5); // Top 5 languages
    
    return languagePercentages;
  } catch (error) {
    console.error('Error getting language stats:', error);
    return [];
  }
};

// Get recent activity formatted for display
export const getRecentActivity = async () => {
  try {
    const events = await getUserActivity();
    const activities = [];
    
    events.forEach(event => {
      let activity = null;
      
      switch (event.type) {
        case 'PushEvent':
          activity = {
            repo: event.repo.name,
            action: 'pushed to ' + event.payload.ref.replace('refs/heads/', ''),
            time: formatTimeAgo(event.created_at),
            type: 'push'
          };
          break;
        case 'CreateEvent':
          if (event.payload.ref_type === 'branch') {
            activity = {
              repo: event.repo.name,
              action: 'created branch ' + event.payload.ref,
              time: formatTimeAgo(event.created_at),
              type: 'create'
            };
          }
          break;
        case 'PullRequestEvent':
          activity = {
            repo: event.repo.name,
            action: event.payload.action + ' pull request',
            time: formatTimeAgo(event.created_at),
            type: 'pr'
          };
          break;
        case 'IssuesEvent':
          activity = {
            repo: event.repo.name,
            action: event.payload.action + ' issue',
            time: formatTimeAgo(event.created_at),
            type: 'issue'
          };
          break;
      }
      
      if (activity) {
        activities.push(activity);
      }
    });
    
    return activities.slice(0, 5); // Return last 5 activities
  } catch (error) {
    console.error('Error getting recent activity:', error);
    return [];
  }
};

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

// Main function to get all GitHub stats
export const getGitHubStats = async () => {
  try {
    const [repos, totalCommits, languageStats, recentActivity] = await Promise.all([
      getUserRepos(),
      getTotalCommits(),
      getLanguageStats(),
      getRecentActivity()
    ]);
    
    return {
      totalCommits,
      totalRepos: repos.length,
      languages: languageStats,
      recentActivity
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
};
