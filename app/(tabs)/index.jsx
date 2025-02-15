import React from 'react';
import { View } from 'react-native';
import PokemonList from '../../components/pokemon/PokemonList';
import { styles } from '../../components/pokemon/stylesL';

export default function Index() {
  return (
    <View style={styles.container}>
      <PokemonList />
    </View>
  );
}