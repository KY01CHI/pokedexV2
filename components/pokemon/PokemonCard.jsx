import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import pokeball from '@/assets/images/pokeball.png'

const PokemonCard = ({ item, getTypeColor, lightenColor, darkenColor, getTypeIcon }) => {
  const primaryType = item.types[0];
  const baseColor = getTypeColor(primaryType);
  const cardBackground = lightenColor(baseColor, 0.3);
  
  return (
    <TouchableOpacity 
      onPress={() => router.push(`/${item.id}`)}
      style={{
        backgroundColor: cardBackground,
        borderRadius: 16,
        marginHorizontal: 10,
        marginVertical: 8,
        padding: 16,
        flexDirection: 'row',
        height: 140,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: darkenColor(baseColor, 0.2),
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6
      }}
    >
      {/* Pokeball icon */}
      <Image 
        source={pokeball}
        style={{
            position: 'absolute',
            right: 90,
            top: -50,
            width: 250,
            height: 250,
            opacity: 0.3,
            transform: [{ rotate: '30deg' }] // Note the different transform syntax for React Native
        }}
        resizeMode="contain"
        />
      
      {/* Pokemon Image Container */}
      <View style={{
        
        marginRight: 10
      }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 100,
            height: 100,
            transform: [{ scale: 1.1 }]
          }}
        />
      </View>

      {/* Pokemon Info */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 8,     // Add left padding to move everything right
        marginRight: 12  
      }}>
        <Text style={{
          fontSize: 14,
          color: darkenColor(baseColor, 0.3),
          fontWeight: '600',
          marginBottom: 4
        }}>
          #{item.id.toString().padStart(3, '0')}
        </Text>
        
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: darkenColor(baseColor, 0.4),
          marginBottom: 8
        }}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>

        {/* Types Container */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',    // Add this to wrap items to next line
          gap: 6,
          maxWidth: '100%'     // Ensure container doesn't overflow
        }}>
          {item.types.map((type, index) => (
            <View 
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: getTypeColor(type),
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                gap: 4
              }}
            >
              <Image
                source={getTypeIcon(type)}
                style={{
                  width: 16,
                  height: 16,
                  tintColor: '#FFFFFF'
                }}
              />
              <Text style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 13
              }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;