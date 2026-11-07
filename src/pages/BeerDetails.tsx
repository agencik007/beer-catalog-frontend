import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'src/app/store';
import { BeerEntity } from 'types';
import { Spinner } from '../components/Spinner';
import { deleteBeer, getBeer } from '../features/beers/beerSlice';
import BeerImage from '../assets/images/beer.png';

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

function listReturn(state: unknown): { href: string; label: string } {
	const origin = readOrigin(state);

	if (origin.from === '/user') {
		return {
			href: `/user${origin.search ?? ''}`,
			label: 'Back to your beers',
		};
	}

	if (!origin.from) {
		return { href: '/', label: 'Back to the list' };
	}

	const params = new URLSearchParams(origin.search ?? '');
	if (origin.page && origin.page > 0) {
		params.set('page', String(origin.page));
	}

	const query = params.toString();

	return {
		href: query ? `/?${query}` : '/',
		label: 'Back to the list',
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
	return (
		<section className="heading">
			<h3>Beer not found.</h3>
			<Link to="/" className="beer-detail-back">
				Back to the list
			</Link>
		</section>
	);
}

function BeerLoadError({ onRetry }: { onRetry: () => void }) {
	return (
		<section className="heading">
			<h3>Could not load this beer.</h3>
			<button type="button" className="btn beer-detail-retry" onClick={onRetry}>
				Try again
			</button>
		</section>
	);
}

function BeerPhoto({ avatar }: { avatar?: string }) {
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	const source =
		avatar && avatar.trim() !== '' && failedSrc !== avatar
			? avatar
			: BeerImage;

	return (
		<img
			src={source}
			alt="beer"
			onError={() => {
				if (avatar) {
					setFailedSrc(avatar);
				}
			}}
		/>
	);
}

export function BeerDetails() {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const back = listReturn(location.state);
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
				toast.success('Successfully deleted.');
				navigate(back.href);
				return;
			}

			setDeleting(false);
			setDeleteError('Could not delete this beer.');
		});
	};

	return (
		<section className="heading">
			<Link to={back.href} className="beer-detail-back">
				{back.label}
			</Link>
			<article className="beer-detail">
				<div className="beer-detail-media">
					<BeerPhoto avatar={beer.avatar} />
				</div>
				<div className="beer-detail-body">
					<h1>{isBlank(beer.name) ? '—' : beer.name}</h1>
					<h2>{isBlank(beer.type) ? '—' : beer.type}</h2>
					<div className="rating">
						<Rating initialValue={rating} readonly />
					</div>
					<strong className="alcohol">
						Alcohol: {isBlank(beer.alcohol) ? '—' : beer.alcohol}%
					</strong>
					{isBlank(beer.description) ? null : (
						<p className="beer-detail-description">{beer.description}</p>
					)}
					<small className="beer-detail-date">
						Created:{' '}
						{new Date(beer.createdAt).toLocaleDateString('pl-PL')} by{' '}
						{beer.createdBy}
					</small>
					{canDelete ? (
						<button
							type="button"
							className="close"
							onClick={onDelete}
							disabled={deleting}
						>
							Delete
						</button>
					) : null}
					{deleteError ? (
						<p className="beer-detail-delete-error">{deleteError}</p>
					) : null}
				</div>
			</article>
		</section>
	);
}
