import getSWAPI from './getSWAPIDispatcher';
import addFavoriteDispatcher from './addFavoriteDispatcher';
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

            resource: ['people', 'planets', 'vehicles'],

            users: [], 

            peopleDetails: {}, 

            planetsDetails: {}, 

            vehiclesDetails: {} 
        },
        actions: {
            
            getSWAPI: async (resource) => {
                try {
                    const result = await getSWAPI.get(resource);
                    console.log("Result from API:", result);
                    const store = getStore();
                    setStore({ ...store, [resource]: result });
                    return result;
                } catch (error) {
                    console.error(`Error al obtener ${resource} de la API:`, error);
                    throw error;
                }
            },

            
            login: async (email, password) => {
                try {
                    let response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });

                    const data = await response.json();
                    if (!data.msg) {
                        localStorage.setItem("token", data.access_token);
                    }
                    return true;

                } catch (error) {
                    console.error("Login error:", error);
                    return false;
                }
            },

            signIn: async (email, password, name) => {
                try {
                    let response = await fetch(`${process.env.BACKEND_URL}api/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password,
                            "name": name,
                            "is_active": true
                        })
                    });

                    const data = await response.json();
                    if (!data.msg) {
                        localStorage.setItem("token", data.access_token);
                    }
                    return true;

                } catch (error) {
                    console.error("Sign-in error:", error);
                    return false;
                }
            },

            logOut: () => {
                localStorage.removeItem("token");
                setStore({ user: null, token: null });
            },

           
            addFavorite: (name, uid, resource) => {
                const newFavorite = addFavoriteDispatcher.addFavorite(name, uid, resource);
                setStore({ favorites: [...getStore().favorites, newFavorite] });
            },

            deleteFavorite: (favorite) => {
                const newFavorites = deleteFavoriteDispatcher.deleteFavorite(favorite, getStore().favorites);
                setStore({ favorites: newFavorites });
            },

            saveFavorite: (id, name, type) => {
                setStore({ favorites: [...getStore().favorites, { name: name, id: id, type: type }] });
            },

            removeFavorite: (name) => {
                const filteredArray = getStore().favorites.filter((item) => item.name != name);
                setStore({ favorites: filteredArray });
            },

            
            getEntitiesDetails: async (id, type) => {
                const result = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                const data = await result.json();
                setStore({ [`${type}Details`]: data.result.properties });
            },

            
            getEntities: async (type) => {
                const res = await fetch(`https://www.swapi.tech/api/${type}`);
                const data = await res.json();
                setStore({ [`${type}`]: data.results });
            },

            
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            }
        }
    };
};

export default getState;
