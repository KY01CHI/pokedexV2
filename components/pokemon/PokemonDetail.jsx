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
import PokemonTabs from './PokemonTabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './stylesD';
import MoveColor from './MoveColor'
import StatBar from './StatBar';
import { getTypeIcon } from './typeIcons';
import { darkenColor, lightenColor, getTypeColor } from './colorUtils';
import LoadingSpinner from './LoadingSpinner';

const { width } = Dimensions.get('window');


export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [locationAreas, setLocationAreas] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [species, setSpecies] = useState(null);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchPokemonDetails();
    fetchLocationAreas();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      // Fetch basic Pokemon data
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
      
      // Fetch species data
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const speciesData = await speciesResponse.json();
      setSpecies(speciesData);
      
      // Extract evolution chain ID and fetch it
      const evolutionId = speciesData.evolution_chain.url.split('/').slice(-2)[0];
      const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionId}`);
      const evolutionData = await evolutionResponse.json();
      
      // Process evolution chain
      const processedChain = await processEvolutionChain(evolutionData.chain);
      setEvolutionChain(processedChain);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationAreas = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
      const data = await response.json();
      setLocationAreas(data);
    } catch (error) {
      console.error('Error fetching location areas:', error);
    }
  };

  const processEvolutionChain = async (chain) => {
    const processedChain = [];
    
    const processPokemon = async (pokemonData) => {
      const pokemonId = pokemonData.species.url.split('/').slice(-2)[0];
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemon = await pokemonResponse.json();
      
      return {
        id: pokemonId,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        min_level: pokemonData.evolution_details[0]?.min_level || null,
        trigger: pokemonData.evolution_details[0]?.trigger?.name || null,
        item: pokemonData.evolution_details[0]?.item?.name || null,
      };
    };

    // Base form
    processedChain.push(await processPokemon({ species: chain.species, evolution_details: [{}] }));

    // First evolution
    if (chain.evolves_to.length > 0) {
      for (const evo1 of chain.evolves_to) {
        processedChain.push(await processPokemon(evo1));
        
        // Second evolution
        if (evo1.evolves_to.length > 0) {
          for (const evo2 of evo1.evolves_to) {
            processedChain.push(await processPokemon(evo2));
          }
        }
      }
    }

    return processedChain;
  };


  const renderAboutTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.aboutContainer}>
        {/* Weight */}
        <View style={styles.aboutItem}>
          <View style={styles.aboutValueContainer}>
            <Ionicons name="scale-outline" size={18} color="#666" style={styles.aboutIcon} />
            <Text style={styles.aboutValue}>{pokemon.weight / 10} kg</Text>
          </View>
          <Text style={styles.aboutLabel}>Weight</Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Height */}
        <View style={styles.aboutItem}>
          <View style={styles.aboutValueContainer}>
            <Ionicons name="resize-outline" size={18} color="#666" style={styles.aboutIcon} />
            <Text style={styles.aboutValue}>{pokemon.height / 10} m</Text>
          </View>
          <Text style={styles.aboutLabel}>Height</Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Abilities */}
        <View style={styles.aboutItem}>
          <View style={styles.aboutValueContainer}>
            <Ionicons name="flash-outline" size={18} color="#666" style={styles.abilityIcon} />
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((a, index) => (
                <Text key={index} style={styles.abilityText}>
                  {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                </Text>
              ))}
            </View>
          </View>
          <Text style={styles.aboutLabel}>Abilities</Text>
        </View>
      </View>
  
      {/* Description Section with updated View wrapper */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionHeader}>Description</Text>
        <View style={styles.descriptionTextContainer}>
          {species && (
            <Text style={styles.description}>
              {species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );

  const renderStatsTab = (animate) => (
    <View style={styles.tabContent}>
      {pokemon.stats.map((stat, index) => (
        <StatBar
          key={index}
          statName={stat.stat.name.toUpperCase().replace('-', ' ')}
          value={stat.base_stat}
          color={getTypeColor(pokemon.types[0].type.name)}
          styles={styles} 
          animate={animate}
        />
      ))}
    </View>
  );
  

  const renderEvolutionTab = () => (
    <ScrollView
      style={styles.tabContent}
      contentContainerStyle={{ paddingVertical: 16, paddingBottom: 40 }}
    >
      {evolutionChain ? (
        evolutionChain.map((evo, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity 
              style={styles.evolutionPokemon}
              onPress={() => {
                if (parseInt(evo.id) !== pokemon.id) {
                  router.push(`/${evo.id}`);
                }
              }}
            >
              <Image
                source={{ uri: evo.image }}
                style={styles.evolutionImage}
              />
              <Text style={styles.evolutionName}>
                {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
              </Text>
              {evo.min_level && (
                <Text style={styles.evolutionLevel}>
                  Level {evo.min_level}
                </Text>
              )}
            </TouchableOpacity>
            {index < evolutionChain.length - 1 && (
              <View style={styles.evolutionArrowContainer}>
                <Ionicons name="arrow-down" size={24} color="#666" />
              </View>
            )}
          </React.Fragment>
        ))
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#78C850" />
        </View>
      )}
      {/* Extra space at the bottom */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
  
  const renderLocationTab = () => (
    <View style={styles.tabContent}>
      {locationAreas.length > 0 ? (
        locationAreas.map((location, index) => (
          <View key={index} style={styles.locationItem}>
            <Text style={styles.locationName}>
              {location.location_area.name.replace(/-/g, ' ')}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No location data available</Text>
      )}
    </View>
  );

  const renderMovesTab = () => {
    // Filter moves: include only moves learned via 'level-up'
    const learnedMoves = pokemon.moves
      .filter(moveItem =>
        moveItem.version_group_details.some(
          detail => detail.move_learn_method.name === 'level-up'
        )
      )
      .map(moveItem => {
        // Extract all level values from the level-up method (ignoring any 0s)
        const levels = moveItem.version_group_details
          .filter(detail => detail.move_learn_method.name === 'level-up')
          .map(detail => detail.level_learned_at)
          .filter(level => level > 0);
        // Use the minimum level (or 0 if no valid level found)
        const learnLevel = levels.length > 0 ? Math.min(...levels) : 0;
        return { ...moveItem, learnLevel };
      });
  
    // Sort moves by learnLevel (ascending order)
    learnedMoves.sort((a, b) => a.learnLevel - b.learnLevel);
  
    return (
      <ScrollView style={styles.tabContent} contentContainerStyle={styles.scrollContainer}>
        {learnedMoves.map((moveItem, index) => (
          <MoveColor key={index} moveItem={moveItem} styles={styles} />
        ))}
      </ScrollView>
    );
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size={100} color1="#78C850" color2="#8CD670" color3="#A0E490" />
      </View>
    );
  }

  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;
  const typeColor = getTypeColor(mainType);
  const typeColorDark = getTypeColor(mainType, 'darken', 0.2);
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <View style={[styles.container, { backgroundColor: typeColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={typeColor} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.pokemonNumber}>#{formattedId}</Text>
      </View>
      
      <View style={styles.imageContainer} pointerEvents="none">
          {getTypeIcon(mainType) && (
            <Image
              source={getTypeIcon(mainType)}
              style={[
                styles.detailTypeIcon,
                { tintColor: darkenColor(typeColor, 0.2) }
              ]}
            />
          )}
          <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />
      </View>

      
      <View style={styles.contentContainer}>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <View
                key={type.type.name}
                style={[
                  styles.typeTag,
                  { backgroundColor: getTypeColor(type.type.name), flexDirection: 'row', alignItems: 'center' },
                ]}
              >
                <Image
                  source={getTypeIcon(type.type.name)}
                  style={[styles.typeIcon, { tintColor: '#FFFFFF', marginRight: 5 }]}
                />
                <Text style={styles.typeText}>
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                </Text>
              </View>
            ))}
          </View>

        <PokemonTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pokemon={pokemon}
            species={species}
            evolutionChain={evolutionChain}
            locationAreas={locationAreas}
            renderAboutTab={renderAboutTab}
            renderStatsTab={renderStatsTab}
            renderEvolutionTab={renderEvolutionTab}
            renderLocationTab={renderLocationTab}
            renderMovesTab={renderMovesTab}
            typeColor={typeColor}
        />
      </View>
    </View>
  );
}

