import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { pl } from './pl';

export const LANGUAGES = ['en', 'pl'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Locale used for dates and numbers per UI language. */
const LOCALES: Record<Language, string> = { en: 'en-GB', pl: 'pl-PL' };

export function currentLanguage(): Language {
	return i18n.resolvedLanguage === 'pl' ? 'pl' : 'en';
}

export function currentLocale(): string {
	return LOCALES[currentLanguage()];
}

function syncDocument() {
	document.documentElement.lang = currentLanguage();
	document.title = i18n.t('meta.title');
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: { en: { translation: en }, pl: { translation: pl } },
		supportedLngs: LANGUAGES,
		nonExplicitSupportedLngs: true,
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
		detection: {
			// A saved choice wins, then the browser's languages
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: 'lang',
			caches: ['localStorage'],
		},
	});

i18n.on('languageChanged', syncDocument);
syncDocument();

export default i18n;
