import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  pokemonNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 'auto',
  },
  imageContainer: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 240,
    height: 240,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  typeTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  aboutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  aboutItem: {
    alignItems: 'center',
    flex: 1,
  },
  aboutValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  aboutIcon: {
    marginRight: 5,
  },
  abilityIcon: {
    alignSelf: 'center',
    marginBottom: 2,
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  aboutLabel: {
    fontSize: 12,
    color: '#888',
  },
  abilitiesContainer: {
    alignItems: 'center',
  },
  abilityText: {
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    width: 45,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginRight: 10,
  },
  statValue: {
    width: 35,
    fontSize: 14,
    marginRight: 10,
    textAlign: 'right',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  bottomPadding: {
    height: 40,
  },
});

export default styles;