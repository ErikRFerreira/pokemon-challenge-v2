type Props = {
  children: React.ReactNode;
};

function CardsList({ children }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-md md:gap-lg">
      {children}
    </ul>
  );
}

export default CardsList;
