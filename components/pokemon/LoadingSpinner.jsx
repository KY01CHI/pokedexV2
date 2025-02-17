import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingSpinner = ({ size = 100, color1 = '#FF5252', color2 = '#FF7B7B', color3 = '#FFA4A4' }) => {
  // Create animated values for each ring
  const ring1Rotation = React.useRef(new Animated.Value(0)).current;
  const ring2Rotation = React.useRef(new Animated.Value(0)).current;
  const ring3Rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animation configuration
    const createSpinAnimation = (animatedValue) => {
      return Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 650, // Match the original animation duration
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    };

    // Start animations
    const animations = [
      createSpinAnimation(ring1Rotation),
      createSpinAnimation(ring2Rotation),
      createSpinAnimation(ring3Rotation),
    ];

    animations.forEach(animation => animation.start());

    // Cleanup
    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  // Create interpolated rotations
  const getRotationStyle = (animatedValue) => ({
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[
        styles.ring,
        { 
          width: size,
          height: size,
          borderColor: color1,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderTopWidth: 4,
        },
        getRotationStyle(ring1Rotation)
      ]} />
      
      <Animated.View style={[
        styles.ring,
        {
          width: size - 15,
          height: size - 15,
          borderColor: color2,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderBottomWidth: 4,
        },
        getRotationStyle(ring2Rotation)
      ]} />
      
      <Animated.View style={[
        styles.ring,
        {
          width: size - 30,
          height: size - 30,
          borderColor: color3,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderTopWidth: 4,
        },
        getRotationStyle(ring3Rotation)
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 0,
  },
});

export default LoadingSpinner;