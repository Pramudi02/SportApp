import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerDetails } from '../redux/slices/footballSlice';
import { toggleFavorite } from '../redux/slices/favoriteSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function PlayerDetails({ route }) {
  const { playerId } = route.params;
  const dispatch = useDispatch();
  const { currentPlayer, loading } = useSelector((state) => state.football);
  const { favorites } = useSelector((state) => state.favorites);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;
  const isFavorite = favorites.some((fav) => fav.idPlayer === playerId);

  useEffect(() => {
    dispatch(fetchPlayerDetails(playerId));
  }, [playerId]);

  const handleToggleFavorite = () => {
    if (currentPlayer) {
      dispatch(toggleFavorite(currentPlayer));
    }
  };

  if (loading && !currentPlayer) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading player details...</Text>
      </View>
    );
  }

  if (!currentPlayer) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>Player not found</Text>
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
        <View style={styles.headerContent}>
          {currentPlayer.strThumb ? (
            <Image
              source={{ uri: currentPlayer.strThumb }}
              style={styles.playerImage}
              resizeMode="cover"
              onError={(error) => console.log('Player image load error:', error.nativeEvent.error)}
            />
          ) : (
            <View style={[styles.playerImagePlaceholder, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <MaterialIcons name="person" size={50} color="#fff" />
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.playerName}>{currentPlayer.strPlayer}</Text>
            {currentPlayer.strPosition && (
              <Text style={styles.position}>{currentPlayer.strPosition}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
        >
          <MaterialIcons name={isFavorite ? 'star' : 'star-border'} size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={[styles.infoSection, { backgroundColor: theme.colors.card }]}>
        {currentPlayer.strTeam && (
          <View style={styles.infoRow}>
            <MaterialIcons name="sports-soccer" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Team:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.strTeam}</Text>
          </View>
        )}
        {currentPlayer.strNationality && (
          <View style={styles.infoRow}>
            <MaterialIcons name="flag" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Nationality:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.strNationality}</Text>
          </View>
        )}
        {currentPlayer.dateBorn && (
          <View style={styles.infoRow}>
            <MaterialIcons name="cake" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Born:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.dateBorn}</Text>
          </View>
        )}
        {currentPlayer.strBirthLocation && (
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Birthplace:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.strBirthLocation}</Text>
          </View>
        )}
        {currentPlayer.strHeight && (
          <View style={styles.infoRow}>
            <MaterialIcons name="height" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Height:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.strHeight}</Text>
          </View>
        )}
        {currentPlayer.strWeight && (
          <View style={styles.infoRow}>
            <MaterialIcons name="fitness-center" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Weight:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{currentPlayer.strWeight}</Text>
          </View>
        )}
      </View>

      {currentPlayer.strDescriptionEN && (
        <View style={[styles.descriptionSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Biography</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{currentPlayer.strDescriptionEN}</Text>
        </View>
      )}
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
    padding: 24,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  playerImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  position: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD700',
  },
  infoSection: {
    padding: 20,
    marginTop: 8,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 12,
    width: 100,
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
    marginBottom: 20,
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
});
