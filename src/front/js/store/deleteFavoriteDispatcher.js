const deleteFavoriteDispatcher = {
    deleteFavorite: (favorite, favorites) => {       
        const newFavorites = favorites.filter((item) => item.name !== favorite.name);
        console.log(newFavorites);
        return newFavorites;
    }
}

export default deleteFavoriteDispatcher;