import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';
import { searchPlayers } from '../api/footballApi';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadAllPlayers();
  }, []);

  const loadAllPlayers = async () => {
    setLoading(true);
    try {
      // Search for common names to get a list of players
      // TheSportsDB API doesn't have a "get all players" endpoint, so we search by common letters
      const searches = ['a', 'b', 'c', 'd', 'e', 'm', 'r', 's'];
      const allPlayers = [];
      
      for (const letter of searches) {
        const result = await searchPlayers(letter);
        if (result && result.length > 0) {
          allPlayers.push(...result);
        }
      }
      
      // Filter for football/soccer players only and remove duplicates
      const uniquePlayers = allPlayers.filter(
        (player, index, self) =>
          (player.strSport === 'Soccer' || player.strSport === 'Football') &&
          index === self.findIndex((p) => p.idPlayer === player.idPlayer)
      );
      
      setPlayers(uniquePlayers);
      setFilteredPlayers(uniquePlayers);
    } catch (error) {
      console.error('Error loading players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredPlayers(players);
      return;
    }

    const query = text.toLowerCase().trim();
    const filtered = players.filter((player) => {
      const playerName = player.strPlayer?.toLowerCase() || '';
      const nationality = player.strNationality?.toLowerCase() || '';
      const team = player.strTeam?.toLowerCase() || '';
      
      return (
        playerName.includes(query) ||
        nationality.includes(query) ||
        team.includes(query)
      );
    });
    
    setFilteredPlayers(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredPlayers(players);
  };

  const renderPlayerCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.playerCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={() => navigation.navigate('HomeTab', {
        screen: 'PlayerDetails',
        params: { playerId: item.idPlayer }
      })}
      activeOpacity={0.7}
    >
      {item.strThumb ? (
        <Image
          source={{ uri: item.strThumb }}
          style={styles.playerImage}
          resizeMode="cover"
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
        {item.strPosition && (
          <Text style={[styles.playerPosition, { color: theme.colors.primary }]} numberOfLines={1}>
            {item.strPosition}
          </Text>
        )}
        <View style={styles.detailsRow}>
          {item.strNationality && (
            <View style={styles.detailItem}>
              <Feather name="flag" size={12} color={theme.colors.textSecondary} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.strNationality}
              </Text>
            </View>
          )}
          {item.strTeam && (
            <View style={styles.detailItem}>
              <Feather name="disc" size={12} color={theme.colors.textSecondary} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.strTeam}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading players...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ImageBackground
        source={{ uri: 'https://ik.imagekit.io/pr2222/Portfolio-assets/61KtpeMt7oL._AC_UF894,1000_QL80_.jpg' }}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerOverlay}>
          <Feather name="search" size={40} color="#fff" />
          <Text style={styles.headerTitle}>Search Players</Text>
          <Text style={styles.headerSubtitle}>
            {players.length} players available
          </Text>
        </View>
      </ImageBackground>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <Feather name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search by name, country, or team..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Feather name="x" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredPlayers}
        renderItem={renderPlayerCard}
        keyExtractor={(item) => item.idPlayer}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              {searchQuery.trim() ? 'No players found matching your search' : 'No players found'}
            </Text>
            {searchQuery.trim() && (
              <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
                Try a different search term
              </Text>
            )}
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
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
    padding: 24,
    paddingTop: 20,
    backgroundColor: 'rgba(15, 39, 68, 1)',
    position: 'relative',
  },
  headerImage: {
    opacity: 0.3,
  },
  headerOverlay: {
    borderRadius: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  playerImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: 11,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
  },
});
