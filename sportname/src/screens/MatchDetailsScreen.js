import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getEventDetails } from '../api/footballApi';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function MatchDetailsScreen({ route }) {
  const { matchId } = route.params;
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadMatchDetails();
  }, [matchId]);

  const loadMatchDetails = async () => {
    try {
      const data = await getEventDetails(matchId);
      setMatch(data);
    } catch (error) {
      console.error('Error loading match details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading match details...
        </Text>
      </View>
    );
  }

  if (!match) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Feather name="alert-circle" size={64} color={theme.colors.error} />
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Match details not found
        </Text>
      </View>
    );
  }

  const isFinished = match.intHomeScore !== null && match.intAwayScore !== null;
  const homeScore = match.intHomeScore || '-';
  const awayScore = match.intAwayScore || '-';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.leagueTitle}>{match.strLeague}</Text>
        <Text style={styles.seasonText}>{match.strSeason}</Text>
        
        {/* Score Display */}
        <View style={styles.scoreSection}>
          <View style={styles.teamSection}>
            <Feather name="shield" size={48} color="#FFFFFF" />
            <Text style={styles.teamName}>{match.strHomeTeam}</Text>
          </View>

          <View style={styles.scoreDisplay}>
            {isFinished ? (
              <>
                <Text style={styles.scoreText}>
                  {homeScore} - {awayScore}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Full Time</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.vsText}>VS</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {match.strTime ? match.strTime.substring(0, 5) : 'TBD'}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.teamSection}>
            <Feather name="shield" size={48} color="#FFFFFF" />
            <Text style={styles.teamName}>{match.strAwayTeam}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Match Info */}
      <View style={styles.content}>
        <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Match Information</Text>
          
          <View style={styles.infoRow}>
            <Feather name="calendar" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Date:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              {formatDate(match.dateEvent)}
            </Text>
          </View>

          {match.strTime && (
            <View style={styles.infoRow}>
              <Feather name="clock" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Time:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {match.strTime}
              </Text>
            </View>
          )}

          {match.strVenue && (
            <View style={styles.infoRow}>
              <Feather name="home" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Venue:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {match.strVenue}
              </Text>
            </View>
          )}

          {match.strCountry && (
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Country:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {match.strCountry}
              </Text>
            </View>
          )}

          {match.strCity && (
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Feather name="map" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>City:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {match.strCity}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {match.strDescriptionEN && (
          <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Match Details</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {match.strDescriptionEN}
            </Text>
          </View>
        )}

        {/* Statistics (if available) */}
        {isFinished && (
          <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Match Statistics</Text>
            
            <View style={styles.statRow}>
              <Text style={[styles.statTeam, { color: theme.colors.text }]}>{match.strHomeTeam}</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>{homeScore}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Goals</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>{awayScore}</Text>
              <Text style={[styles.statTeam, { color: theme.colors.text }]}>{match.strAwayTeam}</Text>
            </View>

            {match.intHomeShots && (
              <View style={styles.statRow}>
                <Text style={[styles.statTeam, { color: theme.colors.text }]}></Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{match.intHomeShots || 0}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Shots</Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{match.intAwayShots || 0}</Text>
                <Text style={[styles.statTeam, { color: theme.colors.text }]}></Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  leagueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  seasonText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scoreDisplay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 80,
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  statTeam: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    width: 60,
    textAlign: 'center',
  },
});
