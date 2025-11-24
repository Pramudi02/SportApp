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
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function LeagueDetails({ route, navigation }) {
  const { leagueId } = route.params;
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.football);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    dispatch(fetchTeamsByLeague(leagueId));
  }, [leagueId]);

  const renderTeamCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={() => navigation.navigate('TeamDetails', { teamId: item.idTeam })}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[theme.colors.gradient1 + '10', theme.colors.gradient2 + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />
      {item.strTeamBadge ? (
        <Image
          source={{ uri: item.strTeamBadge }}
          style={styles.teamBadge}
          resizeMode="contain"
          onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
        />
      ) : (
        <View style={[styles.teamBadgePlaceholder, { backgroundColor: theme.colors.cardLight }]}>
          <MaterialIcons name="shield" size={40} color={theme.colors.textSecondary} />
        </View>
      )}
      <View style={styles.cardInfo}>
        <Text style={[styles.teamName, { color: theme.colors.text }]} numberOfLines={2}>
          {item.strTeam}
        </Text>
        {item.strStadium && (
          <Text style={[styles.stadium, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            <MaterialIcons name="stadium" size={12} color={theme.colors.textSecondary} /> {item.strStadium}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading teams...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.idTeam}
        renderItem={renderTeamCard}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No teams found for this league</Text>
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
  listContent: {
    padding: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    margin: 6,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 180,
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
  teamBadge: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  teamBadgePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardInfo: {
    alignItems: 'center',
    width: '100%',
  },
  teamName: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  stadium: {
    fontSize: 12,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
