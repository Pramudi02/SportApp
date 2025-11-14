export const colors = {
  light: {
    background: '#ffffff',
    card: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    border: '#dee2e6',
    tabBar: '#ffffff',
    shadow: '#000000',
  },
  dark: {
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    primary: '#4d9fff',
    secondary: '#8e8e93',
    success: '#30d158',
    danger: '#ff453a',
    warning: '#ffd60a',
    border: '#38383a',
    tabBar: '#1c1c1e',
    shadow: '#000000',
  },
};

export const getThemeColors = (isDarkMode: boolean) => {
  return isDarkMode ? colors.dark : colors.light;
};
