const addFavoriteDispatcher = {
    addFavorite: (name, uid, resource) => {
        const newFavorite = {
            name: name,
            id: uid,
            url: '/' + resource + '/' + uid,
            resource: resource
        };        
        return newFavorite;
    }
};

export default addFavoriteDispatcher;