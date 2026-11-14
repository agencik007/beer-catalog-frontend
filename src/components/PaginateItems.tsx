import { Dispatch, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export const PaginateItems = (props: {
	setPage: Dispatch<React.SetStateAction<number>>;
	page: number;
	pageCount: number;
}) => {
	const { setPage, page, pageCount } = props;
	const { t } = useTranslation();

	// bottom: -1px means a stuck pager is never fully visible, so a ratio below 1 marks it stuck
	const ref = useRef<HTMLElement>(null);
	const [stuck, setStuck] = useState(false);
	useEffect(() => {
		const node = ref.current;
		if (!node || typeof IntersectionObserver === 'undefined' || typeof window.matchMedia !== 'function') {
			return;
		}

		// Must match the 720px breakpoint in index.css where the pager stops being sticky
		const wide = window.matchMedia('(min-width: 721px)');
		let observer: IntersectionObserver | null = null;

		const sync = () => {
			observer?.disconnect();
			observer = null;
			if (!wide.matches) {
				setStuck(false);
				return;
			}
			observer = new IntersectionObserver(
				([entry]) => setStuck(entry.intersectionRatio < 1 && entry.boundingClientRect.top > 0),
				{ threshold: [1] }
			);
			observer.observe(node);
		};

		sync();
		wide.addEventListener('change', sync);
		return () => {
			wide.removeEventListener('change', sync);
			observer?.disconnect();
		};
	}, []);

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
		<nav ref={ref} className={`pager${stuck ? ' pager--stuck' : ''}`} aria-label={t('pager.label')}>
			<button
				className="paginate-item"
				disabled={page <= 1}
				onClick={previousPage}
				aria-label={t('pager.previous')}
			>
				<FiArrowLeft aria-hidden="true" />
			</button>

			<button
				className={`paginate-item ${page === 1 ? 'active' : ''}`}
				disabled={page === 1 || pageCount === 0}
				onClick={firstPage}
			>
				1
			</button>

			{page > 3 && <span className="pager__gap" aria-hidden="true">…</span>}

			{page > 2 && (
				<button className="paginate-item" onClick={previousPage}>
					{page - 1}
				</button>
			)}

			{page !== 1 && page !== pageCount && (
				<button className="paginate-item active" disabled aria-current="page">
					{page}
				</button>
			)}

			{page < pageCount - 1 && (
				<button className="paginate-item" onClick={nextPage}>
					{page + 1}
				</button>
			)}

			{page < pageCount - 2 && <span className="pager__gap" aria-hidden="true">…</span>}

			{pageCount !== 1 ? (
				<button
					className={`paginate-item ${
						page === pageCount ? 'active' : ''
					}`}
					disabled={page === pageCount || pageCount === 0}
					onClick={lastPage}
				>
					{pageCount}
				</button>
			) : null}

			<button
				className="paginate-item"
				disabled={page >= pageCount}
				onClick={nextPage}
				aria-label={t('pager.next')}
			>
				<FiArrowRight aria-hidden="true" />
			</button>
		</nav>
	);
};
