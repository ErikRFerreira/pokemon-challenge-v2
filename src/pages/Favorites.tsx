import Empty from '@/components/Empty';
import FavoritePokemonCard from '@/components/FavoritePokemonCard';
import PageHeader from '@/components/PageHeader';
import { useFavorites } from '@/hooks/useFavorites';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return (
      <Empty
        title="No favorites yet :("
        description="You haven't saved any biological data entries to your favorites. Start exploring the database to build your collection."
        buttonText="Explore Pokémons"
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Your Favorites"
        subtitle="Manage your saved biological data entries."
      />
      <div className="mb-xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((pokemon) => (
          <FavoritePokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onRemove={() => removeFavorite(pokemon.id)}
          />
        ))}
      </div>
    </>
  );
}

export default Favorites;
