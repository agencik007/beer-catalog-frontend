import { FaPlus } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { reset } from '../features/auth/authSlice';
import { logout } from '../features/auth/authService';
import { AppDispatch, RootState } from 'src/app/store';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className="site-header">
			<div className="site-header__inner">
				<a className="skip-link" href="#main">
					{t('nav.skip')}
				</a>
				<Link to="/" className="wordmark">
					<span className="wordmark__mark" aria-hidden="true">
						<i style={{ background: 'var(--style-ipa)' }} />
						<i style={{ background: 'var(--style-lager)' }} />
						<i style={{ background: 'var(--style-stout)' }} />
					</span>
					World of beers
				</Link>
				<nav className="site-nav" aria-label={t('nav.main')}>
					<NavLink to="/" end className="nav-link">
						{t('nav.allBeers')}
					</NavLink>
					{user ? (
						<NavLink to="/user" className="nav-link">
							{t('nav.yourBeers')}
						</NavLink>
					) : null}
					<div className="site-nav__actions">
						{user ? (
							<>
								<button type="button" className="nav-link" onClick={onLogout}>
									{t('nav.logOut')}
								</button>
								<Link to="/create" className="btn">
									<FaPlus aria-hidden="true" /> {t('nav.createBeer')}
								</Link>
							</>
						) : (
							<>
								<NavLink to="/login" className="nav-link">
									{t('nav.logIn')}
								</NavLink>
								<Link to="/register" className="btn">
									{t('nav.register')}
								</Link>
							</>
						)}
						<LanguageSwitcher />
					</div>
				</nav>
			</div>
		</header>
	);
};
