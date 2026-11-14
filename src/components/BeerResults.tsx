import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BeerEntity } from 'types';
import { BeerItem } from './BeerItem';

/** The label grid with its empty and out-of-range states. */
export function BeerResults({
	page,
	pageCount,
	results,
	empty,
	onFirstPage,
}: {
	page: number;
	pageCount: number;
	results: BeerEntity[];
	empty: ReactNode;
	onFirstPage: () => void;
}) {
	const { t } = useTranslation();

	if (page > pageCount && pageCount > 0) {
		return (
			<section className="state state--center">
				<h2>{t('list.outOfRangeTitle')}</h2>
				<p>{t('list.outOfRange', { count: pageCount })}</p>
				<button type="button" className="btn" onClick={onFirstPage}>
					{t('list.firstPage')}
				</button>
			</section>
		);
	}

	if (!results || results.length === 0) {
		return <section className="state state--center">{empty}</section>;
	}

	return (
		<div className="beers">
			{results.map((beer, index) => (
				<BeerItem key={String(beer._id)} {...beer} index={index} />
			))}
		</div>
	);
}
