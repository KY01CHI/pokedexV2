import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PokemonCard = ({ item, getTypeColor, lightenColor, darkenColor, getTypeIcon }) => {
  const [isMultiLine, setIsMultiLine] = useState(false);
  const typesContainerRef = useRef(null);
  
  const primaryType = item.types[0];
  const baseColor = getTypeColor(primaryType);
  const cardBackground = lightenColor(baseColor, 0.3);
  
  // Calculate responsive dimensions
  const cardWidth = SCREEN_WIDTH - 32;
  const baseCardHeight = Math.min(140, cardWidth * 0.4);
  const imageSize = Math.min(100, baseCardHeight * 0.8);
  
  // Calculate type badge dimensions
  const typeIconSize = Math.max(12, baseCardHeight * 0.11);
  const typeBadgePaddingH = Math.max(8, baseCardHeight * 0.08);
  const typeBadgePaddingV = Math.max(4, baseCardHeight * 0.04);
  const typeBadgeGap = Math.max(4, baseCardHeight * 0.04);

  // Dynamic card height based on type layout
  const cardHeight = isMultiLine ? baseCardHeight * 1.2 : baseCardHeight;

  // Calculate pokeball size - smaller when types wrap to multiple lines
  const pokeballScale = isMultiLine ? 1.1 : 1.4;
  const pokeballSize = cardHeight * pokeballScale;
  const pokeballOffset = isMultiLine ? -cardHeight * 0.1 : -cardHeight * 0.2;

  // Check if types are wrapped to multiple lines
  useEffect(() => {
    if (typesContainerRef.current) {
      typesContainerRef.current.measure((x, y, width, height) => {
        // If height is greater than single line height (assuming ~32px for single line)
        setIsMultiLine(height > 32);
      });
    }
  }, [item.types]);

  return (
    <TouchableOpacity 
      onPress={() => router.push(`/${item.id}`)}
      style={{
        backgroundColor: cardBackground,
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        flexDirection: 'row',
        height: cardHeight,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: darkenColor(baseColor, 0.2),
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
      }}
    >
      {/* Background Pokeball */}
      <View style={{
        position: 'absolute',
        left: pokeballOffset,
        top: pokeballOffset,
        width: pokeballSize,
        height: pokeballSize,
        opacity: 0.3,
      }}>
        <Image 
          source={require('@/assets/images/pokeball.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ rotate: '30deg' }]
          }}
          resizeMode="contain"
        />
      </View>
      
      {/* Pokemon Image Container */}
      <View style={{
        width: imageSize,
        height: imageSize,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: imageSize,
            height: imageSize,
            transform: [{ scale: 1.1 }]
          }}
          resizeMode="contain"
        />
      </View>

      {/* Pokemon Info */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 12,
        paddingVertical: isMultiLine ? 12 : 8,
        alignSelf: 'center',
      }}>
        {/* Pokemon ID */}
        <Text style={{
          fontSize: Math.max(12, baseCardHeight * 0.1),
          color: darkenColor(baseColor, 0.3),
          fontWeight: '600',
          marginBottom: 4
        }}>
          #{item.id.toString().padStart(3, '0')}
        </Text>
        
        {/* Pokemon Name */}
        <Text style={{
          fontSize: Math.max(16, baseCardHeight * 0.14),
          fontWeight: 'bold',
          color: darkenColor(baseColor, 0.4),
          marginBottom: 8,
          textTransform: 'capitalize'
        }}>
          {item.name}
        </Text>

        {/* Types Container */}
        <View 
          ref={typesContainerRef}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: typeBadgeGap,
            alignItems: 'center',
          }}
        >
          {item.types.map((type, index) => {
            const typeNameLength = type.length;
            const minWidth = Math.max(60, baseCardHeight * 0.4);
            const dynamicWidth = Math.min(
              110,
              minWidth + (typeNameLength > 4 ? (typeNameLength - 4) * 6 : 0)
            );

            return (
              <View 
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getTypeColor(type),
                  paddingHorizontal: typeBadgePaddingH,
                  paddingVertical: typeBadgePaddingV,
                  borderRadius: Math.max(12, baseCardHeight * 0.12),
                  gap: typeBadgeGap,
                  minWidth: dynamicWidth,
                }}
              >
                <Image
                  source={getTypeIcon(type)}
                  style={{
                    width: typeIconSize,
                    height: typeIconSize,
                    tintColor: '#FFFFFF'
                  }}
                />
                <Text style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: Math.max(11, baseCardHeight * 0.09),
                  textTransform: 'capitalize'
                }}>
                  {type}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;