import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PokemonDetail from '../../components/pokemon/PokemonDetail';

export default function Detail() {
    const { id } = useLocalSearchParams();
    return <PokemonDetail id={id} />;
}