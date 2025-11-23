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

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  const handleRemoveFavorite = (player) => {
    dispatch(toggleFavorite(player));
  };

  const renderPlayerCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
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
          {item.strPosition && (
            <Text style={styles.position} numberOfLines={1}>
              {item.strPosition}
            </Text>
          )}
          {item.strTeam && (
            <Text style={styles.team} numberOfLines={1}>
              {item.strTeam}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item)}
      >
        <Text style={styles.removeIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} player{favorites.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>★</Text>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
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
    backgroundColor: '#0a1929',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0f2744',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#334155',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    color: '#64b5f6',
    marginBottom: 2,
  },
  team: {
    fontSize: 13,
    color: '#94a3b8',
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ef5350',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  removeIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    color: '#334155',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
