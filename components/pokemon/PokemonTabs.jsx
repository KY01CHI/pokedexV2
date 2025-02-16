import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;

export default function PokemonTabs({ 
  pokemon, 
  species, 
  evolutionChain, 
  locationAreas, 
  renderAboutTab, 
  renderStatsTab, 
  renderEvolutionTab, 
  renderLocationTab, 
  renderMovesTab,
  typeColor
}) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const tabs = [
    { key: 'about', label: 'About' },
    { key: 'stats', label: 'Stats' },
    { key: 'evolution', label: 'Evolution' },
    { key: 'moves', label: 'Moves' }
  ];

  const handleTabPress = (index) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveTab(newIndex);
  };

  const translateX = scrollX.interpolate({
    inputRange: [0, width * (tabs.length - 1)],
    outputRange: [0, TAB_WIDTH * (tabs.length - 1)],
    extrapolate: 'clamp'
  });

  // Combined About and Location render function
  const renderCombinedAboutTab = () => (
    <ScrollView>
      {renderAboutTab()}
      <View style={styles.locationSection}>
        <Text style={styles.locationTitle}>Locations</Text>
        {renderLocationTab()}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabPress(index)}
            style={styles.tab}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            { transform: [{ translateX }], backgroundColor: typeColor }
          ]}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <View style={styles.page}>
          {renderCombinedAboutTab()}
        </View>
        <View style={styles.page}>
          {renderStatsTab(activeTab === 1)}
        </View>
        <View style={styles.page}>
          {renderEvolutionTab()}
        </View>
        <View style={styles.page}>
          {renderMovesTab()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: 'white',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: '#333333',
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: TAB_WIDTH,
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: width,
    flex: 1,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 16,
  },
  locationSection: {
    padding: 16,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
});