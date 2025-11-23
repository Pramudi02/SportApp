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

export default function PlayerDetails({ route }) {
  const { playerId } = route.params;
  const dispatch = useDispatch();
  const { currentPlayer, loading } = useSelector((state) => state.football);
  const { favorites } = useSelector((state) => state.favorites);

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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>Loading player details...</Text>
      </View>
    );
  }

  if (!currentPlayer) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Player not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {currentPlayer.strThumb && (
          <Image
            source={{ uri: currentPlayer.strThumb }}
            style={styles.playerImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.playerName}>{currentPlayer.strPlayer}</Text>
          {currentPlayer.strPosition && (
            <Text style={styles.position}>{currentPlayer.strPosition}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        {currentPlayer.strTeam && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Team:</Text>
            <Text style={styles.infoValue}>{currentPlayer.strTeam}</Text>
          </View>
        )}
        {currentPlayer.strNationality && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nationality:</Text>
            <Text style={styles.infoValue}>{currentPlayer.strNationality}</Text>
          </View>
        )}
        {currentPlayer.dateBorn && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Born:</Text>
            <Text style={styles.infoValue}>{currentPlayer.dateBorn}</Text>
          </View>
        )}
        {currentPlayer.strBirthLocation && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Birthplace:</Text>
            <Text style={styles.infoValue}>{currentPlayer.strBirthLocation}</Text>
          </View>
        )}
        {currentPlayer.strHeight && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>{currentPlayer.strHeight}</Text>
          </View>
        )}
        {currentPlayer.strWeight && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{currentPlayer.strWeight}</Text>
          </View>
        )}
      </View>

      {currentPlayer.strDescriptionEN && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.description}>{currentPlayer.strDescriptionEN}</Text>
        </View>
      )}
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
    backgroundColor: '#0f2744',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#334155',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    color: '#64b5f6',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  favoriteButtonActive: {
    backgroundColor: '#ffd700',
    borderColor: '#ffd700',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#fff',
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
    marginBottom: 20,
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
});
