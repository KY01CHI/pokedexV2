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
import LoadingSpinner from './LoadingSpinner';
import EvolutionDetails from './EvolutionDetails';
import { GenerationIcon, THEMED_GENERATION_ICONS } from './generationIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { darkenColor, getTypeColor, lightenColor,getContrastTextColor } from './colorUtils';

const { width } = Dimensions.get('window');

const formatGeneration = (gen) => {
  if (!gen) return '';
  return "Generation " + gen.split('-')[1].toUpperCase();
};

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [locationAreas, setLocationAreas] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [species, setSpecies] = useState(null);
  const [generation, setGeneration] = useState(null);

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
      setGeneration(formatGeneration(speciesData.generation.name));
      
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
        evolution_details: pokemonData.evolution_details[0] || null,
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
              {evo.evolution_details && (
                <EvolutionDetails 
                  evolutionDetails={evo.evolution_details}
                  trigger={evo.evolution_details.trigger?.name}
                />
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
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const renderAboutTab = () => (
    <ScrollView style={styles.tabContent}>
    <View style={styles.aboutGridContainer}>
      {/* Row 1 */}
      <View style={styles.aboutRow}>
        {/* Weight */}
        <LinearGradient
          colors={[
            getTypeColor(pokemon.types[0].type.name),
            darkenColor(getTypeColor(pokemon.types[0].type.name), 0.3)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.aboutGridItem, { backgroundColor: 'transparent' }]}
        >
          <View style={styles.aboutValueContainer}>
            <Ionicons 
              name="scale-outline" 
              size={18} 
              color="white"
              style={styles.aboutIcon} 
            />
            <Text style={[styles.aboutValue, { 
              color: 'white',
              fontWeight: 'bold',
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2
            }]}>
              {pokemon.weight / 10} kg
            </Text>
          </View>
          <Text style={[styles.aboutLabel, { 
            color: 'white',
            fontWeight: '600'
          }]}>
            Weight
          </Text>
        </LinearGradient>
        
        {/* Height */}
        <LinearGradient
          colors={[
            getTypeColor(pokemon.types[0].type.name),
            darkenColor(getTypeColor(pokemon.types[0].type.name), 0.3)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.aboutGridItem, { backgroundColor: 'transparent' }]}
        >
          <View style={styles.aboutValueContainer}>
            <Ionicons 
              name="resize-outline" 
              size={18} 
              color="white"
              style={styles.aboutIcon} 
            />
            <Text style={[styles.aboutValue, { 
              color: 'white',
              fontWeight: 'bold',
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2
            }]}>
              {pokemon.height / 10} m
            </Text>
          </View>
          <Text style={[styles.aboutLabel, { 
            color: 'white',
            fontWeight: '600'
          }]}>
            Height
          </Text>
        </LinearGradient>
      </View>

      {/* Row 2 */}
      <View style={styles.aboutRow}>
        {/* Generation */}
        <LinearGradient
          colors={[
            getTypeColor(pokemon.types[0].type.name),
            darkenColor(getTypeColor(pokemon.types[0].type.name), 0.3)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.aboutGridItem, { backgroundColor: 'transparent' }]}
        >
          <View style={[styles.aboutValueContainer, { flexDirection: 'column', gap: 4 }]}>
            <GenerationIcon 
              generation={species?.generation?.name} 
              size={18}
              style={{ tintColor: darkenColor(getTypeColor(pokemon.types[0].type.name), 0.5) }}
            />
            <Text style={[styles.aboutValue, { 
              color: 'white',
              fontWeight: 'bold',
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2
            }]}>
              {generation}
            </Text>
          </View>
          <Text style={[styles.aboutLabel, { 
            color: 'white',
            fontWeight: '600'
          }]}>
            {THEMED_GENERATION_ICONS[species?.generation?.name]?.label || 'Generation'}
          </Text>
        </LinearGradient>

        {/* Abilities */}
        <LinearGradient
          colors={[
            getTypeColor(pokemon.types[0].type.name),
            darkenColor(getTypeColor(pokemon.types[0].type.name), 0.3)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.aboutGridItem, { backgroundColor: 'transparent' }]}
        >
          <View style={styles.aboutValueContainer}>
            <Ionicons 
              name="flash-outline" 
              size={18} 
              color="white"
              style={styles.abilityIcon} 
            />
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((a, index) => (
                <Text key={index} style={[styles.abilityText, { 
                  color: 'white',
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(255, 255, 255, 0.5)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2
                }]}>
                  {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                </Text>
              ))}
            </View>
          </View>
          <Text style={[styles.aboutLabel, { 
            color: 'white',
            fontWeight: '600'
          }]}>
            Abilities
          </Text>
        </LinearGradient>
      </View>
    </View>
    
    {/* Description section remains the same */}
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
    const learnedMoves = pokemon.moves
      .filter(moveItem =>
        moveItem.version_group_details.some(
          detail => detail.move_learn_method.name === 'level-up'
        )
      )
      .map(moveItem => {
        const levels = moveItem.version_group_details
          .filter(detail => detail.move_learn_method.name === 'level-up')
          .map(detail => detail.level_learned_at)
          .filter(level => level > 0);
        const learnLevel = levels.length > 0 ? Math.min(...levels) : 0;
        return { ...moveItem, learnLevel };
      });
  
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
        <LoadingSpinner 
          size={100} 
          type={pokemon?.types[0]?.type?.name || 'normal'} 
          message="Loading Pokémon..." 
        />
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