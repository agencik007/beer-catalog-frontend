import { useTranslation } from 'react-i18next';
import { LANGUAGES, currentLanguage } from '../i18n';

/** Two-button language toggle; the choice is saved and restored by the language detector. */
export function LanguageSwitcher() {
	const { t, i18n } = useTranslation();
	const active = currentLanguage();

	return (
		<div className="lang-switch" role="group" aria-label={t('language.label')}>
			{LANGUAGES.map((lang) => (
				<button
					key={lang}
					type="button"
					lang={lang}
					className="lang-switch__option"
					aria-pressed={lang === active}
					onClick={() => i18n.changeLanguage(lang)}
				>
					{lang.toUpperCase()}
					<span className="visually-hidden"> {t(`language.${lang}`)}</span>
				</button>
			))}
		</div>
	);
}
