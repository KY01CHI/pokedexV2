import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Returns the base color for a given move type.
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
  return colors[type] || '#ccc';
};

// Lightens a hex color by a given amount (amount: 0 to 1)
const lightenColor = (hex, amount) => {
  let usePound = false;
  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  const num = parseInt(hex, 16);
  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * amount);
  let b = (num & 0x0000FF) + Math.round(255 * amount);
  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;
  const newColor = (r << 16) | (g << 8) | b;
  return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
};

function MoveColor({ moveItem, styles }) {
  const [moveType, setMoveType] = useState(null);

  useEffect(() => {
    async function fetchMoveDetails() {
      try {
        const response = await fetch(moveItem.move.url);
        const data = await response.json();
        setMoveType(data.type.name);
      } catch (error) {
        console.error("Error fetching move detail:", error);
      }
    }
    fetchMoveDetails();
  }, [moveItem.move.url]);

  const moveColor = moveType ? getTypeColor(moveType) : '#ccc';
  // Lighten the color by 30%
  const lightMoveColor = lightenColor(moveColor, 0.3);

  return (
    <View style={[styles.moveItem, { backgroundColor: lightMoveColor, padding: 10 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.moveName}>
          {moveItem.move.name.replace(/-/g, ' ')}
        </Text>
        {moveItem.learnLevel > 0 && (
          <Text style={[styles.moveLevel, { fontWeight: 'bold' }]}>
            Level {moveItem.learnLevel}
          </Text>
        )}
      </View>
    </View>
  );
}

export default MoveColor;