import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTypeIcon } from './typeIcons';
import { darkenColor } from './colorUtils';

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
  const darkerMoveColor = moveType ? darkenColor(moveColor, 0.3) : '#999';

  return (
    <LinearGradient
      colors={[moveColor, darkerMoveColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.moveItem, { padding: 10, borderRadius: 10 }]}
    >
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 8 
        }}>
          {moveType && (
            <Image
              source={getTypeIcon(moveType)}
              style={[styles.typeIcon, { 
                tintColor: '#FFFFFF',
                width: 20,
                height: 20
              }]}
            />
          )}
          <Text style={[styles.moveName, { 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: 16,
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3
          }]}>
            {moveItem.move.name.replace(/-/g, ' ')}
          </Text>
        </View>
        {moveItem.learnLevel > 0 && (
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12
          }}>
            <Text style={[styles.moveLevel, { 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: 14,
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3
            }]}>
              Level {moveItem.learnLevel}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

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

export default MoveColor;