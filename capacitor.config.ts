import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aetheris.tarot',
  appName: 'Aetheris Tarot',
  webDir: 'dist',

  // Server settings for development
  server: {
    // Use this for live reload during development
    // url: 'http://localhost:3000',
    cleartext: true,
    androidScheme: 'https'
  },

  // iOS specific settings
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'Aetheris',
    backgroundColor: '#050505'
  },

  // Android specific settings
  android: {
    backgroundColor: '#050505',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false // Set to true for development
  },

  // Plugin configurations
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#050505',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#050505'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  }
};

export default config;

