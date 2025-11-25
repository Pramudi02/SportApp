import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeagues } from '../redux/slices/footballSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { getFootballNews } from '../api/newsApi';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { leagues, loading } = useSelector((state) => state.football);
  const { isDarkMode } = useSelector((state) => state.theme);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'leagues'
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadLeagues();
    loadNews();
  }, []);

  const loadLeagues = () => {
    dispatch(fetchLeagues());
  };

  const loadNews = async () => {
    setNewsLoading(true);
    try {
      const articles = await getFootballNews(10);
      setNews(articles);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setNewsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeTab === 'news') {
      await loadNews();
    } else {
      await loadLeagues();
    }
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  };

  const openArticle = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening article:', err));
  };

  const renderNewsCard = ({ item, index }) => {
    if (index >= 3) return null; // Only show first 3 news items
    
    return (
      <TouchableOpacity
        style={[styles.newsCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => openArticle(item.url)}
        activeOpacity={0.7}
      >
        {item.urlToImage ? (
          <Image
            source={{ uri: item.urlToImage }}
            style={styles.newsImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.newsImagePlaceholder, { backgroundColor: theme.colors.cardLight }]}>
            <Feather name="disc" size={48} color={theme.colors.textSecondary} />
          </View>
        )}
        <View style={styles.newsContent}>
          <View style={styles.newsHeader}>
            <Text style={[styles.newsSource, { color: theme.colors.primary }]} numberOfLines={1}>
              {item.source.name}
            </Text>
            <Text style={[styles.newsDate, { color: theme.colors.textSecondary }]}>
              {formatDate(item.publishedAt)}
            </Text>
          </View>
          <Text style={[styles.newsTitle, { color: theme.colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.newsDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLeagueCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={() => navigation.navigate('LeagueDetails', { leagueId: item.idLeague })}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[theme.colors.gradient1 + '20', theme.colors.gradient2 + '10']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
          <Feather name="disc" size={28} color={theme.colors.primary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.leagueName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.strLeague}
          </Text>
          <Text style={[styles.leagueCountry, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {item.strCountry || 'International'}
          </Text>
        </View>
        <Feather name="chevron-right" size={24} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );

  if (loading && leagues.length === 0 && newsLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ImageBackground
        source={{ uri: 'https://ik.imagekit.io/pr2222/Portfolio-assets/pngtree-soccer-player-in-action-mixed-media-created-with-generative-ai-technology-image_15990288.jpg' }}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerOverlay}>
        <Text style={styles.headerTitle}>FootyScope</Text>
        <Text style={styles.headerSubtitle}>
          Your ultimate football companion
        </Text>
        
        {/* Toggle Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'news' && styles.tabButtonActive,
              { backgroundColor: activeTab === 'news' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }
            ]}
            onPress={() => setActiveTab('news')}
            activeOpacity={0.7}
          >
            <Feather name="file-text" size={20} color="#FFFFFF" />
            <Text style={styles.tabText}>Top News</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'leagues' && styles.tabButtonActive,
              { backgroundColor: activeTab === 'leagues' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }
            ]}
            onPress={() => setActiveTab('leagues')}
            activeOpacity={0.7}
          >
            <Feather name="award" size={20} color="#FFFFFF" />
            <Text style={styles.tabText}>Upcoming Leagues</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {activeTab === 'news' ? (
          <View style={styles.contentContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Latest News</Text>
            </View>
            
            {newsLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            ) : (
              <>
                <FlatList
                  data={news.slice(0, 3)}
                  keyExtractor={(item, index) => `news-${index}`}
                  renderItem={renderNewsCard}
                  scrollEnabled={false}
                />
                
                <TouchableOpacity
                  style={[styles.viewMoreButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
                  onPress={() => navigation.navigate('News')}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.viewMoreText, { color: theme.colors.primary }]}>View More News</Text>
                  <Feather name="arrow-right" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Football Leagues</Text>
            </View>
            
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            ) : (
              <FlatList
                data={leagues}
                keyExtractor={(item) => item.idLeague}
                renderItem={renderLeagueCard}
                scrollEnabled={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No leagues available</Text>
                  </View>
                }
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(15, 39, 68, 1)',
    paddingBottom: 20,
  },
  headerImage: {
    opacity: 0.3,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  tabButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  newsCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  newsImagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContent: {
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  newsDate: {
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  leagueCountry: {
    fontSize: 13,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
