import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';
import { getThemeColors } from '../utils/theme';
import { Location } from '../types';

export default function FavoritesScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.locations.locations);
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = getThemeColors(isDarkMode);

  const favoriteLocations = locations.filter((loc) => favoriteIds.includes(loc.id));

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('Home', {
        screen: 'LocationDetail',
        params: { locationId: item.id }
      })}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://picsum.photos/400/300' }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.sportType, { color: colors.textSecondary }]}>
              {item.sportType}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleToggleFavorite(item.id)}
            style={styles.favoriteButton}
          >
            <Feather
              name="heart"
              size={24}
              color={colors.danger}
              fill={colors.danger}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.address}
            </Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.detailRow}>
              <Feather name="star" size={14} color={colors.warning} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {item.rating.toFixed(1)}
              </Text>
            </View>

            {item.distance && (
              <View style={styles.detailRow}>
                <Feather name="navigation" size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {item.distance}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.text }]}>No Favorites Yet</Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        Start exploring and add your favorite locations
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoriteLocations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={favoriteLocations.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 15,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sportType: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 5,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
