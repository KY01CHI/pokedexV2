import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Import the getTypeIcon function
import { getTypeIcon } from './path-to-getTypeIcon';

const TypeIconWithName = ({ type }) => {
  const iconSource = getTypeIcon(type);

  if (!iconSource) {
    return null; // Return null if the type is invalid or icon not found
  }

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center items vertically
  },
  icon: {
    width: 24, // Set the desired width
    height: 24, // Set the desired height
    marginRight: 8, // Add space between the icon and text
  },
  text: {
    fontSize: 16, // Set the desired font size
    textTransform: 'capitalize', // Capitalize the first letter
  },
});

export default TypeIconWithName;