import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getNextEventsByLeague, getLastEventsByLeague } from '../api/footballApi';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function MatchesScreen({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Popular league IDs from TheSportsDB
  const POPULAR_LEAGUES = [
    { id: '4328', name: 'Premier League' },
    { id: '4335', name: 'La Liga' },
    { id: '4331', name: 'Bundesliga' },
    { id: '4332', name: 'Serie A' },
    { id: '4334', name: 'Ligue 1' },
    { id: '4480', name: 'Champions League' },
  ];

  useEffect(() => {
    loadMatches();
  }, [activeTab]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const allMatches = [];
      
      // Fetch matches from multiple leagues
      for (const league of POPULAR_LEAGUES.slice(0, 3)) {
        const leagueMatches = activeTab === 'upcoming' 
          ? await getNextEventsByLeague(league.id)
          : await getLastEventsByLeague(league.id);
        
        if (leagueMatches && leagueMatches.length > 0) {
          allMatches.push(...leagueMatches.slice(0, 5)); // 5 matches per league
        }
      }
      
      // Remove duplicates based on idEvent
      const uniqueMatches = Array.from(
        new Map(allMatches.map(match => [match.idEvent, match])).values()
      );
      
      // Sort by date
      uniqueMatches.sort((a, b) => {
        const dateA = new Date(a.dateEvent + ' ' + (a.strTime || '00:00'));
        const dateB = new Date(b.dateEvent + ' ' + (b.strTime || '00:00'));
        return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
      });
      
      setMatches(uniqueMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMatches();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'TBD';
    return timeString.substring(0, 5); // HH:MM
  };

  const getMatchStatus = (match) => {
    if (match.intHomeScore !== null && match.intAwayScore !== null) {
      return 'Finished';
    }
    return 'Scheduled';
  };

  const renderMatchCard = ({ item }) => {
    const isFinished = item.intHomeScore !== null && item.intAwayScore !== null;
    const homeScore = item.intHomeScore || '-';
    const awayScore = item.intAwayScore || '-';

    // Debug log
    console.log('Match card:', {
      idEvent: item.idEvent,
      homeTeam: item.strHomeTeam,
      awayTeam: item.strAwayTeam
    });

    return (
      <TouchableOpacity
        style={[styles.matchCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => {
          console.log('Navigating to match:', item.idEvent);
          navigation.navigate('MatchDetails', { matchId: item.idEvent });
        }}
        activeOpacity={0.7}
      >
        <View style={styles.matchHeader}>
          <Text style={[styles.leagueText, { color: theme.colors.primary }]} numberOfLines={1}>
            {item.strLeague}
          </Text>
          <View style={[styles.statusBadge, { 
            backgroundColor: isFinished ? theme.colors.success + '20' : theme.colors.info + '20' 
          }]}>
            <Text style={[styles.statusText, { 
              color: isFinished ? theme.colors.success : theme.colors.info 
            }]}>
              {getMatchStatus(item)}
            </Text>
          </View>
        </View>

        <View style={styles.matchContent}>
          {/* Home Team */}
          <View style={styles.teamContainer}>
            <Feather name="shield" size={32} color={theme.colors.textSecondary} />
            <Text style={[styles.teamName, { color: theme.colors.text }]} numberOfLines={2}>
              {item.strHomeTeam}
            </Text>
          </View>

          {/* Score or Time */}
          <View style={styles.scoreContainer}>
            {isFinished ? (
              <>
                <Text style={[styles.score, { color: theme.colors.text }]}>
                  {homeScore} - {awayScore}
                </Text>
                <Text style={[styles.matchTime, { color: theme.colors.textSecondary }]}>
                  Full Time
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.vsText, { color: theme.colors.textSecondary }]}>VS</Text>
                <Text style={[styles.matchTime, { color: theme.colors.primary }]}>
                  {formatTime(item.strTime)}
                </Text>
              </>
            )}
          </View>

          {/* Away Team */}
          <View style={styles.teamContainer}>
            <Feather name="shield" size={32} color={theme.colors.textSecondary} />
            <Text style={[styles.teamName, { color: theme.colors.text }]} numberOfLines={2}>
              {item.strAwayTeam}
            </Text>
          </View>
        </View>

        <View style={styles.matchFooter}>
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>
              {formatDate(item.dateEvent)}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Feather name="activity" size={40} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>
          Live scores and fixtures
        </Text>

        {/* Toggle Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'upcoming' && styles.tabButtonActive,
              { backgroundColor: activeTab === 'upcoming' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }
            ]}
            onPress={() => setActiveTab('upcoming')}
            activeOpacity={0.7}
          >
            <Feather name="clock" size={20} color="#FFFFFF" />
            <Text style={styles.tabText}>Upcoming</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'past' && styles.tabButtonActive,
              { backgroundColor: activeTab === 'past' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }
            ]}
            onPress={() => setActiveTab('past')}
            activeOpacity={0.7}
          >
            <Feather name="check-circle" size={20} color="#FFFFFF" />
            <Text style={styles.tabText}>Recent</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Loading matches...
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.idEvent}
          renderItem={renderMatchCard}
          contentContainerStyle={styles.listContainer}
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
              <Feather name="inbox" size={64} color={theme.colors.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                No matches available
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
                {activeTab === 'upcoming' ? 'No upcoming matches found' : 'No recent matches found'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
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
    width: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  matchCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leagueText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchTime: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});
