import Button from '@/ui/button';
import { Heart } from 'lucide-react';

type Props = {
  image: string | null;
  name: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
};

function PokemonHero({ image, name, isFavorite, toggleFavorite }: Props) {
  return (
    <div className="group relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:col-span-5 lg:min-h-[600px]">
      <div className="absolute inset-0 bg-primary/5" />
      {image ? (
        <img
          alt={name}
          className="relative z-10 h-auto w-[80%] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
          src={image}
        />
      ) : (
        <p className="relative z-10 text-on-surface-variant">
          No image available
        </p>
      )}
      <div className="absolute bottom-md right-md z-20">
        <Button
          onClick={toggleFavorite}
          variant={isFavorite ? 'primary' : 'favorite'}
        >
          <Heart
            aria-hidden="true"
            className={`transition-transform group-hover/favorite:scale-110 ${isFavorite ? 'fill-current' : ''}`}
            size={18}
          />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </div>
    </div>
  );
}

export default PokemonHero;
