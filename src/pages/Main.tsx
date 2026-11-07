import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../components/Spinner';
import { getBeers, reset } from '../features/beers/beerSlice';
import { BeerItem } from '../components/BeerItem';
import { AppDispatch, RootState } from 'src/app/store';
import { BeerEntity } from 'types';
import { PaginateItems } from '../components/PaginateItems';

export function Main() {
	const dispatch: AppDispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.auth);

	const { results, pageCount, isLoading, isError, message } = useSelector(
		(state: RootState) => state.beers
	);

	const [searchParams] = useSearchParams();

	const [page, setPage] = useState(
		() => Number(searchParams.get('page')) || 1
	);
	const [limit] = useState(() => Number(searchParams.get('limit')) || 5);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(
			getBeers({
				page,
				limit,
			})
		);

		return () => {
			dispatch(reset());
		};
	}, [page, limit, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1 className="welcome">
					Welcome {user === null ? 'guest' : user.name}
				</h1>

				{user === null ? (
					<h3>To create a beer please register an account</h3>
				) : null}

				<p>Beers list</p>

				<section className="content">
					{page > pageCount && pageCount > 0 ? (
						<h3>No more beers and pages.</h3>
					) : results?.length > 0 ? (
						<div className="beers">
							{results?.map((beer: BeerEntity) => (
								<BeerItem key={beer._id + ''} {...beer} />
							))}
						</div>
					) : (
						<h3>You have not set any beers</h3>
					)}
				</section>
			</section>
			{pageCount > 0 && page <= pageCount && (
				<PaginateItems
					setPage={setPage}
					page={page}
					pageCount={pageCount}
				/>
			)}
		</>
	);
}
