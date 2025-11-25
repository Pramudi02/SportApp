import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoriteSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleRemoveFavorite = (player) => {
    dispatch(toggleFavorite(player));
  };

  const renderPlayerCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('PlayerDetails', { playerId: item.idPlayer })}
        activeOpacity={0.7}
      >
        {item.strThumb && (
          <Image
            source={{ uri: item.strThumb }}
            style={styles.playerImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.strPlayer}
          </Text>
          {item.strPosition && (
            <View style={styles.positionBadge}>
              <Text style={[styles.position, { color: theme.colors.primary }]} numberOfLines={1}>
                {item.strPosition}
              </Text>
            </View>
          )}
          {item.strTeam && (
            <Text style={[styles.team, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              <Feather name="disc" size={14} color={theme.colors.textSecondary} /> {item.strTeam}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.colors.error }]}
        onPress={() => handleRemoveFavorite(item)}
        activeOpacity={0.8}
      >
        <Feather name="x" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Feather name="star" size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} player{favorites.length !== 1 ? 's' : ''} saved
        </Text>
      </LinearGradient>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LinearGradient
            colors={[theme.colors.gradient1 + '20', theme.colors.gradient2 + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emptyIconContainer}
          >
            <Feather name="star" size={64} color={theme.colors.primary} />
          </LinearGradient>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>No favorites yet</Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
            Add players to your favorites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idPlayer}
          renderItem={renderPlayerCard}
          contentContainerStyle={styles.listContent}
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
    paddingBottom: 30,
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  playerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  playerName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  positionBadge: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  position: {
    fontSize: 13,
    fontWeight: '600',
  },
  team: {
    fontSize: 13,
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
