const getSWAPI = {
    get: async (resource) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/${resource}`);
            if (!response.ok) {
                throw new Error (`Error al obtener ${resource} de la API: ${response.statusText}`);
            }
            return (await response.json()).results;
        } catch (error) {
            console.error(`Error al obtener ${resource} de la API:`, error.message);
            throw error;
        }
    }
}
export default getSWAPI;