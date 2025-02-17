import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    position: 'relative',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  pokemonInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pokemonId: {
    fontSize: 14,
    color: '#0000000',
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
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
  },

  loadingFooter: {
    padding: 20,
    alignItems: 'center',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    marginTop: 90,
  },
  emptyText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 18,
    color: '#999',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },

  //Icon styles
  typeIcon: {
    width: 15,    // reduced width
    height: 15,   // reduced height
  },
});