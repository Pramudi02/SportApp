import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { fetchLocationsStart, fetchLocationsSuccess } from '../store/locationsSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { locationsService } from '../services/locations';
import { getThemeColors } from '../utils/theme';
import { Location } from '../types';

export default function LocationListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state: RootState) => state.locations);
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = getThemeColors(isDarkMode);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    dispatch(fetchLocationsStart());
    const data = await locationsService.fetchLocations();
    dispatch(fetchLocationsSuccess(data));
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('LocationDetail', { locationId: item.id })}
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
              color={isFavorite(item.id) ? colors.danger : colors.textSecondary}
              fill={isFavorite(item.id) ? colors.danger : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
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

            {item.openNow !== undefined && (
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.openNow
                      ? colors.success + '20'
                      : colors.danger + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: item.openNow ? colors.success : colors.danger },
                  ]}
                >
                  {item.openNow ? 'Open' : 'Closed'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading locations...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadLocations}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  list: {
    padding: 15,
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
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
