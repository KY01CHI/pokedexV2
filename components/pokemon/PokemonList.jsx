import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
} from 'react-native';
import { styles } from './stylesL';
import { lightenColor, darkenColor } from './colorUtils';
import { getTypeIcon } from './typeIcons';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import PokemonCard from './PokemonCard';

const ITEMS_PER_PAGE = 50;
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

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

export default function PokemonList() {
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Remove debounce since we'll now search on enter
  const ListEmptyComponent = useCallback(() => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Pokémon found</Text>
        <Text style={styles.emptySubText}>Try different keywords</Text>
      </View>
    );
  }, [loading]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    const pokemonData = await res.json();
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.other['official-artwork'].front_default,
      types: pokemonData.types.map(type => type.type.name),
    };
  };

  const fetchPokemon = async (search = '') => {
    try {
      setLoading(true);
      let url = `${API_URL}?limit=1025`;
      const response = await fetch(url);
      const data = await response.json();
      
      let filteredResults = data.results;
      if (search) {
        filteredResults = data.results.filter(pokemon => 
          pokemon.name.includes(search.toLowerCase()) ||
          pokemon.url.split('/')[6].includes(search)
        );
      }

      const firstBatch = filteredResults.slice(0, ITEMS_PER_PAGE);
      const detailedPokemon = await Promise.all(
        firstBatch.map(pokemon => fetchPokemonDetails(pokemon.url))
      );

      setDisplayedPokemon(detailedPokemon);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    if (loadingMore || loading || searchQuery) return;
  
    try {
      setLoadingMore(true);
      const response = await fetch(`${API_URL}?limit=1025`);
      const data = await response.json();
  
      let filteredResults = data.results;
      
      const nextPage = currentPage + 1;
      const start = nextPage * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      
      if (start >= filteredResults.length) {
        setLoadingMore(false);
        return;
      }
  
      const nextBatch = filteredResults.slice(start, end);
      const newPokemon = await Promise.all(
        nextBatch.map(pokemon => fetchPokemonDetails(pokemon.url))
      );
  
      setDisplayedPokemon(prev => [...prev, ...newPokemon]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more pokemon:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle search submission
  const handleSearch = () => {
    fetchPokemon(searchQuery);
  };

  // ADD THIS NEW FUNCTION
const renderPokemonCard = ({ item }) => (
  <PokemonCard 
    item={item}
    getTypeColor={getTypeColor}
    lightenColor={lightenColor}
    darkenColor={darkenColor}
    getTypeIcon={getTypeIcon}
  />
);
  const ListFooterComponent = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <LoadingSpinner size={50} color1="#E63F34" color2="#FF5252" color3="#FF7B7B" />
      </View>
    );
  }, [loadingMore]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <LoadingSpinner size={50} color1="#E63F34" color2="#FF5252" color3="#FF7B7B" />
      </View>
    );
  }, [loadingMore]);

  return (
    <View style={styles.container}>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={handleSearch} 
        hasResults={displayedPokemon.length > 0}
      />
      <FlatList
        data={displayedPokemon}
        renderItem={renderPokemonCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.list,
          displayedPokemon.length === 0 && styles.emptyList
        ]}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
    </View>
  );
}

