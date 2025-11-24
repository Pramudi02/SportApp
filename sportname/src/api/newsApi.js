import axios from 'axios';

// NewsAPI endpoint for football news
const NEWS_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2/everything';

/**
 * Get latest football news
 * @param {number} pageSize - Number of articles to fetch
 * @returns {Promise<Array>} List of news articles
 */
export const getFootballNews = async (pageSize = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: 'football OR soccer',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: pageSize,
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // Return mock data if API fails (for development)
    return getMockNews();
  }
};

/**
 * Mock news data for development/fallback
 */
const getMockNews = () => {
  return [
    {
      title: 'Champions League: Exciting Match Results',
      description: 'Latest updates from the UEFA Champions League matches with spectacular goals and dramatic finishes.',
      urlToImage: 'https://via.placeholder.com/400x200?text=Football+News+1',
      source: { name: 'Football Daily' },
      publishedAt: new Date().toISOString(),
      url: 'https://example.com/news1',
    },
    {
      title: 'Premier League Transfer News',
      description: 'Breaking news on the latest transfer deals and rumors across Premier League clubs.',
      urlToImage: 'https://via.placeholder.com/400x200?text=Football+News+2',
      source: { name: 'Sky Sports' },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: 'https://example.com/news2',
    },
    {
      title: 'World Cup Qualifiers Update',
      description: 'National teams battle it out in intense World Cup qualification matches around the globe.',
      urlToImage: 'https://via.placeholder.com/400x200?text=Football+News+3',
      source: { name: 'ESPN FC' },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      url: 'https://example.com/news3',
    },
  ];
};
