import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../components/Spinner';
import { userBeers, reset } from '../features/beers/beerSlice';
import { BeerResults } from '../components/BeerResults';
import { StyleLegend } from '../components/StyleLegend';
import { AppDispatch, RootState } from 'src/app/store';
import { PaginateItems } from '../components/PaginateItems';
import { useTranslation } from 'react-i18next';

export function UserBeers() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.auth);

	const { results, pageCount, itemCount, isLoading, isError } = useSelector(
		(state: RootState) => state.beers
	);

	const [searchParams] = useSearchParams();

	const [page, setPage] = useState(
		() => Number(searchParams.get('page')) || 1
	);
	const [limit] = useState(() => Number(searchParams.get('limit')) || 6);
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		if (!user) {
			navigate('/');
		}

		dispatch(
			userBeers({
				page,
				limit,
			})
		);

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, page, limit, attempt, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return (
			<section className="state state--center" role="alert">
				<h2>{t('list.loadErrorTitle')}</h2>
				<p>{t('list.loadErrorBody')}</p>
				<button type="button" className="btn" onClick={() => setAttempt((n) => n + 1)}>
					{t('common.tryAgain')}
				</button>
			</section>
		);
	}

	return (
		<>
			<header className="page-head">
				<div>
					<h1>{t('userList.title')}</h1>
					<p>
						{t('list.welcome', { name: user?.name })}{' '}
						{itemCount > 0 ? t('userList.count', { count: itemCount }) : null}
					</p>
				</div>
				<StyleLegend />
			</header>

			<BeerResults
				page={page}
				pageCount={pageCount}
				results={results}
				onFirstPage={() => setPage(1)}
				empty={
					<>
						<h2>{t('userList.emptyTitle')}</h2>
						<p>{t('userList.emptyBody')}</p>
						<Link to="/create" className="btn">
							{t('nav.createBeer')}
						</Link>
					</>
				}
			/>
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
