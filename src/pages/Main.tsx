import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../components/Spinner';
import { getBeers, reset } from '../features/beers/beerSlice';
import { BeerResults } from '../components/BeerResults';
import { StyleLegend } from '../components/StyleLegend';
import { AppDispatch, RootState } from 'src/app/store';
import { PaginateItems } from '../components/PaginateItems';
import { Trans, useTranslation } from 'react-i18next';

export function Main() {
	const { t } = useTranslation();
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
		dispatch(
			getBeers({
				page,
				limit,
			})
		);

		return () => {
			dispatch(reset());
		};
	}, [page, limit, attempt, dispatch]);

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
					<h1>{t('list.title')}</h1>
					<p>
						{itemCount > 0 ? `${t('list.count', { count: itemCount })} ` : null}
						{t('list.welcome', { name: user === null ? t('list.guest') : user.name })}{' '}
						{user === null ? (
							<Trans
								i18nKey="list.registerPrompt"
								components={{ register: <Link to="/register" /> }}
							/>
						) : null}
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
						<h2>{t('list.emptyTitle')}</h2>
						<p>{t('list.emptyBody')}</p>
						<Link to={user ? '/create' : '/register'} className="btn">
							{user ? t('nav.createBeer') : t('list.registerToAdd')}
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
