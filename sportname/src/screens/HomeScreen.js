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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeagues } from '../redux/slices/footballSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
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
          <MaterialIcons name="sports-soccer" size={28} color={theme.colors.primary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.leagueName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.strLeague}
          </Text>
          <Text style={[styles.leagueCountry, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {item.strCountry || 'International'}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );

  if (loading && leagues.length === 0) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading leagues...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>FootyScope</Text>
        <Text style={styles.headerSubtitle}>
          Explore leagues and discover players worldwide
        </Text>
      </LinearGradient>

      <FlatList
        data={leagues}
        keyExtractor={(item) => item.idLeague}
        renderItem={renderLeagueCard}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No leagues available</Text>
          </View>
        }
      />
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
    paddingBottom: 30,
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
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
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
