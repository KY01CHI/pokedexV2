import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AnimatedNexusSplash from '@/components/NexusSplash';
import LoadingScreen from '@/components/LoadingScreen';

const { width, height } = Dimensions.get('window');

function PokemonHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('@/assets/images/pokeball.png')}
        style={[styles.icon, { tintColor: '#fff' }]}
      />
      <Text style={styles.title}>Pokémon</Text>
    </View>
  );
}

export default function Layout() {
  const [loadingState, setLoadingState] = useState('nexus');
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const setupApp = async () => {
      try {
        // Show Nexus splash for 8 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLoadingState('pokemon');
        
        // Show Pokemon loading screen for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoadingState('main');
        setIsReady(true);
      } catch (error) {
        console.error('Error during app initialization:', error);
        // Fallback to main content in case of error
        setLoadingState('main');
        setIsReady(true);
      }
    };

    setupApp();
  }, []);

  if (loadingState === 'nexus') {
    return <AnimatedNexusSplash />;
  }

  if (loadingState === 'pokemon') {
    return <LoadingScreen />;
  }

  if (!isReady) {
    return null; // Prevent flash of content
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <PokemonHeader />,
          headerStyle: {
            backgroundColor: '#E63F34',
            height: 110,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: width * 0.8,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});