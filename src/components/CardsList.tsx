import { Children } from 'react';
import type { ReactElement } from 'react';

type Props = {
  children: ReactElement | readonly ReactElement[];
};

function CardsList({ children }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-md md:gap-lg">
      {Children.map(children, (child) => (
        <li className="h-full [&>*]:h-full">{child}</li>
      ))}
    </ul>
  );
}

export default CardsList;
