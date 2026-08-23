import { useFavorites } from '@/hooks/useFavorites';

function Favorites() {
  const { favorites } = useFavorites();

  console.log('favorites', favorites);

  if (!favorites.length) {
    return <div>No favorites yet</div>;
  }

  return <div>Favorites</div>;
}

export default Favorites;
