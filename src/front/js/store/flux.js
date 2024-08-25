import getSWAPI from './getSWAPIDispatcher';
import addFavoriteDispatcher  from './addFavoriteDispatcher';
import deleteFavoriteDispatcher from './deleteFavoriteDispatcher';


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			character: {},

			planets: [],
			planet: {},

			vehicles: [],
			vehicle: {},

			favorites: [],
			resources: ['people', 'planets', 'vehicles']
		},
		actions: {
			getSWAPI: async (resource) => {
                try {
                        const result = await getSWAPI.get(resource);
						console.log("Result from API:", result);
						const store = getStore();
                        setStore({...store, [resource]: result });
                        return result;
                } catch (error) {
                        console.error(`Error al obtener ${resource} de la API:`, error);
                        throw error;
                }
            },
            addFavorite: (name, uid, resource) => {
				const newFavorite = addFavoriteDispatcher.addFavorite(name, uid, resource);
				setStore({ favorites: [...getStore().favorites, newFavorite] });
				              
            },
			deleteFavorite: (favorite) => {
				const newFavorites = deleteFavoriteDispatcher.deleteFavorite(favorite, getStore().favorites);
				setStore({ favorites: newFavorites });
			}
			
		}
	};
};

export default getState;