import React, { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBeer, getBeers } from '../features/beers/beerSlice';
import { BeerEntity } from 'types';
import { toast } from 'react-toastify';
import { AppDispatch } from 'src/app/store';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import '../index.css';

export function CreateBeerForm() {
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

	const onChange = (e: ChangeEvent) => {
		setData((prevState: any) => ({
			...prevState,
			[(e.target as HTMLTextAreaElement).name]: (
				e.target as HTMLTextAreaElement
			).value,
		}));
	};

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		dispatch(createBeer(data)).then(() =>
			dispatch(
				getBeers({
					page: 1,
					limit: 5,
				})
			)
		);

		navigate('/');

		toast.success('Successfully created.');
	};

	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="text">Create Beer Form</label>
					<label>
						<small>Name of beer</small>
						<input
							type="text"
							name="name"
							id="name"
							required={true}
							placeholder="Name of beer..."
							value={data.name}
							onChange={onChange}
						/>
					</label>
					<label>
						<label htmlFor="type">Choose a type of beer:</label>
						<select
							name="type"
							id="type"
							value={data.type}
							required={true}
							onChange={onChange}
						>
							<option value="">Please select type</option>
							<option value="IPA">IPA</option>
							<option value="APA">APA</option>
							<option value="Lager">Lager</option>
							<option value="Pilsner">Pilsner</option>
							<option value="Stout beer">Stout beer</option>
							<option value="Porter">Porter</option>
							<option value="Wheat">Wheat</option>
							<option value="Sour">Sour</option>
						</select>
					</label>

					<label>
						<small>Rate this beer from 1 to 5</small>
						<Rating
							initialValue={1}
							onClick={(e) => (data.rating = e)}
						/>
					</label>

					<label>
						<small>Description of beer - 200 chars</small>
						<textarea
							name="description"
							id="description"
							required={true}
							placeholder="Please type some description..."
							maxLength={200}
							value={data.description}
							onChange={onChange}
						/>
					</label>
					<label>
						<small>How many percent does this beer have?</small>
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
							<span className="percentages"> %</span>
						</div>
					</label>
					<label>
						<small>
							Please add web address with image - PNG format - or
							leave blank
						</small>
						<input
							type="text"
							name="avatar"
							id="avatar"
							value={data.avatar}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Add Beer
					</button>
				</div>
			</form>
		</section>
	);
}
