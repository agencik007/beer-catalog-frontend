import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { Trans, useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'src/app/store';
import { RatingSummary, ReviewEntity } from 'types';
import { ratingUpdated } from '../features/beers/beerSlice';
import {
	REVIEW_COMMENT_MAX,
	reviewService,
} from '../features/reviews/reviewService';
import { formatDate } from '../lib/beerStyle';

import './BeerReviews.css';

type ListStatus = 'loading' | 'ready' | 'error';

const STAR_FILL = '#111111';
const STAR_EMPTY = 'rgba(17,17,17,0.2)';

function errorStatus(error: unknown): number {
	return (error as { response?: { status?: number } })?.response?.status ?? 0;
}

function Stars({ value, size }: { value: number; size: number }) {
	return (
		<Rating
			initialValue={value}
			readonly
			allowFraction
			size={size}
			fillColor={STAR_FILL}
			emptyColor={STAR_EMPTY}
		/>
	);
}

export function BeerReviews({
	beerId,
	ratingAvg = 0,
	ratingCount = 0,
}: { beerId: string } & Partial<RatingSummary>) {
	const { t } = useTranslation();
	const dispatch: AppDispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);
	const token = user?.token ?? null;

	const [reviews, setReviews] = useState<ReviewEntity[]>([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [status, setStatus] = useState<ListStatus>('loading');
	const [loadingMore, setLoadingMore] = useState(false);

	const [mine, setMine] = useState<ReviewEntity | null>(null);
	const [editing, setEditing] = useState(false);
	const [draftRating, setDraftRating] = useState(0);
	const [draftComment, setDraftComment] = useState('');
	const [formError, setFormError] = useState('');
	const [saving, setSaving] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const describeError = useCallback(
		(error: unknown, fallback: string) => {
			const code = errorStatus(error);
			if (code === 429) return t('reviews.tooMany');
			if (code === 401) return t('reviews.sessionExpired');
			return fallback;
		},
		[t]
	);

	const loadFirstPage = useCallback(async () => {
		setStatus('loading');
		try {
			const data = await reviewService.list(beerId, 1);
			setReviews(data.results);
			setPage(1);
			setPageCount(data.pageCount);
			setStatus('ready');
		} catch {
			setStatus('error');
		}
	}, [beerId]);

	useEffect(() => {
		loadFirstPage();
	}, [loadFirstPage]);

	useEffect(() => {
		setMine(null);
		setEditing(false);
		if (!token) return;

		let cancelled = false;
		reviewService
			.getMine(beerId, token)
			.then((review) => {
				if (!cancelled) setMine(review);
			})
			.catch(() => {
				// The list still works; the form simply starts empty
			});
		return () => {
			cancelled = true;
		};
	}, [beerId, token]);

	const startEditing = () => {
		setDraftRating(mine?.rating ?? 0);
		setDraftComment(mine?.comment ?? '');
		setFormError('');
		setEditing(true);
	};

	const applySummary = (summary: RatingSummary) =>
		dispatch(ratingUpdated({ beerId, ...summary }));

	const onLoadMore = async () => {
		if (loadingMore) return;
		setLoadingMore(true);
		try {
			const data = await reviewService.list(beerId, page + 1);
			setReviews((prev) => {
				const seen = new Set(prev.map((r) => r._id));
				return [...prev, ...data.results.filter((r) => !seen.has(r._id))];
			});
			setPage(data.currentPage);
			setPageCount(data.pageCount);
		} catch {
			toast.error(t('reviews.loadFailed'));
		} finally {
			setLoadingMore(false);
		}
	};

	const onSave = async (event: FormEvent) => {
		event.preventDefault();
		if (!token || saving) return;
		if (draftRating < 1) {
			setFormError(t('reviews.pickRating'));
			return;
		}

		setSaving(true);
		setFormError('');
		try {
			const comment = draftComment.trim();
			const { review, ...summary } = await reviewService.saveMine(
				beerId,
				{ rating: draftRating, ...(comment ? { comment } : {}) },
				token
			);
			setMine(review);
			setReviews((prev) => [review, ...prev.filter((r) => r._id !== review._id)]);
			applySummary(summary);
			setEditing(false);
			toast.success(t('reviews.saved'));
		} catch (error) {
			setFormError(describeError(error, t('reviews.saveFailed')));
		} finally {
			setSaving(false);
		}
	};

	const onDelete = async (review: ReviewEntity) => {
		if (!token || deletingId) return;
		setDeletingId(review._id);
		try {
			const summary = await reviewService.deleteById(beerId, review._id, token);
			setReviews((prev) => prev.filter((r) => r._id !== review._id));
			if (mine?._id === review._id) {
				setMine(null);
				setEditing(false);
			}
			applySummary(summary);
			toast.success(t('reviews.deleted'));
		} catch (error) {
			toast.error(describeError(error, t('reviews.deleteFailed')));
		} finally {
			setDeletingId(null);
		}
	};

	const isMine = (review: ReviewEntity) =>
		!!user && (review.user === user._id || review.user === user.id);
	const canDelete = (review: ReviewEntity) => isMine(review) || user?.role === 'admin';

	const showForm = !!token && (editing || !mine);

	return (
		<section className="reviews" aria-labelledby="reviews-title">
			<header className="reviews__head">
				<div>
					<h2 id="reviews-title" className="reviews__title">
						{t('reviews.title')}
					</h2>
					<p className="reviews__lead">{t('reviews.lead')}</p>
				</div>
				<div className="reviews__summary">
					{ratingCount > 0 ? (
						<>
							<span className="reviews__avg num">{ratingAvg.toFixed(1)}</span>
							<span className="visually-hidden">{t('beer.ratingOf', { value: ratingAvg })}</span>
							<Stars value={ratingAvg} size={20} />
							<span className="reviews__count num">
								{t('beer.ratingCount', { count: ratingCount })}
							</span>
						</>
					) : (
						<span className="reviews__count">{t('beer.noRatings')}</span>
					)}
				</div>
			</header>

			{!token ? (
				<p className="reviews__signin">
					<Trans i18nKey="reviews.signInPrompt" components={{ login: <Link to="/login" /> }} />
				</p>
			) : null}

			{token && mine && !editing ? (
				<div className="reviews__mine">
					<h3 className="reviews__subtitle">{t('reviews.yourReview')}</h3>
					<div className="review__stars">
						<span className="visually-hidden">{t('beer.ratingOf', { value: mine.rating })}</span>
						<Stars value={mine.rating} size={20} />
					</div>
					{mine.comment ? <p className="review__comment">{mine.comment}</p> : null}
					<div className="reviews__actions">
						<button type="button" className="btn btn--ghost btn--small" onClick={startEditing}>
							{t('reviews.edit')}
						</button>
						<button
							type="button"
							className="btn btn--danger btn--small"
							onClick={() => onDelete(mine)}
							disabled={deletingId !== null}
						>
							{deletingId === mine._id ? t('reviews.deleting') : t('reviews.delete')}
						</button>
					</div>
				</div>
			) : null}

			{showForm ? (
				<form className="reviews__form" onSubmit={onSave} noValidate>
					<h3 className="reviews__subtitle">{t('reviews.yourReview')}</h3>
					<div className="form-group">
						<span className="field-label" id="review-rating-label">
							{t('reviews.ratingLabel')}
						</span>
						<div role="group" aria-labelledby="review-rating-label">
							<Rating
								key={`${mine?._id ?? 'new'}-${editing}`}
								initialValue={draftRating}
								size={30}
								fillColor={STAR_FILL}
								emptyColor={STAR_EMPTY}
								onClick={(value) => {
									setDraftRating(value);
									setFormError('');
								}}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="review-comment">
							{t('reviews.commentLabel')}
						</label>
						<textarea
							id="review-comment"
							maxLength={REVIEW_COMMENT_MAX}
							placeholder={t('reviews.commentPlaceholder')}
							value={draftComment}
							onChange={(e) => setDraftComment(e.target.value)}
						/>
						<span className="field-hint num">
							{t('create.characters', { current: draftComment.length, max: REVIEW_COMMENT_MAX })}
						</span>
					</div>
					{formError ? (
						<p className="reviews__error" role="alert">
							{formError}
						</p>
					) : null}
					<div className="reviews__actions">
						<button type="submit" className="btn" disabled={saving}>
							{saving ? t('reviews.saving') : mine ? t('reviews.update') : t('reviews.save')}
						</button>
						{mine ? (
							<button
								type="button"
								className="btn btn--ghost"
								onClick={() => setEditing(false)}
								disabled={saving}
							>
								{t('reviews.cancel')}
							</button>
						) : null}
					</div>
				</form>
			) : null}

			{status === 'loading' ? (
				<p className="reviews__note">{t('reviews.loadingMore')}</p>
			) : status === 'error' ? (
				<div className="reviews__note">
					<p>{t('reviews.loadFailed')}</p>
					<button type="button" className="btn btn--ghost btn--small" onClick={loadFirstPage}>
						{t('common.tryAgain')}
					</button>
				</div>
			) : reviews.length === 0 ? (
				<p className="reviews__note">{t('reviews.empty')}</p>
			) : (
				<ol className="reviews__list">
					{reviews.map((review) => {
						const own = isMine(review);
						const edited =
							new Date(review.updatedAt).getTime() - new Date(review.createdAt).getTime() > 1000;
						return (
							<li key={review._id} className={`review${own ? ' review--mine' : ''}`}>
								<div className="review__meta">
									<span className="review__author">
										{review.userName}
										{own ? <span className="review__you">{t('reviews.you')}</span> : null}
									</span>
									<span className="review__date num">
										{formatDate(review.createdAt)}
										{edited ? ` · ${t('reviews.edited')}` : null}
									</span>
								</div>
								<div className="review__stars">
									<span className="visually-hidden">{t('beer.ratingOf', { value: review.rating })}</span>
									<Stars value={review.rating} size={16} />
								</div>
								{review.comment ? <p className="review__comment">{review.comment}</p> : null}
								{/* Own review is managed in the card above; admins moderate the rest here */}
								{!own && canDelete(review) ? (
									<div className="review__actions">
										<button
											type="button"
											className="btn btn--danger btn--small"
											onClick={() => onDelete(review)}
											disabled={deletingId !== null}
										>
											{deletingId === review._id ? t('reviews.deleting') : t('reviews.delete')}
										</button>
									</div>
								) : null}
							</li>
						);
					})}
				</ol>
			)}

			{status === 'ready' && page < pageCount ? (
				<button
					type="button"
					className="btn btn--ghost reviews__more"
					onClick={onLoadMore}
					disabled={loadingMore}
				>
					{loadingMore ? t('reviews.loadingMore') : t('reviews.showMore')}
				</button>
			) : null}
		</section>
	);
}
