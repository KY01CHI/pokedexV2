import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EvolutionDetails = ({ evolutionDetails, trigger }) => {
  if (!trigger) return null;

  const renderEvolutionMethod = () => {
    switch (trigger) {
      case 'level-up':
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              Level {evolutionDetails.min_level}
            </Text>
          </View>
        );

      case 'trade':
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              Trade
              {evolutionDetails.held_item && ` with ${formatItemName(evolutionDetails.held_item.name)}`}
            </Text>
          </View>
        );

      case 'use-item':
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              Use {formatItemName(evolutionDetails.item?.name)}
            </Text>
          </View>
        );

      case 'three-critical-hits':
      case 'take-damage':
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              {formatTriggerName(trigger)}
            </Text>
          </View>
        );

      case 'shed':
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              Level 20 (with empty slot and Pokéball)
            </Text>
          </View>
        );

      default:
        return (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-600">
              {formatTriggerName(trigger)}
            </Text>
          </View>
        );
    }
  };

  const formatItemName = (name) => {
    if (!name) return '';
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTriggerName = (name) => {
    if (!name) return '';
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <View className="mt-2 mb-4">
      {renderEvolutionMethod()}
      {evolutionDetails.time_of_day && (
        <View className="flex flex-row items-center gap-2 mt-1">
          <Text className="text-gray-600 capitalize">
            {evolutionDetails.time_of_day} only
          </Text>
        </View>
      )}
      {evolutionDetails.min_happiness && (
        <View className="flex flex-row items-center gap-2 mt-1">
          <Text className="text-gray-600">
            Happiness: {evolutionDetails.min_happiness}+
          </Text>
        </View>
      )}
      {evolutionDetails.min_beauty && (
        <View className="flex flex-row items-center gap-2 mt-1">
          <Text className="text-gray-600">
            Beauty: {evolutionDetails.min_beauty}+
          </Text>
        </View>
      )}
      {evolutionDetails.needs_overworld_rain && (
        <View className="flex flex-row items-center gap-2 mt-1">
          <Text className="text-gray-600">While raining</Text>
        </View>
      )}
    </View>
  );
};

export default EvolutionDetails;