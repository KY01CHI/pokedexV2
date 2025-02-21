import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const THEMED_GENERATION_ICONS = {
  'generation-i': {
    icon: 'leaf-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Kanto'
  },
  'generation-ii': {
    icon: 'feather',
    type: 'material',
    color: 'white',
    label: 'Johto'
  },
  'generation-iii': {
    icon: 'water-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Hoenn'
  },
  'generation-iv': {
    icon: 'diamond-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Sinnoh'
  },
  'generation-v': {
    icon: 'contrast-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Unova'
  },
  'generation-vi': {
    icon: 'prism-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Kalos'
  },
  'generation-vii': {
    icon: 'sunny-outline',
    type: 'ionicon',
    color: 'white',
    label: 'Alola'
  },
  'generation-viii': {
    icon: 'shield-sword',
    type: 'material',
    color: 'white',
    label: 'Galar'
  },
  'generation-ix': {
    icon: 'compass-outline',
    type: 'ionic',
    color: 'white',
    label: 'Paldea'
  }
};

export const GenerationIcon = ({ generation, size = 24, style = {} }) => {
  const genData = THEMED_GENERATION_ICONS[generation] || THEMED_GENERATION_ICONS['generation-i'];
  
  return genData.type === 'material' ? (
    <MaterialCommunityIcons 
      name={genData.icon} 
      size={size} 
      color={genData.color}
      style={style}
    />
  ) : (
    <Ionicons 
      name={genData.icon} 
      size={size} 
      color={genData.color}
      style={style}
    />
  );
};