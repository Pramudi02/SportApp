import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validators';
import { darkTheme } from '../theme/dark';
import { lightTheme } from '../theme/light';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useSelector((state) => state.theme);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert('Error', passwordError);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Registration successful! Please login with your credentials.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <LinearGradient
            colors={[theme.colors.gradient1, theme.colors.gradient2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}
          >
            <MaterialIcons name="person-add" size={48} color="#FFFFFF" />
          </LinearGradient>

          <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.primary }]}>Join FootyScope today</Text>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <MaterialIcons name="person" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Username"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value)}
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <MaterialIcons name="email" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Email"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <MaterialIcons name="lock" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Password"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <MaterialIcons name="lock-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[theme.colors.gradient1, theme.colors.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, loading && styles.buttonDisabled]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    marginLeft: 12,
  },
  button: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});
