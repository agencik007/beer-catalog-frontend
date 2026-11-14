import React, { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBeer } from '../features/beers/beerSlice';
import { BeerEntity } from 'types';
import { toast } from 'react-toastify';
import { AppDispatch } from 'src/app/store';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { useTranslation } from 'react-i18next';
import { BEER_STYLES } from '../lib/beerStyle';

const DESCRIPTION_MAX = 200;

export function CreateBeerForm() {
	const { t } = useTranslation();
	const [data, setData] = useState({
		name: '',
		type: '',
		rating: 1,
		description: '',
		alcohol: 0,
		avatar: '',
	} as BeerEntity);

	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');

	const onChange = (e: ChangeEvent) => {
		setData((prevState: any) => ({
			...prevState,
			[(e.target as HTMLTextAreaElement).name]: (
				e.target as HTMLTextAreaElement
			).value,
		}));
	};

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (submitting) {
			return;
		}

		setSubmitting(true);
		setSubmitError('');

		const action = await dispatch(createBeer(data));
		if (createBeer.fulfilled.match(action)) {
			toast.success(t('create.added'));
			navigate('/');
			return;
		}

		setSubmitting(false);
		setSubmitError(t('create.failed'));
	};

	return (
		<section className="auth auth--wide">
			<header className="auth__head">
				<h1>{t('create.title')}</h1>
				<p>{t('create.lead')}</p>
			</header>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label className="field-label" htmlFor="name">
							{t('common.name')}
						</label>
						<input
							type="text"
							name="name"
							id="name"
							autoComplete="off"
							required={true}
							placeholder={t('create.namePlaceholder')}
							value={data.name}
							onChange={onChange}
						/>
					</div>
					<div className="form-row">
						<div className="form-group">
							<label className="field-label" htmlFor="type">
								{t('create.style')}
							</label>
							<select
								name="type"
								id="type"
								value={data.type}
								required={true}
								onChange={onChange}
							>
								<option value="">{t('create.chooseStyle')}</option>
								{BEER_STYLES.map((style) => (
									<option key={style.key} value={style.value}>
										{t(`styles.${style.key}`)}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label className="field-label" htmlFor="percentages">
								{t('create.alcohol')}
							</label>
							<div className="percentage">
								<input
									type="number"
									name="alcohol"
									id="percentages"
									min={0.1}
									max={100}
									step={0.1}
									value={data.alcohol}
									onChange={onChange}
								/>
								<span aria-hidden="true">%</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<span className="field-label" id="rating-label">
							{t('create.rating')}
						</span>
						<div role="group" aria-labelledby="rating-label">
							<Rating
								initialValue={1}
								size={28}
								fillColor="#111111"
								emptyColor="rgba(17,17,17,0.2)"
								onClick={(value) => setData((prev) => ({ ...prev, rating: value }))}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="description">
							{t('create.description')}
						</label>
						<textarea
							name="description"
							id="description"
							required={true}
							placeholder={t('create.descriptionPlaceholder')}
							maxLength={DESCRIPTION_MAX}
							value={data.description}
							onChange={onChange}
						/>
						<span className="field-hint num">{t('create.characters', { current: data.description.length, max: DESCRIPTION_MAX })}</span>
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="avatar">
							{t('create.image')}
						</label>
						<input
							type="text"
							inputMode="url"
							name="avatar"
							id="avatar"
							placeholder="https://…/bottle.png"
							value={data.avatar}
							onChange={onChange}
						/>
						<span className="field-hint">
							{t('create.imageHint')}
						</span>
					</div>
					<div className="form-group">
						<button className="btn btn-block" type="submit" disabled={submitting}>
							{submitting ? t('create.submitting') : t('create.submit')}
						</button>
					</div>
					<p
						className={`form__status${submitError ? ' form__status--error' : ''}`}
						role="status"
						aria-live="polite"
					>
						{submitError}
					</p>
				</form>
			</section>
		</section>
	);
}
