import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/** Full-screen loader; after a few seconds explains the backend's cold start. */
export const Spinner = () => {
	const { t } = useTranslation();
	const [slow, setSlow] = useState(false);

	useEffect(() => {
		const timer = window.setTimeout(() => setSlow(true), 4000);
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<div className="loadingSpinnerContainer" role="status" aria-live="polite">
			<div className="loadingSpinner" aria-hidden="true"></div>
			<p className="loadingSpinner__note">
				{slow ? t('common.serverWaking') : t('common.loading')}
			</p>
		</div>
	);
};
