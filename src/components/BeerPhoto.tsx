import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BeerImage from '../assets/images/beer.png';

/** Beer image with a fallback when the URL is empty or fails to load. */
export function BeerPhoto({
	avatar,
	name,
	className,
	fallback = true,
}: {
	avatar?: string;
	name?: string;
	className?: string;
	/** false: render nothing instead of the generic glass when there is no usable image */
	fallback?: boolean;
}) {
	const { t } = useTranslation();
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	const hasOwn = !!avatar && avatar.trim() !== '' && failedSrc !== avatar;
	if (!hasOwn && !fallback) {
		return null;
	}
	const source = hasOwn ? (avatar as string) : BeerImage;

	return (
		<img
			src={source}
			alt={source === BeerImage ? '' : name || t('styles.other')}
			className={className}
			loading="lazy"
			onError={() => {
				if (avatar) {
					setFailedSrc(avatar);
				}
			}}
		/>
	);
}
