import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { getTypeColor, lightenColor } from './colorUtils';

const LoadingSpinner = ({ 
  size = 100,
  type = 'normal',
  message = 'Loading...',
  showMessage = true,
  pulseEffect = true,
  rotationDuration = 1200,
  fullScreen = false // New prop to control full screen mode
}) => {
  // Animations for rings
  const ring1Rotation = useRef(new Animated.Value(0)).current;
  const ring2Rotation = useRef(new Animated.Value(0)).current;
  const ring3Rotation = useRef(new Animated.Value(0)).current;
  
  // Animation for pulsing effect
  const pulseScale = useRef(new Animated.Value(1)).current;
  
  // Animation for loading text opacity
  const textOpacity = useRef(new Animated.Value(0.5)).current;

  // Generate colors based on Pokemon type
  const baseColor = getTypeColor(type);
  const colors = [
    baseColor,
    lightenColor(baseColor, 0.2),
    lightenColor(baseColor, 0.4)
  ];
  
  // Calculate background color - very light version of the type color
  const bgColor = lightenColor(baseColor, 0.8);

  useEffect(() => {
    // Ring rotation animations
    const createSpinAnimation = (value) => {
      return Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: rotationDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    };

    // Pulse animation
    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Text fade animation
    const createTextAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start all animations
    const animations = [
      createSpinAnimation(ring1Rotation),
      createSpinAnimation(ring2Rotation),
      createSpinAnimation(ring3Rotation),
    ];

    if (pulseEffect) {
      animations.push(createPulseAnimation());
    }

    if (showMessage) {
      animations.push(createTextAnimation());
    }

    animations.forEach(animation => animation.start());

    // Cleanup
    return () => animations.forEach(animation => animation.stop());
  }, [pulseEffect, showMessage]);

  const getRotationStyle = (value) => ({
    transform: [
      {
        rotate: value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  });

  const spinnerContent = (
    <>
      <Animated.View 
        style={[
          styles.spinnerContainer, 
          { width: size, height: size },
          pulseEffect && { transform: [{ scale: pulseScale }] }
        ]}
      >
        <Animated.View style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderColor: colors[0],
            borderLeftWidth: size * 0.05,
            borderRightWidth: size * 0.05,
            borderTopWidth: size * 0.05,
          },
          getRotationStyle(ring1Rotation)
        ]} />
        
        <Animated.View style={[
          styles.ring,
          {
            width: size * 0.85,
            height: size * 0.85,
            borderColor: colors[1],
            borderLeftWidth: size * 0.05,
            borderRightWidth: size * 0.05,
            borderBottomWidth: size * 0.05,
          },
          getRotationStyle(ring2Rotation)
        ]} />
        
        <Animated.View style={[
          styles.ring,
          {
            width: size * 0.7,
            height: size * 0.7,
            borderColor: colors[2],
            borderLeftWidth: size * 0.05,
            borderRightWidth: size * 0.05,
            borderTopWidth: size * 0.05,
          },
          getRotationStyle(ring3Rotation)
        ]} />
      </Animated.View>

      {showMessage && (
        <Animated.Text style={[
          styles.loadingText,
          { 
            opacity: textOpacity,
            color: colors[0],
            marginTop: size * 0.2
          }
        ]}>
          {message}
        </Animated.Text>
      )}
    </>
  );

  // Render different container based on fullScreen prop
  if (fullScreen) {
    return (
      <View style={[
        styles.fullScreenContainer,
        { backgroundColor: bgColor }
      ]}>
        {spinnerContent}
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: bgColor }
    ]}>
      {spinnerContent}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 1000,
    borderStyle: 'solid',
    borderWidth: 0,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoadingSpinner;