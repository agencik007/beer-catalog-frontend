import { useTranslation } from 'react-i18next';
import { BEER_STYLES } from '../lib/beerStyle';

/** The fixed colour key for beer styles. */
export function StyleLegend() {
	const { t } = useTranslation();
	return (
		<ul className="legend" aria-label={t('styles.legend')}>
			{BEER_STYLES.map((style) => (
				<li key={style.key} data-style={style.key}>
					{t(`styles.${style.key}`)}
				</li>
			))}
		</ul>
	);
}
