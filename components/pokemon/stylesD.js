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
    padding: 16,
    gap: 8,
  },
  aboutItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  aboutGridContainer: {
    padding: 16,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  aboutGridItem: {
    width: '48%', 
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  aboutValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  aboutIcon: {
    marginRight: 8,
  },
  abilityIcon: {
    alignSelf: 'center',
    marginBottom: 2,
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  aboutLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  abilitiesContainer: {
    alignItems: 'center',
  },
  abilityText: {
    fontSize: 14,
    color: '333',
    textAlign: 'center',
    marginVertical: 2,
  },
  divider: {
    display: 'none',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  statName: {
    width: 65,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginRight: 8,
    fontWeight: '600',
  },
  statValue: {
    width: 35,
    fontSize: 14,
    textAlign: 'right',
    marginRight: 8,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#f0f0f0',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  tabContent: {
    flex: 1,
    paddingVertical: 30,
  },
  // Location tab styles
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#333',
  },
  locationItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  // Moves tab styles
  moveItem: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  moveName: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  moveLevel: {
    fontSize: 16,
    color: '#333',
  },
  // Evolution tab styles
  evolutionItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  evolutionPokemon: {
    alignItems: 'center',
  },
  evolutionImage: {
    width: 140,
    height: 140,
  },
  evolutionName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  evolutionArrowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  evolutionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  evolutionLevel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  evolutionTrigger: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  // Description styles
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  descriptionTextContainer: {
    width: '100%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'left',
  },
  tabContent: {
    flex: 1,
    paddingVertical: 20,
  },
  // New style: Icon overlay on detail card
  detailTypeIcon: {
    position: 'absolute',
    right: 30, // adjust horizontal position as needed
    bottom: 50, // adjust vertical position as needed
    width: 200,  // adjust size as needed
    height: 200,
  },

  //Icon Style
  typeIcon: {
    width: 15,
    height: 15,
    marginRight: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  typeBox: {
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    gap: 4,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  regionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },  
  centerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  iconStyle: {
    marginRight: 5, // spacing between icon and text
  },
  
});

export default styles;
