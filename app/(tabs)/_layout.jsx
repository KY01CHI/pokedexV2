import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LoadingScreen from '@/components/LoadingScreen';

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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: () => <PokemonHeader />,
          headerStyle: {
            backgroundColor: '#E63F34',
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name='[id]'
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', // Increased font weight
    color: '#fff',
  },
});
