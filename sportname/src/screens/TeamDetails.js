import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamDetails, fetchPlayersByTeam } from '../redux/slices/footballSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function TeamDetails({ route, navigation }) {
  const { teamId } = route.params;
  const dispatch = useDispatch();
  const { currentTeam, players, loading } = useSelector((state) => state.football);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    dispatch(fetchTeamDetails(teamId));
    dispatch(fetchPlayersByTeam(teamId));
  }, [teamId]);

  const renderPlayerCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.playerCard, { backgroundColor: theme.colors.cardLight, borderColor: theme.colors.border }]}
      onPress={() => navigation.navigate('PlayerDetails', { playerId: item.idPlayer })}
      activeOpacity={0.7}
    >
      {item.strThumb ? (
        <Image
          source={{ uri: item.strThumb }}
          style={styles.playerImage}
          resizeMode="cover"
          onError={(error) => console.log('Player image load error:', error.nativeEvent.error)}
        />
      ) : (
        <View style={[styles.playerImagePlaceholder, { backgroundColor: theme.colors.cardLight }]}>
          <Feather name="user" size={30} color={theme.colors.textSecondary} />
        </View>
      )}
      <View style={styles.playerInfo}>
        <Text style={[styles.playerName, { color: theme.colors.text }]} numberOfLines={1}>
          {item.strPlayer}
        </Text>
        <Text style={[styles.playerPosition, { color: theme.colors.primary }]} numberOfLines={1}>
          {item.strPosition || 'Player'}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  if (loading && !currentTeam) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading team details...</Text>
      </View>
    );
  }

  if (!currentTeam) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>Team not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {currentTeam.strTeamBadge ? (
          <Image
            source={{ uri: currentTeam.strTeamBadge }}
            style={styles.teamBadge}
            resizeMode="contain"
            onError={(error) => console.log('Team badge load error:', error.nativeEvent.error)}
          />
        ) : (
          <View style={[styles.teamBadgePlaceholder, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
            <Feather name="shield" size={60} color="#fff" />
          </View>
        )}
        <Text style={styles.teamName}>{currentTeam.strTeam}</Text>
        {currentTeam.intFormedYear && (
          <Text style={styles.formedYear}>
            Founded: {currentTeam.intFormedYear}
          </Text>
        )}
      </LinearGradient>

      <View style={[styles.infoSection, { backgroundColor: theme.colors.card }]}>
        {currentTeam.strStadium && (
          <View style={styles.infoRow}>
            <Feather name="home" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Stadium:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentTeam.strStadium}</Text>
          </View>
        )}
        {currentTeam.strLocation && (
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Location:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentTeam.strLocation}</Text>
          </View>
        )}
        {currentTeam.strLeague && (
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Feather name="award" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>League:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentTeam.strLeague}</Text>
          </View>
        )}
      </View>

      {currentTeam.strDescriptionEN && (
        <View style={[styles.descriptionSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={6}>
            {currentTeam.strDescriptionEN}
          </Text>
        </View>
      )}

      <View style={[styles.playersSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Players</Text>
        {players.length > 0 ? (
          <FlatList
            data={players}
            keyExtractor={(item) => item.idPlayer}
            renderItem={renderPlayerCard}
            scrollEnabled={false}
          />
        ) : (
          <Text style={[styles.noPlayersText, { color: theme.colors.textSecondary }]}>No players available</Text>
        )}
      </View>
    </ScrollView>
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
  errorText: {
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 20,
  },
  teamBadge: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  teamBadgePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  formedYear: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  infoSection: {
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 12,
    width: 90,
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  playersSection: {
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  playerImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 13,
    fontWeight: '500',
  },
  noPlayersText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 14,
  },
});
