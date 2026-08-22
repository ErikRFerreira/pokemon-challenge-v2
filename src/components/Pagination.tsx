import { Link } from 'react-router-dom';

/*

*/

type Props = {
  page: number;
  totalPages: number;
};

function Pagination({ page, totalPages }: Props) {
  return (
    <nav aria-label="Pokemon list pagination">
      {page > 1 && <Link to={`/?page=${page - 1}`}>Previous</Link>}
      <span>
        Page {page} of {totalPages}
      </span>
      {page < totalPages && <Link to={`/?page=${page + 1}`}>Next</Link>}
    </nav>
  );
}

export default Pagination;
