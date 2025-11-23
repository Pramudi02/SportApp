import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_API_URL = 'https://dummyjson.com/auth';

/**
 * Login with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>} User data and token
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      username,
      password,
    });
    
    const { token, ...userData } = response.data;
    
    // Store token in AsyncStorage
    if (token) {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
 * Register new user (dummy implementation)
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
  // DummyJSON doesn't have real registration, so we simulate it
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock success response
    return {
      success: true,
      message: 'Registration successful. Please login.',
      user: {
        username: userData.username,
        email: userData.email,
      }
    };
  } catch (error) {
    throw new Error('Registration failed');
  }
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    throw new Error('Logout failed');
  }
};

/**
 * Get stored auth token
 * @returns {Promise<string|null>}
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    return null;
  }
};

/**
 * Get stored user data
 * @returns {Promise<Object|null>}
 */
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};