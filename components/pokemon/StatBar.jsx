import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';


const StatBar = ({ statName, value, color, styles, animate, animationTrigger }) => {
  const maxStat = 255;
  const percentage = (value / maxStat) * 100;
  const animWidth = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (animate && containerWidth > 0) {
      // Reset the animated width to 0 whenever animationTrigger changes
      animWidth.setValue(0);
      Animated.timing(animWidth, {
        toValue: containerWidth * (percentage / 100),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [containerWidth, percentage, animate, animWidth, animationTrigger]);

  const formatStatName = (name) => {
    switch (name) {
      case 'HP':
        return 'HP';
      case 'ATTACK':
        return 'ATK';
      case 'DEFENSE':
        return 'DEF';
      case 'SPECIAL ATTACK':
        return 'SP. ATK';
      case 'SPECIAL DEFENSE':
        return 'SP. DEF';
      case 'SPEED':
        return 'SPD';
      default:
        return name;
    }
  };

  return (
    <View style={styles.statRow}>
      <Text style={styles.statName}>{formatStatName(statName)}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View
        style={styles.statBarContainer}
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          setContainerWidth(width);
        }}
      >
        <Animated.View
          style={[
            styles.statBar,
            {
              width: animWidth,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default StatBar;
