import { Dispatch, SyntheticEvent } from "react";

export const PaginateItems = (props: {
  setPage: Dispatch<React.SetStateAction<number>>;
  page: number;
  pageCount: number;
}) => {
  const { setPage, page, pageCount } = props;

  const nextPage = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(Number(page + 1));
  };

  const previousPage = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(Number(page - 1));
  };

  const firstPage = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(Number(1));
  };

  const lastPage = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(Number(pageCount));
  };

  return (
    <div>
      <button
        className="paginate-item"
        disabled={page <= 1}
        onClick={previousPage}
      >
        {"<"}
      </button>

      <button
        className="paginate-item"
        disabled={page === 1 || pageCount === 0}
        onClick={firstPage}
      >
        1
      </button>

      {page !== 1 && page !== pageCount ? (
        <button
            className="paginate-item"
            disabled
        >
            {page}
        </button>
      ) : null }

      <button
        className="paginate-item"
        disabled={page === pageCount || pageCount === 0}
        onClick={lastPage}
      >
        {pageCount}
      </button>

      <button
        className="paginate-item"
        disabled={page >= pageCount}
        onClick={nextPage}
      >
        {">"}
      </button>
    </div>
  );
};
