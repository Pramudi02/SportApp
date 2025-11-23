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

export default function TeamDetails({ route, navigation }) {
  const { teamId } = route.params;
  const dispatch = useDispatch();
  const { currentTeam, players, loading } = useSelector((state) => state.football);

  useEffect(() => {
    dispatch(fetchTeamDetails(teamId));
    dispatch(fetchPlayersByTeam(teamId));
  }, [teamId]);

  const renderPlayerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => navigation.navigate('PlayerDetails', { playerId: item.idPlayer })}
    >
      {item.strThumb && (
        <Image
          source={{ uri: item.strThumb }}
          style={styles.playerImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.playerInfo}>
        <Text style={styles.playerName} numberOfLines={1}>
          {item.strPlayer}
        </Text>
        <Text style={styles.playerPosition} numberOfLines={1}>
          {item.strPosition || 'Player'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !currentTeam) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>Loading team details...</Text>
      </View>
    );
  }

  if (!currentTeam) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Team not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {currentTeam.strTeamBadge && (
          <Image
            source={{ uri: currentTeam.strTeamBadge }}
            style={styles.teamBadge}
            resizeMode="contain"
          />
        )}
        <Text style={styles.teamName}>{currentTeam.strTeam}</Text>
        {currentTeam.intFormedYear && (
          <Text style={styles.formedYear}>
            Founded: {currentTeam.intFormedYear}
          </Text>
        )}
      </View>

      <View style={styles.infoSection}>
        {currentTeam.strStadium && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stadium:</Text>
            <Text style={styles.infoValue}>{currentTeam.strStadium}</Text>
          </View>
        )}
        {currentTeam.strLocation && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{currentTeam.strLocation}</Text>
          </View>
        )}
        {currentTeam.strLeague && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>League:</Text>
            <Text style={styles.infoValue}>{currentTeam.strLeague}</Text>
          </View>
        )}
      </View>

      {currentTeam.strDescriptionEN && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description} numberOfLines={6}>
            {currentTeam.strDescriptionEN}
          </Text>
        </View>
      )}

      <View style={styles.playersSection}>
        <Text style={styles.sectionTitle}>Players</Text>
        {players.length > 0 ? (
          <FlatList
            data={players}
            keyExtractor={(item) => item.idPlayer}
            renderItem={renderPlayerCard}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noPlayersText}>No players available</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1929',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a1929',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: '#ef5350',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f2744',
  },
  teamBadge: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  formedYear: {
    fontSize: 14,
    color: '#94a3b8',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#1e293b',
    marginTop: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#94a3b8',
    width: 100,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  descriptionSection: {
    padding: 20,
    backgroundColor: '#1e293b',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  playersSection: {
    padding: 20,
    backgroundColor: '#1e293b',
    marginTop: 1,
    marginBottom: 20,
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#0a1929',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#334155',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 14,
    color: '#94a3b8',
  },
  noPlayersText: {
    color: '#94a3b8',
    textAlign: 'center',
    padding: 20,
  },
});
