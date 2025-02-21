import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Splash Screen Pokemon Logo */}
      <Image
        source={require('../assets/Dex.png')}
        style={styles.logo}
        resizeMode="contain" // Maintains image aspect ratio
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E63F34', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,  
    height: 300,  
  },
});

export default LoadingScreen;