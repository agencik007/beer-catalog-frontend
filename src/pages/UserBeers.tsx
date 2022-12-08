import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../components/Spinner";
import { userBeers, reset } from "../features/beers/beerSlice";
import { BeerItem } from "../components/BeerItem";
import { AppDispatch, RootState } from "src/app/store";
import { BeerEntity } from "types";
import { PaginateItems } from "../components/PaginateItems";

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
  const [limit] = useState(5);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(
      userBeers({
        page: Number(currentPage.get("page")) || page,
        limit: Number(limitPerPage.get("limit") || limit),
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

  return (
    <>
      <section className="heading">
        <h1 className="welcome">Welcome {user?.name}</h1>

        <p>Your beers</p>

        <section className="content">
          {Number(currentPage.get("page")) > pageCount ? (
            <h3>No more beers and pages.</h3>
          ) : results?.length > 0 ? (
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
      {Number(currentPage.get("page")) < pageCount && (
        <PaginateItems setPage={setPage} page={page} pageCount={pageCount} />
      )}
    </>
  );
}
