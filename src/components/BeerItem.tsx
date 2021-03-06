import React, {SyntheticEvent} from 'react';
import StarsRating from 'react-star-rate';
import {useDispatch} from "react-redux";
import {deleteBeer} from '../features/beers/beerSlice';

import BeerImage from '../assets/images/beer.png';
import './BeerItem.css';
import {toast} from "react-toastify";



// @ts-ignore
export const BeerItem = ({beer}) =>  {
    const dispatch = useDispatch();

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // @ts-ignore
        dispatch(deleteBeer(beer._id))

        toast.success('Successfully deleted.')
    }

    const json: any = localStorage.getItem('user');
    const user = JSON.parse(json);

    return (
        <div className="card">
            <div className="left">
                {beer.avatar === '' ? (
                        <img src={BeerImage} className="image" alt="beer"/>
                    ) : (
                        <img src={beer.avatar} className="image" alt="beer"/>
                    )}
            </div>
            <div className="right">
                <div className="product-details">
                    <h1>{beer.name}</h1>
                    <h2>{beer.type}</h2>
                    <p id="description">{beer.description}</p>
                    <strong className="alcohol">Alcohol: {beer.alcohol}%</strong>
                    <div className="rating">
                        <StarsRating
                            value={beer.rating}
                            disabled={true}
                        />
                    </div>
                    <small className="date">Created: {new Date(beer.createdAt).toLocaleDateString('pl-PL')} by {beer.createdBy}</small>
                    {!user ? null : (
                        <>
                            {beer.user === user._id || user.role === 'admin' ? (
                                <button
                                    className="close"
                                    onClick={onSubmit}
                                >Delete</button>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}