import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamsByLeague } from '../redux/slices/footballSlice';

export default function LeagueDetails({ route, navigation }) {
  const { leagueId } = route.params;
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.football);

  useEffect(() => {
    dispatch(fetchTeamsByLeague(leagueId));
  }, [leagueId]);

  const renderTeamCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TeamDetails', { teamId: item.idTeam })}
    >
      {item.strTeamBadge && (
        <Image
          source={{ uri: item.strTeamBadge }}
          style={styles.teamBadge}
          resizeMode="contain"
        />
      )}
      <View style={styles.cardInfo}>
        <Text style={styles.teamName} numberOfLines={2}>
          {item.strTeam}
        </Text>
        {item.strStadium && (
          <Text style={styles.stadium} numberOfLines={1}>
            🏟️ {item.strStadium}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>Loading teams...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.idTeam}
        renderItem={renderTeamCard}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No teams found for this league</Text>
          </View>
        }
      />
    </View>
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
  listContent: {
    padding: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    margin: 6,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 180,
  },
  teamBadge: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  cardInfo: {
    alignItems: 'center',
    width: '100%',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  stadium: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
  },
});
