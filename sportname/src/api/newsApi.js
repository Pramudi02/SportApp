import axios from 'axios';

// Mock football news data with real Unsplash images (no API key required)
const getMockNews = () => {
  return [
    {
      title: 'Champions League Quarter-Finals Draw Completed',
      description: 'The UEFA Champions League quarter-finals draw has been completed with some exciting matchups set to take place next month.',
      urlToImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop',
      source: { name: 'Football Today' },
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/1',
    },
    {
      title: 'Premier League Top Scorer Race Heats Up',
      description: 'The race for the Premier League Golden Boot is intensifying as the season enters its final stretch with multiple players in contention.',
      urlToImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      source: { name: 'Sports Weekly' },
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/2',
    },
    {
      title: 'World Cup Qualifiers: Upsets and Surprises',
      description: 'Several unexpected results in the World Cup qualifying rounds have shaken up the standings and put traditional powerhouses under pressure.',
      urlToImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop',
      source: { name: 'Global Football' },
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/3',
    },
    {
      title: 'Transfer Window: Big Money Moves Expected',
      description: 'With the transfer window approaching, several top clubs are preparing record-breaking bids for star players across Europe.',
      urlToImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop',
      source: { name: 'Transfer News' },
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/4',
    },
    {
      title: 'Young Talent Shines in International Debut',
      description: 'A promising young player made an impressive debut for their national team, showcasing skills that have caught the attention of top scouts.',
      urlToImage: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=400&fit=crop',
      source: { name: 'Youth Football' },
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/5',
    },
    {
      title: 'Tactical Analysis: Evolution of Modern Football',
      description: 'How modern tactics and formations are changing the beautiful game with emphasis on pressing and possession-based football.',
      urlToImage: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=400&fit=crop',
      source: { name: 'Football Analytics' },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      url: 'https://example.com/news/6',
    },
  ];
};

/**
 * Get latest football news
 * @param {number} pageSize - Number of articles to fetch
 * @returns {Promise<Array>} List of news articles
 */
export const getFootballNews = async (pageSize = 10) => {
  try {
    // For production: Add your NewsAPI key here
    // const NEWS_API_KEY = 'YOUR_API_KEY_HERE';
    // const response = await axios.get('https://newsapi.org/v2/everything', {
    //   params: {
    //     q: 'football OR soccer',
    //     language: 'en',
    //     sortBy: 'publishedAt',
    //     pageSize: pageSize,
    //     apiKey: NEWS_API_KEY,
    //   },
    // });
    // return response.data.articles || [];

    // Using mock data (works without API key)
    return getMockNews().slice(0, pageSize);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return getMockNews().slice(0, pageSize);
  }
};
