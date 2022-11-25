import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../components/Spinner";
import { userBeers, reset } from "../features/beers/beerSlice";
import { BeerItem } from "../components/BeerItem";
import { AppDispatch, RootState } from "src/app/store";
import { BeerEntity } from "types";

export function UserBeers() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const { results, pageCount, isLoading, isError, message } = useSelector(
    (state: RootState) => state.beers
  );

  const [currentPage] = useSearchParams();
  const [limitPerPage] = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(
      userBeers({
        page: Number(currentPage.get("page")) || 1,
        limit: Number(limitPerPage.get("limit") || 5),
      })
    );

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    currentPage,
    limitPerPage,
    page,
    limit,
    isError,
    message,
    dispatch,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

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
    <>
      <section className="heading">
        <h1 className="welcome">Welcome {user?.name}</h1>

        <p>Your beers</p>

        <section className="content">
          {results?.length > 0 ? (
            <div className="beers">
              {results?.map((beer: BeerEntity) => (
                <BeerItem key={beer._id + ""} {...beer} />
              ))}
            </div>
          ) : (
            <h3>You have not set any beers</h3>
          )}
        </section>
      </section>
      <button disabled={page === 1 || pageCount === 0} onClick={firstPage}>
        First page
      </button>
      <button disabled={page <= 1} onClick={previousPage}>
        Previous page
      </button>

      <button disabled={page >= pageCount} onClick={nextPage}>
        Next page
      </button>

      <button disabled={page === pageCount || pageCount === 0} onClick={lastPage}>
        Last page
      </button>
    </>
  );
}
