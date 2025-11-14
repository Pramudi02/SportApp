import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';
import { getThemeColors } from '../utils/theme';

export default function LocationDetailScreen({ route, navigation }: any) {
  const { locationId } = route.params;
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) =>
    state.locations.locations.find((loc) => loc.id === locationId)
  );
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = getThemeColors(isDarkMode);

  if (!location) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Location not found</Text>
      </View>
    );
  }

  const isFavorite = favoriteIds.includes(location.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(location.id));
  };

  const handleGetDirections = () => {
    if (location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.headerButton}>
          <Feather
            name="heart"
            size={24}
            color={isFavorite ? colors.danger : colors.text}
            fill={isFavorite ? colors.danger : 'transparent'}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite, colors]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: location.imageUrl || 'https://picsum.photos/400/300' }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={[styles.name, { color: colors.text }]}>{location.name}</Text>
            <Text style={[styles.sportType, { color: colors.primary }]}>
              {location.sportType}
            </Text>
          </View>

          {location.openNow !== undefined && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: location.openNow
                    ? colors.success + '20'
                    : colors.danger + '20',
                },
              ]}
            >
              <Feather
                name="clock"
                size={16}
                color={location.openNow ? colors.success : colors.danger}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: location.openNow ? colors.success : colors.danger },
                ]}
              >
                {location.openNow ? 'Open Now' : 'Closed'}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Feather name="star" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Rating</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {location.rating.toFixed(1)} / 5.0
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Feather name="map-pin" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Address</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{location.address}</Text>
            </View>
          </View>

          {location.distance && (
            <View style={styles.infoRow}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Feather name="navigation" size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Distance</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{location.distance}</Text>
              </View>
            </View>
          )}

          {location.priceLevel !== undefined && (
            <View style={styles.infoRow}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Feather name="dollar-sign" size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Price Level</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {'$'.repeat(location.priceLevel || 1)}
                </Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleGetDirections}
        >
          <Feather name="navigation" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  errorText: {
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleSection: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sportType: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  infoSection: {
    gap: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButton: {
    marginRight: 15,
  },
});
