import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'src/app/store';
import { BeerEntity } from 'types';
import { Spinner } from '../components/Spinner';
import { deleteBeer, getBeer } from '../features/beers/beerSlice';
import { BeerPhoto } from '../components/BeerPhoto';
import { beerStyleKey, beerStyleLabel, formatAlcohol, formatDate } from '../lib/beerStyle';
import { FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

import './BeerDetails.css';

const BEER_ID = /^[a-f\d]{24}$/i;

type ListOrigin = {
	from?: string;
	search?: string;
	page?: number;
};

function readOrigin(state: unknown): ListOrigin {
	if (!state || typeof state !== 'object') {
		return {};
	}

	const origin = state as {
		from?: unknown;
		search?: unknown;
		page?: unknown;
	};

	return {
		from: typeof origin.from === 'string' ? origin.from : undefined,
		search: typeof origin.search === 'string' ? origin.search : undefined,
		page: typeof origin.page === 'number' ? origin.page : undefined,
	};
}

function listReturn(state: unknown, t: TFunction): { href: string; label: string } {
	const origin = readOrigin(state);

	if (origin.from === '/user') {
		return {
			href: `/user${origin.search ?? ''}`,
			label: t('beer.backToYours'),
		};
	}

	if (!origin.from) {
		return { href: '/', label: t('beer.backToList') };
	}

	const params = new URLSearchParams(origin.search ?? '');
	if (origin.page && origin.page > 0) {
		params.set('page', String(origin.page));
	}

	const query = params.toString();

	return {
		href: query ? `/?${query}` : '/',
		label: t('beer.backToList'),
	};
}

function isBlank(value: unknown): boolean {
	return (
		value === null ||
		value === undefined ||
		(typeof value === 'string' && value.trim() === '')
	);
}

function BeerMissing() {
	const { t } = useTranslation();
	return (
		<section className="state state--center">
			<h2>{t('beer.notFoundTitle')}</h2>
			<p>{t('beer.notFoundBody')}</p>
			<Link to="/" className="btn">
				{t('beer.backToList')}
			</Link>
		</section>
	);
}

function BeerLoadError({ onRetry }: { onRetry: () => void }) {
	const { t } = useTranslation();
	return (
		<section className="state state--center">
			<h2>{t('beer.loadErrorTitle')}</h2>
			<p>{t('list.loadErrorBody')}</p>
			<button type="button" className="btn" onClick={onRetry}>
				{t('common.tryAgain')}
			</button>
		</section>
	);
}

export function BeerDetails() {
	const { t } = useTranslation();
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const back = listReturn(location.state, t);
	const validId = typeof id === 'string' && BEER_ID.test(id);

	const { user } = useSelector((state: RootState) => state.auth);
	const { selectedBeer, selectedBeerId, selectedBeerStatus } = useSelector(
		(state: RootState) => state.beers
	);

	const [deleteError, setDeleteError] = useState('');
	const [deleting, setDeleting] = useState(false);
	const [settledId, setSettledId] = useState<string | null>(null);

	useEffect(() => {
		setDeleteError('');
		setDeleting(false);
		setSettledId(null);

		if (!validId || !id) {
			return;
		}

		dispatch(getBeer(id));
	}, [dispatch, id, validId]);

	useEffect(() => {
		if (!id || selectedBeerId !== id) {
			return;
		}

		if (
			selectedBeerStatus === 'ready' ||
			selectedBeerStatus === 'notFound' ||
			selectedBeerStatus === 'error'
		) {
			setSettledId(id);
		}
	}, [id, selectedBeerId, selectedBeerStatus]);

	if (!validId) {
		return <BeerMissing />;
	}

	const settled = settledId === id && selectedBeerId === id;

	if (settled && selectedBeerStatus === 'notFound') {
		return <BeerMissing />;
	}

	if (settled && selectedBeerStatus === 'error') {
		return <BeerLoadError onRetry={() => dispatch(getBeer(id))} />;
	}

	if (!settled || selectedBeerStatus !== 'ready' || !selectedBeer) {
		return <Spinner />;
	}

	const beer: BeerEntity = selectedBeer;
	const ratingValue = Number(beer.rating);
	const rating = Number.isFinite(ratingValue) ? ratingValue : 0;
	const canDelete =
		!!user && (beer.user === user._id || user.role === 'admin');

	const onDelete = () => {
		if (deleting) {
			return;
		}

		setDeleting(true);
		setDeleteError('');

		dispatch(deleteBeer(id)).then((action) => {
			if (deleteBeer.fulfilled.match(action)) {
				toast.success(t('beer.deleted'));
				navigate(back.href);
				return;
			}

			setDeleting(false);
			setDeleteError(t('beer.deleteFailedDetail'));
		});
	};

	return (
		<section className="detail">
			<Link to={back.href} className="detail__back">
				<FiArrowLeft aria-hidden="true" /> {back.label}
			</Link>
			<article className="detail__label" data-style={beerStyleKey(beer.type)}>
				<div className="detail__field">
					<span className="detail__type">{beerStyleLabel(beer.type, t)}</span>
					<h1 className="detail__name">{isBlank(beer.name) ? '—' : beer.name}</h1>
					<BeerPhoto avatar={beer.avatar} name={beer.name} className="detail__img" />
				</div>
				<div className="detail__back-label">
					<h2 className="detail__heading">{t('beer.about')}</h2>
					{isBlank(beer.description) ? (
						<p className="detail__desc detail__desc--empty">{t('beer.noDescription')}</p>
					) : (
						<p className="detail__desc">{beer.description}</p>
					)}
					<dl className="detail__facts">
						<div>
							<dt>{t('beer.alcohol')}</dt>
							<dd className="num">{formatAlcohol(beer.alcohol)}</dd>
						</div>
						<div>
							<dt>{t('beer.rating')}</dt>
							<dd>
								<span className="visually-hidden">{t('beer.ratingOf', { value: rating })}</span>
								<Rating
									initialValue={rating}
									readonly
									size={20}
									fillColor="#111111"
									emptyColor="rgba(17,17,17,0.2)"
								/>
							</dd>
						</div>
						<div>
							<dt>{t('beer.addedBy')}</dt>
							<dd>{isBlank(beer.createdBy) ? '—' : beer.createdBy}</dd>
						</div>
						<div>
							<dt>{t('beer.addedOn')}</dt>
							<dd className="num">{formatDate(beer.createdAt)}</dd>
						</div>
					</dl>
					{canDelete ? (
						<div className="detail__actions">
							<button
								type="button"
								className="btn btn--danger"
								onClick={onDelete}
								disabled={deleting}
							>
								{deleting ? t('beer.deleting') : t('beer.deleteBeer')}
							</button>
							{deleteError ? (
								<p className="detail__error" role="alert">
									{deleteError}
								</p>
							) : null}
						</div>
					) : null}
				</div>
			</article>
		</section>
	);
}
