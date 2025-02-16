export const getTypeIcon = (type) => {
    switch (type) {
    case 'normal':
        return require('../icons/normal.png');
      case 'bug':
        return require('../icons/bug.png');
      case 'dragon':
        return require('../icons/dragon.png');
      case 'fire':
        return require('../icons/fire.png');
      case 'water':
        return require('../icons/water.png');
      case 'electric':
        return require('../icons/electric.png');
      case 'grass':
        return require('../icons/grass.png');
      case 'ice':
        return require('../icons/ice.png');
      case 'fighting':
        return require('../icons/fighting.png');
      case 'poison':
        return require('../icons/poison.png');
      case 'ground':
        return require('../icons/ground.png');
      case 'flying':
        return require('../icons/flying.png');
      case 'psychic':
        return require('../icons/psychic.png');
      case 'rock':
        return require('../icons/rock.png');
      case 'ghost':
        return require('../icons/ghost.png');
      case 'dark':
        return require('../icons/dark.png');
      case 'steel':
        return require('../icons/steel.png');
      case 'fairy':
        return require('../icons/fairy.png');
      default:
        return null;
    }
  };
  