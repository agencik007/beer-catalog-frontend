import { CSSProperties, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteBeer, getBeers, userBeers } from '../features/beers/beerSlice';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'src/app/store';
import { Rating } from 'react-simple-star-rating';
import { useTranslation } from 'react-i18next';
import { BeerEntity } from 'types';
import { BeerPhoto } from './BeerPhoto';
import { beerStyleKey, beerStyleLabel, formatAlcohol, formatDate } from '../lib/beerStyle';

import './BeerItem.css';

export const BeerItem = (beer: BeerEntity & { index?: number }) => {
	const { t } = useTranslation();
	const dispatch: AppDispatch = useDispatch();

	const location = useLocation();

	const { currentPage, limitPerPage } = useSelector(
		(state: RootState) => state.beers
	);
	const { user } = useSelector((state: RootState) => state.auth);

	const beerId = beer._id ? String(beer._id) : '';
	const detailState = {
		from: location.pathname,
		search: location.search,
		page: currentPage > 0 ? currentPage : undefined,
	};

	const [deleting, setDeleting] = useState(false);

	const onDelete = async () => {
		if (deleting || !beerId) {
			return;
		}

		setDeleting(true);
		const action = await dispatch(deleteBeer(beerId));
		if (!deleteBeer.fulfilled.match(action)) {
			setDeleting(false);
			toast.error(t('beer.deleteFailed'));
			return;
		}

		toast.success(t('beer.deleted'));
		const page = { page: currentPage, limit: limitPerPage };
		dispatch(location.pathname === '/user' ? userBeers(page) : getBeers(page));
	};

	const isOwner = !!user && beer.user === user._id;
	const canDelete = !!user && (isOwner || user.role === 'admin');
	const rating = Number.isFinite(Number(beer.rating)) ? Number(beer.rating) : 0;

	const field = (
		<>
			<span className="label__type">{beerStyleLabel(beer.type, t)}</span>
			<h2 className="label__name">{beer.name}</h2>
			<BeerPhoto avatar={beer.avatar} name={beer.name} className="label__img" fallback={false} />
		</>
	);

	return (
		<article
			className="label"
			data-style={beerStyleKey(beer.type)}
			style={{ '--i': beer.index ?? 0 } as CSSProperties}
		>
			{beerId ? (
				<Link to={`/beer/${beerId}`} state={detailState} className="label__field">
					{field}
				</Link>
			) : (
				<div className="label__field">{field}</div>
			)}
			{isOwner ? <span className="label__stamp">{t('beer.yours')}</span> : null}

			<dl className="label__back">
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
							size={16}
							fillColor="#111111"
							emptyColor="rgba(17,17,17,0.2)"
						/>
					</dd>
				</div>
				<div>
					<dt>{t('beer.addedBy')}</dt>
					<dd>
						<span className="label__author">{beer.createdBy || '—'}</span>
						<span className="label__date num">{formatDate(beer.createdAt)}</span>
					</dd>
				</div>
			</dl>

			{canDelete ? (
				<div className="label__actions">
					<button
						type="button"
						className="btn btn--danger btn--small"
						onClick={onDelete}
						disabled={deleting}
					>
						{deleting ? t('beer.deleting') : t('beer.delete')}
					</button>
				</div>
			) : null}
		</article>
	);
};
