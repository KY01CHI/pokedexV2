import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from './stylesD';
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default function PokemonDetail({ route, navigation }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return colors[type] || '#777777';
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatBar = ({ statName, value, color }) => {
    const maxStat = 255;
    const percentage = (value / maxStat) * 100;

    return (
      <View style={styles.statRow}>
        <Text style={styles.statName}>{statName}</Text>
        <Text style={styles.statValue}>{value}</Text>
        <View style={styles.statBarContainer}>
          <View
            style={[
              styles.statBar,
              {
                width: `${percentage}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#78C850" />
      </View>
    );
  }

  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;
  const typeColor = getTypeColor(mainType);
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <View style={[styles.container, { backgroundColor: typeColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={typeColor} />
      
      {/* Main header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.pokemonNumber}>
          #{formattedId}
        </Text>
      </View>
      
      {/* Pokémon image container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Content container */}
      <ScrollView style={styles.contentContainer}>
        {/* Types */}
        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <View
              key={type.type.name}
              style={[
                styles.typeTag,
                { backgroundColor: getTypeColor(type.type.name) },
              ]}
            >
              <Text style={styles.typeText}>
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </Text>
            </View>
          ))}
        </View>
        
        {/* About section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            About
          </Text>
          
          <View style={styles.aboutContainer}>
            {/* Weight */}
            <View style={styles.aboutItem}>
              <View style={styles.aboutValueContainer}>
                <Ionicons name="scale-outline" size={18} color="#666" style={styles.aboutIcon} />
                <Text style={styles.aboutValue}>{pokemon.weight / 10} kg</Text>
              </View>
              <Text style={styles.aboutLabel}>Weight</Text>
            </View>
            
            {/* Divider */}
            <View style={styles.divider} />
            
            {/* Height */}
            <View style={styles.aboutItem}>
              <View style={styles.aboutValueContainer}>
                <Ionicons name="resize-outline" size={18} color="#666" style={styles.aboutIcon} />
                <Text style={styles.aboutValue}>{pokemon.height / 10} m</Text>
              </View>
              <Text style={styles.aboutLabel}>Height</Text>
            </View>
            
            {/* Divider */}
            <View style={styles.divider} />
            
            {/* Abilities */}
            <View style={styles.aboutItem}>
              <View style={styles.aboutValueContainer}>
                <Ionicons name="flash-outline" size={18} color="#666" style={styles.abilityIcon} />
                <View style={styles.abilitiesContainer}>
                  {pokemon.abilities.slice(0, 2).map((a, index) => (
                    <Text key={index} style={styles.abilityText}>
                      {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                    </Text>
                  ))}
                </View>
              </View>
              <Text style={styles.aboutLabel}>Abilities</Text>
            </View>
          </View>
        </View>
        
        {/* Stats section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Base Stats
          </Text>
          
          <StatBar statName="HP" value={pokemon.stats[0].base_stat} color={typeColor} />
          <StatBar statName="ATK" value={pokemon.stats[1].base_stat} color={typeColor} />
          <StatBar statName="DEF" value={pokemon.stats[2].base_stat} color={typeColor} />
          <StatBar statName="Sp. Atk" value={pokemon.stats[3].base_stat} color={typeColor} />
          <StatBar statName="Sp. Def" value={pokemon.stats[4].base_stat} color={typeColor} />
          <StatBar statName="SPD" value={pokemon.stats[5].base_stat} color={typeColor} />
        </View>
        
        {/* Add some padding at the bottom for scrolling */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}
