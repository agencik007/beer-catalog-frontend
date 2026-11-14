import type { TFunction } from 'i18next';
import { currentLocale } from '../i18n';

/** Fixed style key per beer type: drives the label's colour field everywhere. */
export type BeerStyleKey =
	| 'ipa'
	| 'apa'
	| 'lager'
	| 'pilsner'
	| 'stout'
	| 'porter'
	| 'wheat'
	| 'sour'
	| 'other';

const STYLE_BY_TYPE: Record<string, BeerStyleKey> = {
	ipa: 'ipa',
	apa: 'apa',
	lager: 'lager',
	pilsner: 'pilsner',
	'stout beer': 'stout',
	stout: 'stout',
	porter: 'porter',
	wheat: 'wheat',
	sour: 'sour',
};

export function beerStyleKey(type: unknown): BeerStyleKey {
	if (typeof type !== 'string') {
		return 'other';
	}
	return STYLE_BY_TYPE[type.trim().toLowerCase()] ?? 'other';
}

/** Styles in the legend and the create form, with the value the backend stores. */
export const BEER_STYLES: { key: Exclude<BeerStyleKey, 'other'>; value: string }[] = [
	{ key: 'ipa', value: 'IPA' },
	{ key: 'apa', value: 'APA' },
	{ key: 'lager', value: 'Lager' },
	{ key: 'pilsner', value: 'Pilsner' },
	{ key: 'stout', value: 'Stout beer' },
	{ key: 'porter', value: 'Porter' },
	{ key: 'wheat', value: 'Wheat' },
	{ key: 'sour', value: 'Sour' },
];

/** Display name for a beer's style in the UI language, or the raw type when unknown. */
export function beerStyleLabel(type: unknown, t: TFunction): string {
	const key = beerStyleKey(type);
	if (key !== 'other') {
		return t(`styles.${key}`);
	}
	return typeof type === 'string' && type.trim() !== '' ? type : t('styles.other');
}

export function formatAlcohol(value: unknown): string {
	const number = Number(value);
	if (value === null || value === undefined || value === '' || !Number.isFinite(number)) {
		return '—';
	}
	return `${number.toLocaleString(currentLocale(), { maximumFractionDigits: 1 })}%`;
}

export function formatDate(value: unknown): string {
	const date = new Date(value as string);
	if (Number.isNaN(date.getTime())) {
		return '—';
	}
	return date.toLocaleDateString(currentLocale());
}
