import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Pokémon',
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
  )
}
