import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.391210bf589142a88602725f9a472b78',
  appName: 'SocialApp',
  webDir: 'dist',
  server: {
    url: 'https://391210bf-5891-42a8-8602-725f9a472b78.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#8b5cf6',
      showSpinner: false
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#8b5cf6'
    }
  }
};

export default config;