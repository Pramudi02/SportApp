import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await dispatch(logoutUser());
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ImageBackground
        source={{ uri: 'https://ik.imagekit.io/pr2222/Portfolio-assets/pngtree-computer-lighting-technology-theme-user-link-intelligent-background-image_905379.png' }}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.username || 'User'}
          </Text>
          {user?.email && (
            <Text style={styles.email}>{user.email}</Text>
          )}
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account Information</Text>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
            <Feather name="user" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Username</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user?.username || 'N/A'}</Text>
          </View>

          {user?.email && (
            <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
              <Feather name="mail" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Email</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.email}</Text>
            </View>
          )}

          {user?.gender && (
            <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
              <Feather name="users" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Gender</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.gender}</Text>
            </View>
          )}

          {user?.age && (
            <View style={[styles.infoRow, { borderBottomColor: 'transparent' }]}>
              <Feather name="calendar" size={20} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Age</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.age}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Feather name={isDarkMode ? 'moon' : 'sun'} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary + '80' }}
              thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
              ios_backgroundColor={theme.colors.border}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF5A5F', '#FF3B3F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutButton}
          >
            <Feather name="log-out" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>FootyScope v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 60,
    paddingBottom: 40,
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
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  logoutButton: {
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
  },
});
