import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import { GenerationIcon, THEMED_GENERATION_ICONS } from './generationIcons';
import { darkenColor } from './colorUtils';

const determineRegionFromLocationArea = (locationAreaName) => {
  // Convert to lowercase for case-insensitive matching
  const name = locationAreaName.toLowerCase();
  
  // Define region patterns
  const regionPatterns = {
    kanto: ['viridian', 'pewter', 'cerulean', 'vermilion', 'celadon', 'fuchsia', 'saffron', 'cinnabar', 'pallet', 'lavender'],
    johto: ['new-bark', 'cherrygrove', 'violet', 'azalea', 'goldenrod', 'ecruteak', 'olivine', 'cianwood', 'mahogany', 'blackthorn'],
    hoenn: ['littleroot', 'oldale', 'petalburg', 'rustboro', 'dewford', 'slateport', 'mauville', 'fortree', 'lilycove', 'mossdeep'],
    sinnoh: ['twinleaf', 'sandgem', 'jubilife', 'oreburgh', 'floaroma', 'eterna', 'hearthome', 'veilstone', 'pastoria', 'sunyshore'],
    unova: ['nuvema', 'accumula', 'striaton', 'nacrene', 'castelia', 'nimbasa', 'driftveil', 'mistralton', 'icirrus', 'opelucid'],
    kalos: ['vaniville', 'aquacorde', 'santalune', 'lumiose', 'camphrier', 'cyllage', 'shalour', 'coumarine', 'laverre', 'anistar'],
    alola: ['melemele', 'akala', 'ula-ula', 'poni', 'hau-oli', 'heahea', 'malie', 'seafolk'],
    galar: ['postwick', 'wedgehurst', 'motostoke', 'turffield', 'hulbury', 'hammerlocke', 'stow-on-side', 'ballonlea', 'circhester', 'spikemuth'],
    paldea: ['mesagoza', 'artazon', 'levincia', 'cascarrafa', 'medali', 'montenevera', 'cortondo', 'alfornada']
  };

  // Check each region's patterns
  for (const [region, patterns] of Object.entries(regionPatterns)) {
    if (patterns.some(pattern => name.includes(pattern))) {
      return region;
    }
  }

  // Attempt to determine region from route info if applicable
  if (name.includes('route')) {
    const routeNumber = parseInt(name.match(/\d+/)?.[0] || '0');
    if (routeNumber <= 25 && !name.includes('unova') && !name.includes('kalos')) return 'kanto';
    if (routeNumber <= 48 && !name.includes('unova') && !name.includes('kalos')) return 'johto';
    if (routeNumber <= 134 && !name.includes('unova') && !name.includes('kalos')) return 'hoenn';
    if (routeNumber <= 230 && !name.includes('unova') && !name.includes('kalos')) return 'sinnoh';
    if (routeNumber <= 23 && name.includes('unova')) return 'unova';
    if (routeNumber <= 22 && name.includes('kalos')) return 'kalos';
    if (name.includes('alola')) return 'alola';
    if (name.includes('galar')) return 'galar';
    if (name.includes('paldea')) return 'paldea';
  }

  return 'unknown';
};

const getRegionColor = (region) => {
  const colors = {
    kanto: '#FF1111',
    johto: '#DAA520',
    hoenn: '#4997D0',
    sinnoh: '#AFB4DB',
    unova: '#444444',
    kalos: '#1E90FF',
    alola: '#FFA500',
    galar: '#4169E1',
    paldea: '#800080',
    unknown: '#666666' // This color is overridden below when region is unknown
  };
  return colors[region] || colors.unknown;
};

const getGenerationFromRegion = (region) => {
  const genMapping = {
    kanto: 'generation-i',
    johto: 'generation-ii',
    hoenn: 'generation-iii',
    sinnoh: 'generation-iv',
    unova: 'generation-v',
    kalos: 'generation-vi',
    alola: 'generation-vii',
    galar: 'generation-viii',
    paldea: 'generation-ix',
    unknown: 'unknown'
  };
  return genMapping[region] || 'unknown';
};

const LocationItem = ({ locationArea }) => {
  const actualRegion = determineRegionFromLocationArea(locationArea.location_area.name);
  const generation = getGenerationFromRegion(actualRegion);

  // Use a black gradient when region is unknown
  const baseColor = actualRegion === 'unknown' ? '#000000' : getRegionColor(actualRegion);
  const darkerColor = actualRegion === 'unknown' ? '#000000' : darkenColor(baseColor, 0.3);

  return (
    <LinearGradient
      colors={[baseColor, darkerColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ marginBottom: 12, borderRadius: 10, padding: 16 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          {actualRegion === 'unknown' ? (
            <Ionicons name="help-circle" size={20} color="#FFFFFF" />
          ) : (
            <GenerationIcon generation={generation} size={20} style={{ tintColor: '#FFFFFF' }} />
          )}
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                textTransform: 'capitalize',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 3,
                flexWrap: 'wrap',
              }}
            >
              {locationArea.location_area.name.replace(/-/g, ' ')}
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14, textTransform: 'capitalize' }}>
              {actualRegion === 'unknown'
                ? 'Unknown Region'
                : `${THEMED_GENERATION_ICONS[generation]?.label || 'Unknown'} Region`}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LocationItem;
