import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, hasResults }) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (isFocused) {
        return '#6890F0'; // Water type blue
      } else if (searchQuery.length > 0) {
        return hasResults ? '#78C850' : '#C03028'; // Grass type green, Fighting type red
      }
    return '#6B7280'; // Default border color
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>Who are you looking for?</Text>
      <View style={[styles.searchWrapper, { borderColor: getBorderColor(), borderWidth: 1 }]}>
        <TextInput
          style={styles.input}
          placeholder="Search Pokémon"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.goButton} onPress={handleSearch}>
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    padding: 20,
    marginTop: -10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  goButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
