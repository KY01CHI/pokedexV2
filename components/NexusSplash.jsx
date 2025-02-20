import React, { useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const NexusSplash = () => {
  const scale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);
  const rotateAll = new Animated.Value(0);
  const moveAnim = new Animated.Value(0);

  useEffect(() => {
    // Initial scale animation (0.5s)
    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Sequence of animations totaling 5 seconds
    Animated.sequence([
      // Rotate hexagons (1.5s)
      Animated.timing(rotateAll, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      // Move hexagons together (0.75s)
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 750,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      // Hold together briefly (0.5s)
      Animated.delay(500),
      // Move hexagons apart (0.75s)
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 750,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      // Fade in text (1s)
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const rotation = rotateAll.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const factor = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const createHexagonPath = (radius = 60) => {
    const centerX = radius;
    const centerY = radius;
    let path = '';
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      path += i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }
    return path + 'Z';
  };

  const SvgHexagon = () => (
    <Svg width="120" height="120">
      <Path d={createHexagonPath()} fill="#00ffff" />
    </Svg>
  );

  const centerX = 120;
  const centerY = 120;

  const r = 70;
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);
  const offsets = [
    { x: 0, y: -r },
    { x: r * cos30, y: r * sin30 },
    { x: -r * cos30, y: r * sin30 },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale }] }]}>
        <View style={styles.hexagonContainer}>
          {offsets.map((offset, index) => (
            <Animated.View
              key={index}
              style={{
                position: 'absolute',
                left: centerX - 60,
                top: centerY - 60,
                transform: [
                  { rotate: rotation },
                  { translateX: Animated.multiply(factor, offset.x) },
                  { translateY: Animated.multiply(factor, offset.y) },
                ],
              }}
            >
              <SvgHexagon />
            </Animated.View>
          ))}
        </View>
        <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          NEXUS
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  hexagonContainer: {
    width: 240,
    height: 240,
    position: 'relative',
    marginBottom: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D1D5DB',
    letterSpacing: 2,
    marginTop: 40,
  },
};

export default NexusSplash;