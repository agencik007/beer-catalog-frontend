import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const REPOS = [
	{ label: 'footer.frontend', href: 'https://github.com/agencik007/beer-catalog-frontend' },
	{ label: 'footer.backend', href: 'https://github.com/agencik007/beer-catalog-backend' },
] as const;

export function Footer() {
	const { t } = useTranslation();
	return (
		<footer className="site-footer">
			<div className="site-footer__inner">
				<div className="site-footer__about">
					<span className="wordmark wordmark--small">
						<span className="wordmark__mark" aria-hidden="true">
							<i style={{ background: 'var(--style-ipa)' }} />
							<i style={{ background: 'var(--style-lager)' }} />
							<i style={{ background: 'var(--style-stout)' }} />
						</span>
						World of beers
					</span>
					<p>{t('footer.about')}</p>
				</div>
				<nav className="site-footer__links" aria-label={t('footer.sourceCode')}>
					{REPOS.map((repo) => (
						<a key={repo.href} href={repo.href} target="_blank" rel="noreferrer" className="footer-link">
							<FaGithub aria-hidden="true" /> {t(repo.label)}
						</a>
					))}
				</nav>
				<p className="site-footer__legal">© {new Date().getFullYear()} World of beers</p>
			</div>
		</footer>
	);
}
